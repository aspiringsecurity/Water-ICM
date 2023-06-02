package consensus

import (
	"context"
	"fmt"
	"math/big"
	"sort"

	// "strings"
	"sync"
	"time"

	// "github.com/thetatoken/theta/crypto/bls"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"github.com/thetatoken/theta/common"
	"github.com/thetatoken/theta/common/result"
	"github.com/thetatoken/theta/common/util"
	"github.com/thetatoken/theta/crypto"
	"github.com/thetatoken/theta/dispatcher"
	"github.com/thetatoken/theta/rlp"
	"github.com/thetatoken/theta/store"

	sbc "github.com/thetatoken/thetasubchain/blockchain"
	scom "github.com/thetatoken/thetasubchain/common"
	score "github.com/thetatoken/thetasubchain/core"
	"github.com/thetatoken/thetasubchain/interchain/witness"
)

var logger = log.WithFields(log.Fields{"prefix": "consensus"})

var _ score.ConsensusEngine = (*ConsensusEngine)(nil)

// ConsensusEngine is the default implementation of the Engine interface.
type ConsensusEngine struct {
	logger *log.Entry

	privateKey *crypto.PrivateKey

	chain            *sbc.Chain
	dispatcher       *dispatcher.Dispatcher
	validatorManager score.ValidatorManager
	ledger           score.Ledger
	metachainWitness witness.ChainWitness

	incoming        chan interface{}
	finalizedBlocks chan *score.Block
	hasSynced       bool

	// Life cycle
	wg      *sync.WaitGroup
	ctx     context.Context
	cancel  context.CancelFunc
	stopped bool

	mu         *sync.Mutex
	voteTimer  *time.Timer
	epochTimer *time.Timer

	voteTimerReady bool
	blockProcessed bool

	state *State
}

// NewConsensusEngine creates a instance of ConsensusEngine.
func NewConsensusEngine(privateKey *crypto.PrivateKey, db store.Store, chain *sbc.Chain, dispatcher *dispatcher.Dispatcher,
	validatorManager score.ValidatorManager, metachainWitness witness.ChainWitness) *ConsensusEngine {
	e := &ConsensusEngine{
		chain:      chain,
		dispatcher: dispatcher,

		privateKey: privateKey,

		incoming:        make(chan interface{}, viper.GetInt(common.CfgConsensusMessageQueueSize)),
		finalizedBlocks: make(chan *score.Block, viper.GetInt(common.CfgConsensusMessageQueueSize)),

		wg: &sync.WaitGroup{},

		mu:    &sync.Mutex{},
		state: NewState(db, chain),

		validatorManager: validatorManager,

		voteTimerReady: false,
		blockProcessed: false,

		metachainWitness: metachainWitness,
	}

	logger = util.GetLoggerForModule("consensus")
	e.logger = logger

	e.logger.WithFields(log.Fields{"state": e.state}).Info("Starting state")

	return e
}

func (e *ConsensusEngine) SetLedger(ledger score.Ledger) {
	e.ledger = ledger
}

// GetLedger returns the ledger instance attached to the consensus engine
func (e *ConsensusEngine) GetLedger() score.Ledger {
	return e.ledger
}

// ID returns the identifier of current node.
func (e *ConsensusEngine) ID() string {
	return e.privateKey.PublicKey().Address().Hex()
}

// PrivateKey returns the private key
func (e *ConsensusEngine) PrivateKey() *crypto.PrivateKey {
	return e.privateKey
}

// Chain return a pointer to the underlying chain store.
func (e *ConsensusEngine) Chain() *sbc.Chain {
	return e.chain
}

// GetEpoch returns the current epoch
func (e *ConsensusEngine) GetEpoch() uint64 {
	return e.state.GetEpoch()
}

// GetValidatorManager returns a pointer to the valiator manager.
func (e *ConsensusEngine) GetValidatorManager() score.ValidatorManager {
	return e.validatorManager
}

// Start starts sub components and kick off the main loop.
func (e *ConsensusEngine) Start(ctx context.Context) {
	c, cancel := context.WithCancel(ctx)
	e.ctx = c
	e.cancel = cancel

	// Verify configurations
	if viper.GetInt(common.CfgConsensusMaxEpochLength) <= viper.GetInt(common.CfgConsensusMinBlockInterval) {
		log.WithFields(log.Fields{
			"CfgConsensusMaxEpochLength":   viper.GetInt(common.CfgConsensusMaxEpochLength),
			"CfgConsensusMinBlockInterval": viper.GetInt(common.CfgConsensusMinBlockInterval),
		}).Fatal("Invalid configuration: max epoch length must be larger than minimal proposal wait")
	}

	// Set ledger state pointer to initial state.
	lastCC := e.autoRewind(e.state.GetHighestCCBlock())
	//e.ledger.ResetState(lastCC.Height, lastCC.StateHash)
	e.ledger.ResetState(lastCC.Block)

	e.checkSyncStatus()

	e.wg.Add(1)
	go e.mainLoop()
}

