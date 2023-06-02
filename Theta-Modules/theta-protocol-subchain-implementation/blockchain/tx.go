package blockchain

import (
	"fmt"
	"math/big"

	"github.com/thetatoken/theta/common"
	"github.com/thetatoken/theta/crypto"
	"github.com/thetatoken/theta/ledger/types"
	"github.com/thetatoken/theta/store"
	score "github.com/thetatoken/thetasubchain/core"
	stypes "github.com/thetatoken/thetasubchain/ledger/types"
)

// txIndexKey constructs the DB key for the given transaction hash.
func txIndexKey(hash common.Hash) common.Bytes {
	return append(common.Bytes("tx/"), hash[:]...)
}

// TxIndexEntry is a positional metadata to help looking up a transaction given only its hash.
type TxIndexEntry struct {
	BlockHash   common.Hash
	BlockHeight uint64
	Index       uint64
}

// AddTxsToIndex adds transactions in given block to index.
func (ch *Chain) AddTxsToIndex(block *score.ExtendedBlock, force bool) {
	for idx, tx := range block.Txs {
		txIndexEntry := TxIndexEntry{
			BlockHash:   block.Hash(),
			BlockHeight: block.Height,
			Index:       uint64(idx),
		}
		txHash := crypto.Keccak256Hash(tx)
		key := txIndexKey(txHash)

		if !force {
			// Check if TX with given hash exists in DB.
			err := ch.store.Get(key, &TxIndexEntry{})
			if err != store.ErrKeyNotFound {
				continue
			}
		}

		err := ch.store.Put(key, txIndexEntry)
		if err != nil {
			logger.Panic(err)
		}

		ch.insertEthTxHash(block, tx, &txIndexEntry)
	}
}

// Index the ETH smart contract transactions, using the ETH tx hash as the key
func (ch *Chain) insertEthTxHash(block *score.ExtendedBlock, rawTxBytes []byte, txIndexEntry *TxIndexEntry) error {
	ethTxHash, err := CalcEthTxHash(block, rawTxBytes)
	if err != nil {
		return err // skip insertion
	}

	key := txIndexKey(ethTxHash)
	err = ch.store.Put(key, *txIndexEntry)
	if err != nil {
		logger.Panic(err)
	}

	return nil
}

// FindTxByHash looks up transaction by hash and additionally returns the containing block.
func (ch *Chain) FindTxByHash(hash common.Hash) (tx common.Bytes, block *score.ExtendedBlock, founded bool) {
	txIndexEntry := &TxIndexEntry{}
	err := ch.store.Get(txIndexKey(hash), txIndexEntry)
	if err != nil {
		if err != store.ErrKeyNotFound {
			logger.Error(err)
		}
		return nil, nil, false
	}
	block, err = ch.FindBlock(txIndexEntry.BlockHash)
	if err != nil {
		if err == store.ErrKeyNotFound {
			return nil, nil, false
		}
		logger.Panic(err)
	}
	return block.Txs[txIndexEntry.Index], block, true
}

// ---------------- Tx Receipts ---------------

// txReceiptKeyV1 constructs the DB key for the given transaction hash.
func txReceiptKeyV1(hash common.Hash) common.Bytes {
	return append(common.Bytes("txr/"), hash[:]...)
}

// the same tx might be executed multiple times when there is a temporary fork
// so we need to record the tx receipt for each execution, indexed by (blockHash, txHash)
func txReceiptKeyV2(blockHash common.Hash, txHash common.Hash) common.Bytes {
	key := append(common.Bytes("txr/v2/"), blockHash[:]...)
	key = append(key, '/')
	key = append(key, txHash[:]...)
	return key
}

// similar to the above, the same tx might be executed multiple times when there is a temporary fork
// so we need to record the tx balance changes for each execution, indexed by (blockHash, txHash)
func txBalanceChangesKey(blockHash common.Hash, txHash common.Hash) common.Bytes {
	key := append(common.Bytes("txb/"), blockHash[:]...)
	key = append(key, '/')
	key = append(key, txHash[:]...)
	return key
}

// TxReceiptEntry records smart contract Tx execution result.
type TxReceiptEntry struct {
	TxHash          common.Hash
	Logs            []*types.Log
	EvmRet          common.Bytes
	ContractAddress common.Address
	GasUsed         uint64
	EvmErr          string
}

// TxBalanceChangesEntry records account balance changes due to smart contract Tx execution
type TxBalanceChangesEntry struct {
	TxHash          common.Hash
	BalanceChanges  []*types.BalanceChange
	EvmRet          common.Bytes
	ContractAddress common.Address
	GasUsed         uint64
	EvmErr          string
}