func (e *ConsensusEngine) autoRewind(lastCC *score.ExtendedBlock) *score.ExtendedBlock {
	// check hardcoded block hashes to determine if need to auto rewind
	heights := make([]uint64, 0, len(score.HardcodeBlockHashes))
	for k := range score.HardcodeBlockHashes {
		heights = append(heights, k)
	}
	sort.Slice(heights, func(i, j int) bool { return heights[i] < heights[j] })

	// get the closest hardcoded hash's height below lastCC
	idx := -1
	for i, height := range heights {
		if height <= lastCC.Height {
			idx = i
		} else {
			break
		}
	}

	if idx > 0 {
		needRewind := false
		// find where to rewind to
		for idx >= 0 {
			// check if the finalized block at that height has the same hash as hardcoded
			var finalizedBlock *score.ExtendedBlock
			blocks := e.chain.FindBlocksByHeight(heights[idx])
			for _, block := range blocks {
				if block.Status.IsFinalized() {
					finalizedBlock = block
					break
				}
			}
			if finalizedBlock == nil {
				log.WithFields(log.Fields{
					"height": heights[idx],
				}).Fatal("Can't find finalized block at height")
			}

			if finalizedBlock.Hash().Hex() == score.HardcodeBlockHashes[heights[idx]] {
				break
			}

			needRewind = true
			idx--
		}

		if needRewind {
			idx++ // last height where block hash varies from hardcoded hash

			for {
				if lastCC.Height < heights[idx] {
					break
				}

				lastCC.Status = score.BlockStatusDisposed
				e.chain.SaveBlock(lastCC)
				e.chain.RemoveVotesByHash(lastCC.Hash())

				parent, err := e.chain.FindBlock(lastCC.Parent)
				if err != nil {
					// Should not happen
					e.logger.WithFields(log.Fields{
						"error":  err,
						"parent": lastCC.Parent.Hex(),
						"block":  lastCC.Hash().Hex(),
					}).Fatal("Failed to find parent block")
				}

				lastCC = parent
			}
		}

		e.state.SetLastFinalizedBlock(lastCC)
		e.state.SetHighestCCBlock(lastCC)
		e.state.SetLastVote(score.Vote{})
		e.state.SetLastProposal(score.Proposal{})
	}

	return lastCC
}

// Stop notifies all goroutines to stop without blocking.
func (e *ConsensusEngine) Stop() {
	e.cancel()
}

// Wait blocks until all goroutines stop.
func (e *ConsensusEngine) Wait() {
	e.wg.Wait()
}

func (e *ConsensusEngine) mainLoop() {
	defer e.wg.Done()

	for {
		e.enterEpoch()
		e.propose()
	Epoch:
		for {
			select {
			case <-e.ctx.Done():
				e.stopped = true
				return
			case msg := <-e.incoming:
				endEpoch := e.processMessage(msg)
				if endEpoch {
					break Epoch
				}
			case <-e.voteTimer.C:
				e.voteTimerReady = true
				if e.blockProcessed {
					e.vote()
				}
			case <-e.epochTimer.C:
				e.logger.WithFields(log.Fields{"e.epoch": e.GetEpoch()}).Debug("Epoch timeout. Repeating epoch")
				e.vote()
				break Epoch
			}
		}
	}
}

// enterEpoch is called when engine enters a new epoch.
func (e *ConsensusEngine) enterEpoch() {
	logger.Debugf("Enter epoch %v", e.GetEpoch())

	// Reset timers.
	if e.epochTimer != nil {
		e.epochTimer.Stop()
	}
	e.epochTimer = time.NewTimer(time.Duration(viper.GetInt(common.CfgConsensusMaxEpochLength)) * time.Second)

	if e.voteTimer != nil {
		e.voteTimer.Stop()
	}
	e.voteTimer = time.NewTimer(time.Duration(viper.GetInt(common.CfgConsensusMinBlockInterval)) * time.Second)

	e.voteTimerReady = false
	e.blockProcessed = false
}

// GetChannelIDs implements the p2p.MessageHandler interface.
func (e *ConsensusEngine) GetChannelIDs() []common.ChannelIDEnum {
	return []common.ChannelIDEnum{
		common.ChannelIDHeader,
		common.ChannelIDBlock,
		common.ChannelIDVote,
	}
}

// AddMessage adds a message to engine's message queue.
func (e *ConsensusEngine) AddMessage(msg interface{}) {
	e.incoming <- msg
}

func (e *ConsensusEngine) processMessage(msg interface{}) (endEpoch bool) {
	switch m := msg.(type) {
	case score.Vote:
		e.logger.WithFields(log.Fields{"vote": m}).Debug("Received vote")
		endEpoch = e.handleVote(m)
		e.checkCC(m.Block)
		return endEpoch
	case *score.Block:
		e.logger.WithFields(log.Fields{
			"block": m.BlockHeader,
		}).Debug("Received block")
		e.handleBlock(m)
	default:
		// Should not happen.
		log.Errorf("Unknown message type: %v", m)
	}

	return false
}

func (e *ConsensusEngine) checkSyncStatus() error {
	maxVoteHeight := uint64(0)
	epochVotes, err := e.State().GetEpochVotes()
	if err != nil {
		return err
	}
	if epochVotes != nil {
		for _, v := range epochVotes.Votes() {
			if v.Height > maxVoteHeight {
				maxVoteHeight = v.Height
			}
		}
	}
	// current finalized height is at most maxVoteHeight-1
	currentHeight := uint64(maxVoteHeight - 1)

	e.hasSynced = !isSyncing(e.GetLastFinalizedBlock(), currentHeight)

	return nil
}

func (e *ConsensusEngine) HasSynced() bool {
	return e.hasSynced
}

func (e *ConsensusEngine) validateBlock(block *score.Block, parent *score.ExtendedBlock) result.Result {
	// Ignore old blocks.
	if lfh := e.state.GetLastFinalizedBlock().Height; block.Height <= lfh {
		e.logger.WithFields(log.Fields{
			"lastFinalizedHeight": lfh,
			"block":               block.Hash().Hex(),
			"block.Height":        block.Height,
		}).Warn("Block.Height <= last finalized height")
		return result.Error("Block is older than last finalized block")
	}

	// Validate parent.
	if parent.Height+1 != block.Height {
		e.logger.WithFields(log.Fields{
			"parent":        block.Parent.Hex(),
			"parent.Height": parent.Height,
			"block":         block.Hash().Hex(),
			"block.Height":  block.Height,
		}).Warn("Block.Height != parent.Height + 1")
		return result.Error("Block height is incorrect")
	}
	minBlockTimestamp := big.NewInt(0).Add(parent.Timestamp, big.NewInt(1))
	if block.Timestamp.Cmp(minBlockTimestamp) < 0 {
		e.logger.WithFields(log.Fields{
			"parent":           block.Parent.Hex(),
			"parent.Timestamp": parent.Timestamp,
			"block":            block.Hash().Hex(),
			"block.Timestamp":  block.Timestamp,
		}).Warn("Block.Timestamp <= parent.Timestamp + 1")
		return result.Error("Block timestamp needs to increase monotonically")
	}
	if parent.Epoch >= block.Epoch {
		e.logger.WithFields(log.Fields{
			"parent":       block.Parent.Hex(),
			"parent.Epoch": parent.Epoch,
			"block":        block.Hash().Hex(),
			"block.Epoch":  block.Epoch,
		}).Warn("Block.Epoch <= parent.Epoch")
		return result.Error("Block epoch must be greater than parent epoch")
	}
	if !parent.Status.IsValid() {
		if parent.Status.IsPending() {
			// Should never happen
			e.logger.WithFields(log.Fields{
				"parent":        block.Parent.Hex(),
				"parent.status": parent.Status,
				"block":         block.Hash().Hex(),
			}).Panic("Parent block is pending")
		}
		e.logger.WithFields(log.Fields{
			"parent":        block.Parent.Hex(),
			"parent.status": parent.Status,
			"block":         block.Hash().Hex(),
		}).Warn("Block is referring to invalid parent block")
		return result.Error("Parent block is invalid")
	}

	// Validate HCC.
	if !e.chain.IsDescendant(block.HCC.BlockHash, block.Hash()) {
		e.logger.WithFields(log.Fields{
			"block.HCC": block.HCC.BlockHash.Hex(),
			"block":     block.Hash().Hex(),
		}).Warn("HCC must be ancestor")
		return result.Error("HCC is not ancestor")
	}
	hccBlock, err := e.chain.FindBlock(block.HCC.BlockHash)
	if err != nil {
		return result.Error("HCC block not found")
	}
	if !hccBlock.Status.IsFinalized() {
		hccValidators := e.validatorManager.GetValidatorSet(block.HCC.BlockHash)
		if !block.HCC.IsValid(hccValidators) {
			e.logger.WithFields(log.Fields{
				"parent":    block.Parent.Hex(),
				"block":     block.Hash().Hex(),
				"block.HCC": block.HCC.String(),
			}).Warn("Invalid HCC")
			return result.Error("Invalid HCC")
		}
	}

	// Blocks with validator changes must be followed by two direct confirmation blocks.
	if parent.HasValidatorUpdate {
		if block.HCC.BlockHash != block.Parent {
			e.logger.WithFields(log.Fields{
				"parent":    block.Parent.Hex(),
				"block":     block.Hash().Hex(),
				"block.HCC": block.HCC.BlockHash.Hex(),
			}).Warn("block.HCC must equal to parent when parent contains validator changes.")
			return result.Error("HCC incorrect: parent has validator changes")
		}
	}
	shouldSynchronize := false
	if !parent.Parent.IsEmpty() {
		grandParent, err := e.chain.FindBlock(parent.Parent)
		// Should not happen.
		if err != nil {
			e.logger.WithFields(log.Fields{
				"error":         err,
				"parent":        parent.Hash().Hex(),
				"block":         block.Hash().Hex(),
				"parent.Parent": parent.Parent.Hex(),
			}).Warn("Failed to find grand parent block")
			return result.Error("Grandparent not found")
		}
		shouldSynchronize = grandParent.HasValidatorUpdate
	}
	if shouldSynchronize {
		if block.HCC.BlockHash != block.Parent {
			e.logger.WithFields(log.Fields{
				"parent":    block.Parent.Hex(),
				"block":     block.Hash().Hex(),
				"block.HCC": block.HCC.BlockHash.Hex(),
			}).Warn("block.HCC must equal to block.Parent when block.Parent.Parent contains validator changes.")
			return result.Error("HCC incorrect: grandparent has validator changes")
		}
	}

	if !e.shouldProposeByID(block.Parent, block.Epoch, block.Proposer.Hex()) {
		e.logger.WithFields(log.Fields{
			"block.Epoch":    block.Epoch,
			"block.proposer": block.Proposer.Hex(),
		}).Warn("Invalid proposer")
		return result.Error("Invalid proposer")
	}

	return result.OK
}