// AddTxReceipt adds transaction receipt.
func (ch *Chain) AddTxReceipt(block *score.Block, tx types.Tx, logs []*types.Log, balanceChanges []*types.BalanceChange, evmRet common.Bytes,
	contractAddr common.Address, gasUsed uint64, evmErr error) {
	raw, err := stypes.TxToBytes(tx)
	if err != nil {
		// Should never happen
		logger.Panic(err)
	}
	txHash := crypto.Keccak256Hash(raw)
	errStr := ""
	if evmErr != nil {
		errStr = evmErr.Error()
	}
	txReceiptEntry := TxReceiptEntry{
		TxHash:          txHash,
		Logs:            logs,
		EvmRet:          evmRet,
		ContractAddress: contractAddr,
		GasUsed:         gasUsed,
		EvmErr:          errStr,
	}
	txBalanceChangesEntry := TxBalanceChangesEntry{
		TxHash:          txHash,
		BalanceChanges:  balanceChanges,
		EvmRet:          evmRet,
		ContractAddress: contractAddr,
		GasUsed:         gasUsed,
		EvmErr:          errStr,
	}

	if block == nil { // Should never happen
		logger.Panic("AddTxReceipt: block is nil")
	}
	blockHash := block.Hash()

	keyV2 := txReceiptKeyV2(blockHash, txHash)
	err = ch.store.Put(keyV2, txReceiptEntry)
	if err != nil {
		logger.Panic(err)
	}

	keyV1 := txReceiptKeyV1(txHash)
	err = ch.store.Put(keyV1, txReceiptEntry)
	if err != nil {
		logger.Panic(err)
	}

	balanceChangesKey := txBalanceChangesKey(blockHash, txHash)
	err = ch.store.Put(balanceChangesKey, txBalanceChangesEntry)
	if err != nil {
		logger.Panic(err)
	}
}

// FindTxReceiptByHash looks up transaction receipt by hash.
func (ch *Chain) FindTxReceiptByHash(blockHash common.Hash, txHash common.Hash) (*TxReceiptEntry, bool) {
	txReceiptEntry := &TxReceiptEntry{}

	keyV2 := txReceiptKeyV2(blockHash, txHash)
	err := ch.store.Get(keyV2, txReceiptEntry)
	if err == nil {
		return txReceiptEntry, true
	}

	// for backward compatibility
	if err == store.ErrKeyNotFound {
		keyV1 := txReceiptKeyV1(txHash)
		err = ch.store.Get(keyV1, txReceiptEntry)
	}

	if err != nil {
		if err != store.ErrKeyNotFound {
			logger.Error(err)
		}
		return nil, false
	}
	return txReceiptEntry, true
}

// FindTxBalanceChangesByHash looks up transaction balance changes by hash.
func (ch *Chain) FindTxBalanceChangesByHash(blockHash common.Hash, txHash common.Hash) (*TxBalanceChangesEntry, bool) {
	txBalanceChanges := &TxBalanceChangesEntry{}

	key := txBalanceChangesKey(blockHash, txHash)
	err := ch.store.Get(key, txBalanceChanges)
	if err != nil {
		if err != store.ErrKeyNotFound {
			logger.Error(err)
		}
		return nil, false
	}
	return txBalanceChanges, true
}

// ---------------- Utils ---------------

func CalcEthTxHash(block *score.ExtendedBlock, rawTxBytes []byte) (common.Hash, error) {
	tx, err := stypes.TxFromBytes(rawTxBytes)
	if err != nil {
		return common.Hash{}, err
	}

	sctx, ok := tx.(*types.SmartContractTx)
	if !ok {
		return common.Hash{}, fmt.Errorf("not a smart contract transaction") // not a smart contract tx, skip ETH tx insertion
	}

	ethSigningHash := sctx.EthSigningHash(block.ChainID, block.Height)
	err = crypto.ValidateEthSignature(sctx.From.Address, ethSigningHash, sctx.From.Signature)
	if err != nil {
		return common.Hash{}, fmt.Errorf("not an ETH smart contract transaction") // it is a Theta native smart contract transaction, no need to index it as an EthTxHash
	}

	var toAddress *common.Address
	if (sctx.To.Address != common.Address{}) {
		toAddress = &sctx.To.Address
	}

	r, s, v := crypto.DecodeSignature(sctx.From.Signature)
	chainID := types.MapChainID(block.ChainID, block.Height)
	vPrime := big.NewInt(1).Mul(chainID, big.NewInt(2))
	vPrime = big.NewInt(0).Add(vPrime, big.NewInt(8))
	vPrime = big.NewInt(0).Add(vPrime, v)

	ethTx := types.EthTransaction{
		Nonce:    sctx.From.Sequence - 1, // off-by-one, ETH tx nonce starts from 0, while Theta tx sequence starts from 1
		GasPrice: sctx.GasPrice,
		Gas:      sctx.GasLimit,
		To:       toAddress,
		Value:    sctx.From.Coins.NoNil().TFuelWei,
		Data:     sctx.Data,
		V:        vPrime,
		R:        r,
		S:        s,
	}

	ethTxHash := ethTx.Hash()

	//ethTxBytes, _ := rlp.EncodeToBytes(ethTx)
	//logger.Debugf("ethTxBytes: %v", hex.EncodeToString(ethTxBytes))
	logger.Debugf("ethTxHash: %v", ethTxHash.Hex())
	logger.Debugf("ethTxHash, nonce: %v, r: %x, s: %x, v: %v", sctx.From.Sequence-1, r, s, vPrime)

	return ethTxHash, nil
}