func (e *ConsensusEngine) handleBlock(block *score.Block) {
	eb, err := e.chain.FindBlock(block.Hash())
	if err != nil {
		// Should not happen.
		e.logger.WithFields(log.Fields{
			"error": err,
			"block": block.Hash().Hex(),
		}).Fatal("Failed to find block")
	}

	if hex, ok := score.HardcodeBlockHashes[eb.Height]; ok {
		e.handleHardcodeBlock(common.HexToHash(hex))
	} else {
		e.handleNormalBlock(eb)
	}
}

func (e *ConsensusEngine) handleHardcodeBlock(hash common.Hash) {
	eb, err := e.chain.FindBlock(hash)
	if err != nil {
		// block still not synced to DB, wait and retry
		e.logger.WithFields(log.Fields{
			"error": err,
			"block": hash.Hex(),
		}).Warn("Failed to find block")
		return
	}
	eb.Status = score.BlockStatusTrusted
	e.chain.SaveBlock(eb)

	block := eb.Block
	parent, err := e.chain.FindBlock(block.Parent)
	if err != nil {
		// Should not happen since netsync layer ensures order of blocks.
		e.logger.WithFields(log.Fields{
			"error":  err,
			"parent": block.Parent.Hex(),
			"block":  block.Hash().Hex(),
		}).Fatal("Failed to find parent block")
	}

	//result := e.ledger.ResetState(parent.Height, parent.StateHash)
	result := e.ledger.ResetState(parent.Block)
	if result.IsError() {
		e.logger.WithFields(log.Fields{
			"error":            result.Message,
			"parent.StateHash": parent.StateHash,
		}).Error("Failed to reset state to parent.StateHash")
		return
	}
	result = e.ledger.ApplyBlockTxs(block)
	if result.IsError() || result.IsUndecided() { // a hardcoded block cannot be either invalid or undecided
		e.logger.WithFields(log.Fields{
			"error":           result.String(),
			"parent":          block.Parent.Hex(),
			"block":           block.Hash().Hex(),
			"block.StateHash": block.StateHash.Hex(),
		}).Error("Failed to apply block Txs")
		return
	}

	e.pruneState(block.Height)

	e.state.SetHighestCCBlock(eb)
}

func (e *ConsensusEngine) handleNormalBlock(eb *score.ExtendedBlock) {
	start := time.Now()

	block := eb.Block
	if !eb.Status.IsPending() {
		// Before consensus engine can process the first one, sync layer might send duplicate blocks.
		e.logger.WithFields(log.Fields{
			"error":        nil,
			"block.Status": eb.Status,
			"block":        block.Hash().Hex(),
		}).Debug("Ignore processed block")
		return
	}
	parent, err := e.chain.FindBlock(block.Parent)
	if err != nil {
		// Should not happen since netsync layer ensures order of blocks.
		e.logger.WithFields(log.Fields{
			"error":  err,
			"parent": block.Parent.Hex(),
			"block":  block.Hash().Hex(),
		}).Fatal("Failed to find parent block")
	}

	start1 := time.Now()
	if e.validateBlock(block, parent).IsError() {
		e.logger.WithFields(log.Fields{
			"block.Hash": block.Hash().Hex(),
		}).Warn("Block is invalid")
		e.chain.MarkBlockInvalid(block.Hash())
		return
	}
	validateBlockTime := time.Since(start1)

	for _, vote := range block.HCC.Votes.Votes() {
		e.handleVote(vote)
	}
	if localHCC := e.state.GetHighestCCBlock().Hash(); localHCC != block.HCC.BlockHash {
		e.logger.WithFields(log.Fields{
			"localHCC":            localHCC.Hex(),
			"block.HCC.BlockHash": block.HCC.BlockHash.Hex(),
		}).Debug("Updating HCC before process block")
		e.checkCC(block.HCC.BlockHash)
	}

	//result := e.ledger.ResetState(parent.Height, parent.StateHash)
	result := e.ledger.ResetState(parent.Block)
	if result.IsError() {
		e.logger.WithFields(log.Fields{
			"error":            result.Message,
			"parent.StateHash": parent.StateHash,
		}).Error("Failed to reset state to parent.StateHash")
		e.chain.MarkBlockInvalid(block.Hash())
		return
	}

	start1 = time.Now()
	result = e.ledger.ApplyBlockTxs(block)
	if result.IsError() {
		e.logger.WithFields(log.Fields{
			"error":           result.String(),
			"parent":          block.Parent.Hex(),
			"block":           block.Hash().Hex(),
			"block.StateHash": block.StateHash.Hex(),
		}).Error("Failed to apply block Txs")
		e.chain.MarkBlockInvalid(block.Hash())
		return
	} else if result.IsUndecided() {
		e.logger.WithFields(log.Fields{
			"warning":         result.String(),
			"parent":          block.Parent.Hex(),
			"block":           block.Hash().Hex(),
			"block.StateHash": block.StateHash.Hex(),
		}).Warn("Not ready to apply block Txs")
		return // If the mainchain node falls out-of-sync, the subchain node might not have evidence to
		// either confirm or reject the ValidatorSetUpdateTx. In such a case, the the processing result of
		// a normal block could be undecided. Hence, we should NOT mark the block as invalid. Instead, we
		// should keep the block in the "Pending" state, Later after the mainchain node is in-sync, this
		// block could be re-processed.
	}
	applyBlockTime := time.Since(start1)

	start1 = time.Now()
	go e.pruneState(block.Height)
	pruneStateTime := time.Since(start1)

	if hasValidatorUpdate, ok := result.Info["hasValidatorUpdate"]; ok {
		hasValidatorUpdateBool := hasValidatorUpdate.(bool)
		if hasValidatorUpdateBool {
			e.chain.MarkBlockHasValidatorUpdate(block.Hash())
		}
	}

	e.chain.MarkBlockValid(block.Hash())

	// Skip voting for block older than current best known epoch.
	// Allow block with one epoch behind since votes are processed first and might advance epoch
	// before block is processed.
	if localEpoch := e.GetEpoch(); block.Epoch == localEpoch-1 || block.Epoch == localEpoch {
		e.blockProcessed = true
		if e.voteTimerReady {
			e.vote()
		}
	} else {
		e.logger.WithFields(log.Fields{
			"block.Epoch": block.Epoch,
			"block.Hash":  block.Hash().Hex(),
			"e.epoch":     localEpoch,
		}).Debug("Skipping voting for block from previous epoch")
	}

	// Check and process CC.
	e.checkCC(block.Hash())

	e.logger.WithFields(log.Fields{
		"block.Epoch":       block.Epoch,
		"block.Hash":        block.Hash().Hex(),
		"duration":          time.Since(start),
		"validateBlockTime": validateBlockTime,
		"applyBlockTime":    applyBlockTime,
		"pruneStateTime":    pruneStateTime,
	}).Debug("Finish processing block")
}

func (e *ConsensusEngine) shouldVote(block common.Hash) bool {
	return e.shouldVoteByID(e.privateKey.PublicKey().Address(), block)
}

func (e *ConsensusEngine) shouldVoteByID(id common.Address, block common.Hash) bool {
	validators := e.validatorManager.GetValidatorSet(block)
	_, err := validators.GetValidator(id)
	return err == nil
}

func (e *ConsensusEngine) vote() {
	tip := e.GetTipToVote()

	if !e.shouldVote(tip.Hash()) {
		return
	}

	var vote score.Vote
	lastVote := e.state.GetLastVote()
	shouldRepeatVote := false
	if lastVote.Height != 0 && lastVote.Height >= tip.Height {
		// Voting height should be monotonically increasing.
		e.logger.WithFields(log.Fields{
			"lastVote.Height": lastVote.Height,
			"lastVote.Hash":   lastVote.Block.Hex(),
			"tip.Height":      tip.Height,
			"tip.Hash":        tip.Hash().Hex(),
		}).Debug("Repeating vote at height")
		shouldRepeatVote = true
	} else if localHCC := e.state.GetHighestCCBlock().Hash(); lastVote.Height != 0 && tip.HCC.BlockHash != localHCC {
		// HCC in candidate block must equal local highest CC.
		e.logger.WithFields(log.Fields{
			"tip":       tip.Hash().Hex(),
			"tip.HCC":   tip.HCC.BlockHash.Hex(),
			"local.HCC": localHCC.Hex(),
		}).Debug("Repeating vote due to mismatched HCC")
		shouldRepeatVote = true
	}

	if shouldRepeatVote {
		block, err := e.chain.FindBlock(lastVote.Block)
		if err != nil {
			// Should not happen
			log.Panic(err)
		}
		// Recreating vote so that it has updated epoch and signature.
		vote = e.createVote(block.Block)
	} else {
		vote = e.createVote(tip.Block)
		e.state.SetLastVote(vote)
	}
	e.logger.WithFields(log.Fields{
		"vote": vote,
	}).Debug("Sending vote")
	e.broadcastVote(vote)

	go func() {
		e.AddMessage(vote)
	}()
}

func (e *ConsensusEngine) broadcastVote(vote score.Vote) {
	payload, err := rlp.EncodeToBytes(vote)
	if err != nil {
		e.logger.WithFields(log.Fields{"vote": vote}).Error("Failed to encode vote")
		return
	}
	voteMsg := dispatcher.DataResponse{
		ChannelID: common.ChannelIDVote,
		Payload:   payload,
	}
	e.dispatcher.SendData([]string{}, voteMsg)
}

func (e *ConsensusEngine) createVote(block *score.Block) score.Vote {
	mainchainHeightBigInt, err := e.metachainWitness.GetMainchainBlockHeight()
	var mainchainHeight uint64
	if err != nil {
		mainchainHeight = 0
	} else {
		mainchainHeight = mainchainHeightBigInt.Uint64()
	}

	vote := score.Vote{
		Block:           block.Hash(),
		Height:          block.Height,
		MainchainHeight: mainchainHeight,
		ID:              e.privateKey.PublicKey().Address(),
		Epoch:           e.GetEpoch(),
	}
	vote.Sign(e.privateKey)
	return vote
}

func (e *ConsensusEngine) validateVote(vote score.Vote) bool {
	if res := vote.Validate(); res.IsError() {
		e.logger.WithFields(log.Fields{
			"err": res.String(),
		}).Warn("Ignoring invalid vote")
		return false
	}
	return true
}

func (e *ConsensusEngine) handleVote(vote score.Vote) (endEpoch bool) {
	// Validate vote.
	if !e.validateVote(vote) {
		return
	}

	// Save vote.
	err := e.state.AddVote(&vote)
	if err != nil {
		e.logger.WithFields(log.Fields{"err": err}).Panic("Failed to add vote")
	}

	// Update epoch.
	lfb := e.state.GetLastFinalizedBlock()
	nextValidators := e.validatorManager.GetNextValidatorSet(lfb.Hash())
	if vote.Epoch >= e.GetEpoch() {
		currentEpochVotes := score.NewVoteSet()
		allEpochVotes, err := e.state.GetEpochVotes()
		if err != nil {
			e.logger.WithFields(log.Fields{"err": err}).Panic("Failed to retrieve epoch votes")
		}
		for _, v := range allEpochVotes.Votes() {
			if v.Epoch >= vote.Epoch {
				currentEpochVotes.AddVote(v)
			}
		}

		if nextValidators.HasMajority(currentEpochVotes) {
			nextEpoch := vote.Epoch + 1
			endEpoch = true
			if nextEpoch > e.GetEpoch()+1 {
				// Broadcast epoch votes when jumping epoch.
				for _, v := range currentEpochVotes.Votes() {
					e.broadcastVote(v)
				}
			}

			tip := e.GetTipToExtend()
			expectedProposer := e.validatorManager.GetNextProposer(tip.Hash(), nextEpoch)

			e.logger.WithFields(log.Fields{
				"e.epoch":          e.GetEpoch,
				"nextEpoch":        nextEpoch,
				"epochVoteSet":     currentEpochVotes,
				"expectedProposer": expectedProposer.ID().Hex(),
			}).Debug("Majority votes for current epoch. Moving to new epoch")
			e.state.SetEpoch(nextEpoch)

			e.checkSyncStatus()
		}
	}
	return
}

func (e *ConsensusEngine) checkCC(hash common.Hash) {
	if hash.IsEmpty() {
		return
	}
	block, err := e.Chain().FindBlock(hash)
	if err != nil {
		e.logger.WithFields(log.Fields{"block": hash.Hex()}).Debug("checkCC: Block hash in vote is not found")
		return
	}
	// Skip invalid block.
	if block.Status.IsInvalid() {
		return
	}
	// Skip if block is still pending.
	if block.Status.IsPending() {
		return
	}
	// Skip if block already has CC.
	if block.Status.IsCommitted() || block.Status.IsDirectlyFinalized() || block.Status.IsIndirectlyFinalized() {
		return
	}
	// Process hardcoded blocks.
	if block.Status.IsTrusted() {
		e.processCCBlock(block)
		return
	}
	// Ignore outdated votes.
	highestCCBlockHeight := e.state.GetHighestCCBlock().Height
	if block.Height < highestCCBlockHeight {
		return
	}

	votes := e.chain.FindVotesByHash(hash).UniqueVoter()
	validators := e.validatorManager.GetValidatorSet(hash)
	if validators.HasMajority(votes) {
		e.processCCBlock(block)
	}
}

func (e *ConsensusEngine) GetTipToVote() *score.ExtendedBlock {
	return e.GetTip(true)
}

func (e *ConsensusEngine) GetTipToExtend() *score.ExtendedBlock {
	return e.GetTip(false)
}

// GetTip return the block to be extended from.
func (e *ConsensusEngine) GetTip(includePendingBlockingLeaf bool) *score.ExtendedBlock {
	hcc := e.state.GetHighestCCBlock()
	candidate := hcc

	// DFS to find valid block with the greatest height.
	stack := []*score.ExtendedBlock{candidate}
	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if !curr.Status.IsValid() {
			continue
		}
		if !includePendingBlockingLeaf && curr.HasValidatorUpdate {
			// A block with validator update is newer than local HCC. Proposing
			// on this branch will violate the two direct confirmations rule for
			// blocks with validator changes.
			continue
		}

		if curr.Height > candidate.Height {
			candidate = curr
		}

		for _, childHash := range curr.Children {
			child, err := e.chain.FindBlock(childHash)
			if err != nil {
				e.logger.WithFields(log.Fields{
					"err":       err,
					"childHash": childHash.Hex(),
				}).Fatal("Failed to find child block")
			}
			stack = append(stack, child)
		}
	}
	return candidate
}

// GetSummary returns a summary of consensus state.
func (e *ConsensusEngine) GetSummary() *StateStub {
	return e.state.GetSummary()
}

// FinalizedBlocks returns a channel that will be published with finalized blocks by the engine.
func (e *ConsensusEngine) FinalizedBlocks() chan *score.Block {
	return e.finalizedBlocks
}

// GetLastFinalizedBlock returns the last finalized block.
func (e *ConsensusEngine) GetLastFinalizedBlock() *score.ExtendedBlock {
	return e.state.GetLastFinalizedBlock()
}

func (e *ConsensusEngine) processCCBlock(ccBlock *score.ExtendedBlock) {
	if ccBlock.Height <= e.state.GetHighestCCBlock().Height {
		return
	}

	if ccBlock.Parent == ccBlock.HCC.BlockHash {

		// Finalize condition: b1 is finalized iff there is b2 where b2 is committed and
		// b2.Parent == b2.HCC == b1.
		parent, err := e.Chain().FindBlock(ccBlock.Parent)
		if err != nil {
			e.logger.WithFields(log.Fields{"err": err, "hash": ccBlock.Parent}).Error("Failed to load block")
			return
		}
		if err := e.finalizeBlock(parent); err != nil {
			return
		}
	}

	e.logger.WithFields(log.Fields{"ccBlock.Hash": ccBlock.Hash().Hex(), "c.epoch": e.state.GetEpoch()}).Debug("Updating highestCCBlock")
	e.state.SetHighestCCBlock(ccBlock)
	e.chain.CommitBlock(ccBlock.Hash())
}

func (e *ConsensusEngine) finalizeBlock(block *score.ExtendedBlock) error {
	if e.stopped {
		return nil
	}

	// Skip blocks that have already published.
	if block.Hash() == e.state.GetLastFinalizedBlock().Hash() {
		return nil
	}

	e.logger.WithFields(log.Fields{"block.Hash": block.Hash().Hex(), "block.Height": block.Height}).Info("Finalizing block")

	e.state.SetLastFinalizedBlock(block)
	e.ledger.FinalizeState(block.Height, block.StateHash)

	e.checkSyncStatus()

	// Mark block and its ancestors as finalized.
	if err := e.chain.FinalizePreviousBlocks(block.Hash()); err != nil {
		return err
	}

	// Force update TX index on block finalization so that the index doesn't point to
	// duplicate TX in fork.
	e.chain.AddTxsToIndex(block, true)

	select {
	case e.finalizedBlocks <- block.Block:
		e.logger.Infof("Notified finalized block, height=%v", block.Height)
	default:
		e.logger.Warnf("Failed to notify finalized block, height=%v", block.Height)
	}
	return nil
}

func (e *ConsensusEngine) shouldPropose(tip *score.ExtendedBlock, epoch uint64) bool {
	if epoch <= tip.Epoch {
		e.logger.WithFields(log.Fields{
			"tip":       tip.Hash().Hex(),
			"tip.Epoch": tip.Epoch,
			"epoch":     epoch,
		}).Debug("shouldPropose=false: epoch is behind")
		return false
	}
	if !e.shouldProposeByID(tip.Hash(), epoch, e.ID()) {
		e.logger.WithFields(log.Fields{
			"tip":   tip.Hash().Hex(),
			"epoch": epoch,
		}).Debug("shouldPropose=false: not my turn")
		return false
	}
	return true
}

func (e *ConsensusEngine) validatorMajorityInTheSameDynasty(tip *score.ExtendedBlock) bool {
	// Check if majority has greater block height.
	epochVotes, err := e.state.GetEpochVotes()
	if err != nil {
		e.logger.WithFields(log.Fields{"error": err}).Warn("Failed to load epoch votes")
		return true
	}
	validators := e.validatorManager.GetNextValidatorSet(tip.Hash())
	votes := score.NewVoteSet()
	for _, v := range epochVotes.Votes() {
		if v.Height >= tip.Height+1 {
			votes.AddVote(v)
		}
	}

	if validators.HasMajority(votes) {
		e.logger.WithFields(log.Fields{
			"tip":        tip.Hash().Hex(),
			"tip.Height": tip.Height,
			"votes":      votes.String(),
		}).Debug("validatorMajorityInSameDynasty=false: tip height smaller than majority")
		return false
	}

	// For better liveness, check if the majority votes have dynasties at least as large as the local dynasties.
	mainchainHeight, err := e.metachainWitness.GetMainchainBlockHeight()
	if err != nil {
		return false
	}

	witnesssedDynasty := scom.CalculateDynasty(mainchainHeight)
	dynastyVotes := score.NewVoteSet()
	for _, v := range epochVotes.Votes() {
		voteDyansty := scom.CalculateDynasty(big.NewInt(int64(v.MainchainHeight)))
		if voteDyansty.Cmp(witnesssedDynasty) >= 0 {
			dynastyVotes.AddVote(v)
		}
	}

	if !validators.HasMajority(dynastyVotes) {
		// The majority of the validators are still lagging behind this node. Hence, higly likely that if the
		// proposed block includes the validator update tx, it will be ignored by the majority of the validators.
		// So it is better not to include the tx so the block can be finalized. Otherwise, this proposer slot will be wasted.
		return false
	}

	return true
}

func (e *ConsensusEngine) shouldProposeByID(previousBlock common.Hash, epoch uint64, id string) bool {
	if epoch == 0 { // special handling for genesis epoch
		return false
	}
	proposer := e.validatorManager.GetNextProposer(previousBlock, epoch)
	if proposer.ID().Hex() != id {
		e.logger.WithFields(log.Fields{
			"expectedProposer": proposer.ID().Hex(),
			"tip":              previousBlock.Hex(),
			"epoch":            epoch,
		}).Debug("shouldProposeByID=false")

		return false
	}
	return true
}

func (e *ConsensusEngine) createProposal(validatorMajorityInTheSameDynasty bool) (score.Proposal, error) {
	tip := e.GetTipToExtend()
	//result := e.ledger.ResetState(tip.Height, tip.StateHash)
	result := e.ledger.ResetState(tip.Block)
	if result.IsError() {
		e.logger.WithFields(log.Fields{
			"error":         result.Message,
			"tip.StateHash": tip.StateHash.Hex(),
			"tip":           tip,
		}).Panic("Failed to reset state to tip.StateHash")
	}

	parentBlockHash := tip.Hash()
	parentBlock, err := e.chain.FindBlock(parentBlockHash)
	if err != nil {
		logger.Fatalf("Failed to find parent block with hash: %v, err: %v", parentBlockHash.Hex(), err) // should not happen
	}
	minBlockTimestamp := big.NewInt(0).Add(parentBlock.Timestamp, big.NewInt(1))

	// Add block.
	block := score.NewBlock()
	block.ChainID = e.chain.ChainID
	block.Epoch = e.GetEpoch()
	block.Parent = parentBlockHash
	block.Height = tip.Height + 1
	block.Proposer = e.privateKey.PublicKey().Address()
	block.Timestamp = big.NewInt(time.Now().Unix())
	if block.Timestamp.Cmp(minBlockTimestamp) < 0 {
		block.Timestamp.Set(minBlockTimestamp) // keep the block timestamp monotonically increasing to be compatible with Ethereum, block.timestamp >= parent.timestamp + 1
	}
	block.HCC.BlockHash = e.state.GetHighestCCBlock().Hash()
	hccValidators := e.validatorManager.GetValidatorSet(block.HCC.BlockHash)
	block.HCC.Votes = e.chain.FindVotesByHash(block.HCC.BlockHash).UniqueVoter().FilterByValidators(hccValidators)

	// Add Txs.
	newRoot, txs, result := e.ledger.ProposeBlockTxs(block, validatorMajorityInTheSameDynasty)
	if result.IsError() || result.IsUndecided() { // the proposer should NOT propose a block that is either invalid or undecided
		err := fmt.Errorf("Failed to collect Txs for block proposal: %v", result.String())
		return score.Proposal{}, err
	}
	block.AddTxs(txs)
	block.StateHash = newRoot

	// Sign block.
	sig, err := e.privateKey.Sign(block.SignBytes())
	if err != nil {
		e.logger.WithFields(log.Fields{"error": err}).Panic("Failed to sign vote")
	}
	block.SetSignature(sig)

	proposal := score.Proposal{
		Block:      block,
		ProposerID: common.HexToAddress(e.ID()),
	}

	// Add votes that might help peers progress, e.g. votes on last CC block and latest epoch
	// votes.
	lastCC := e.state.GetHighestCCBlock()
	lastCCValidators := e.validatorManager.GetValidatorSet(lastCC.Hash())
	lastCCVotes := e.chain.FindVotesByHash(lastCC.Hash())
	epochVotes, err := e.state.GetEpochVotes()
	if err != nil {
		if lastCC.Height > score.GenesisBlockHeight { // OK for the genesis block not to have votes
			e.logger.WithFields(log.Fields{"error": err}).Warn("Failed to load epoch votes")
		}
	}
	proposal.Votes = lastCCVotes.Merge(epochVotes).UniqueVoterAndBlock().FilterByValidators(lastCCValidators)

	return proposal, nil
}

func (e *ConsensusEngine) propose() {
	tip := e.GetTipToExtend()
	if !e.shouldPropose(tip, e.GetEpoch()) {
		return
	}

	validatorMajorityInTheSameDynasty := e.validatorMajorityInTheSameDynasty(tip)
	var proposal score.Proposal
	var err error
	lastProposal := e.state.GetLastProposal()
	if lastProposal.Block != nil && e.GetEpoch() == lastProposal.Block.Epoch {
		proposal = lastProposal
		e.logger.WithFields(log.Fields{"proposal": proposal}).Info("Repeating proposal")
	} else {
		proposal, err = e.createProposal(validatorMajorityInTheSameDynasty)
		if err != nil {
			e.logger.WithFields(log.Fields{"error": err}).Error("Failed to create proposal")
			return
		}
		e.state.LastProposal = proposal

		_, err = e.chain.AddBlock(proposal.Block)
		if err != nil {
			e.logger.WithFields(log.Fields{"error": err}).Fatal("Failed to add proposed block to chain")
		}

		e.logger.WithFields(log.Fields{"proposal": proposal}).Info("Making proposal")
	}

	payload, err := rlp.EncodeToBytes(proposal)
	if err != nil {
		e.logger.WithFields(log.Fields{"proposal": proposal}).Error("Failed to encode proposal")
		return
	}
	proposalMsg := dispatcher.DataResponse{
		ChannelID: common.ChannelIDProposal,
		Payload:   payload,
	}
	e.dispatcher.SendData([]string{}, proposalMsg)

	go func() {
		e.AddMessage(proposal.Block)
	}()
}

func (e *ConsensusEngine) pruneState(currentBlockHeight uint64) {
	// Permanently disabled
	return

	// if !viper.GetBool(common.CfgStorageStatePruningEnabled) {
	// 	return
	// }

	// pruneInterval := uint64(viper.GetInt(common.CfgStorageStatePruningInterval))
	// if currentBlockHeight%pruneInterval != 0 {
	// 	return
	// }

	// minimumNumBlocksToRetain := uint64(viper.GetInt(common.CfgStorageStatePruningRetainedBlocks))
	// if currentBlockHeight <= minimumNumBlocksToRetain+1 {
	// 	return
	// }

	// endHeight := currentBlockHeight - minimumNumBlocksToRetain
	// e.ledger.PruneState(endHeight)
}

func (e *ConsensusEngine) State() *State {
	return e.state
}

func isSyncing(lastestFinalizedBlock *score.ExtendedBlock, currentHeight uint64) bool {
	if lastestFinalizedBlock == nil {
		return true
	}
	currentTime := big.NewInt(time.Now().Unix())
	maxDiff := new(big.Int).SetUint64(30) // thirty seconds, about 5 blocks
	threshold := new(big.Int).Sub(currentTime, maxDiff)
	isSyncing := lastestFinalizedBlock.Timestamp.Cmp(threshold) < 0

	if isSyncing { // sometimes the validator node clock is off, so here we also compare the block heights
		isSyncing = (currentHeight - lastestFinalizedBlock.Height) > 5
	}

	return isSyncing
}
