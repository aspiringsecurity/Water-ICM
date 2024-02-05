// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SnowDay.sol";
import "./interface/IBlast.sol";

error TargetReachedDailyLimit();
error TooSoonAfterFinish();
error TooManyAttacksToday();

contract NFTAttack is RrpRequesterV0, Ownable, SnowDay {

    // Create interface for blast to call chain functions
    IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002);

    uint256 public constant MAX_ATTACKS = 3;
    uint256 public constant MAX_SHOTS_TAKEN = 3;
    uint256 public constant BASE_EVADE_RATE = 50; // 50% chance to evade + Evade stat of character
    uint256 public priceOfNFTEscrow = 0.05 ether;
    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    uint256 public randomInRange; //public variable to view the number returned
    uint256 public totalNFTsLeft;
    uint256 public winners;

    uint256 public yieldCollected; //public variale to view the yield collected

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;
    mapping(bytes32 => address[2]) whoToHit;
    //Keep track of how many attacks an NFT has taken in a day
    mapping(address => mapping(uint256 => uint256)) public dailyAttacksReceived;
    //Tracking how many attacks the NFT has done
    mapping(uint256 => mapping(uint256 => uint256)) public attacksSentDaily;

    event RequestUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);

    constructor(
        address _airnodeRrp,
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHp,
        uint256[] memory characterAttack,
        uint256[] memory characterDefense,
        uint256[] memory characterEvade
    )
        RrpRequesterV0(_airnodeRrp)
        SnowDay(characterNames, characterImageURIs, characterHp, characterAttack, characterDefense, characterEvade)
    {
        // Setup Blast network yield generation and claimable gas
        // BLAST.configureAutomaticYield(); //contract balance will grow automatically if it holds at least 1ETH
        BLAST.configureClaimableYield(); //The yield will be claimed later
        BLAST.configureClaimableGas();  //Set to claim all gas when contract uses gas
    }

    // First set up the contract to be able to request random numbers from the airnode, sponsor wallet must be generated
    function setRequestParameters(address _airnode, bytes32 _endpointIdUint256, address _sponsorWallet) external onlyOwner {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    // Front facing function to start the game, calls the internal function of the snowday contract, resets any previous game data
    function startGame() external onlyOwner {
        if (gameInProgress == true) revert GameHasAlreadyStarted();
        // add a delay to start the game for winners to claim prizes before starting another
        // if(block.timestamp < endTime + 1 days) revert TooSoonAfterFinish();
        winners = 0; //reset the winners
        yieldCollected = 0; //reset yield
        startTheGame();
    }

    // Global end game function, anybody can call this function to end the game once the time is up
    function endGame() external {
        if (gameInProgress == false) revert GameHasNotStarted();
      //  if (block.timestamp < endTime) revert GameHasNotEnded();
        endTheGame();
        winners = totalNFTsLeft;
        yieldCollected = BLAST.readClaimableYield(address(this));
        claimYieldGenerated();
    }

    // Function to enter the game during mint window, requires a stake of 0.05 ether but is returned if the player loses or wins the game.
    function enterTheArena(uint256 _characterIndex) external payable {
        if (gameInProgress == false) revert GameHasNotStarted();
        if (block.timestamp > mintWindow) revert MintWindowPassed();
        if (isGamePaused) revert Paused();
        if (msg.value < priceOfNFTEscrow) revert IncorrectEtherValue();
        if (balanceOf(msg.sender) > 0) revert AlreadyHasNFT();

        claimNFT(_characterIndex);
        ++totalNFTsLeft;
    }

    // The primary attack function, makes the request to the airnode for a random number and sets the target
    // They are checks to limit spamming of a specific target and to limit the number of attacks a player can make in a day
    function throwSnowball(address _victim) external {
        if (gameInProgress == false) revert GameHasNotStarted();
        if (isGamePaused) revert Paused();
        if (block.timestamp > endTime) revert GameHasEnded();
        if (balanceOf(msg.sender) == 0) revert YouNeedAnNFT();
        if (balanceOf(_victim) == 0) revert EnemyNeedsNFT();

         // get the token ID of the nft attacking
        uint256 nftTokenOfAttacker = nftHolders[msg.sender];
         // Get today's date as a unique identifier
        uint256 today = getCurrentDay();

       // if (attacksSentDaily[nftTokenOfAttacker][today] >= MAX_ATTACKS) revert TooManyAttacksToday();
        // Check if the target has been attacked 3 times today
       // if (dailyAttacksReceived[_victim][today] >= MAX_SHOTS_TAKEN) revert TargetReachedDailyLimit();

        // Increase the attack count for today
        dailyAttacksReceived[_victim][today]++;
        // Increment the attack count for the NFT for today
        attacksSentDaily[nftTokenOfAttacker][today]++;
        //request the number
        makeRequestUint256(_victim, msg.sender);
    }

    // Internal function of the returned random number to calculate the hit and damage
    // If the player is hit and the damage is greater than their HP, the NFT is burned and the attacker receives the escrowed ether
    function hit(address _victim, address _attacker, uint256 _random) internal {
        if (isGamePaused) revert Paused();
        if (balanceOf(_victim) == 0) revert EnemyNeedsNFT();

        uint256 nftTokenofAttacker = nftHolders[_attacker];
        uint256 nftTokenIdOfPlayer = nftHolders[_victim];
        CharacterAttributes storage attacker = nftHolderAttributes[nftTokenofAttacker];
        CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];

        // Adjust the hit chance based on evade
        if (_random > (BASE_EVADE_RATE - player.evade)) {
            emit MissedAttack(_attacker, _victim);
            //  console.log("Missed due to evasion");
            return;
        }

        // Calculate potential damage
        uint256 potentialDamage = _random + attacker.attackDamage - player.defense;
        if (potentialDamage > player.hp) {
            _burn(nftTokenIdOfPlayer);
            emit NFTBurned(_victim, nftTokenIdOfPlayer, _attacker);
            //Subtract from the total NFTs left
            --totalNFTsLeft;
            // return the money 
            (bool success, ) = payable(_victim).call{value: priceOfNFTEscrow }("");
            require(success, "Payment not sent");
            // console.log("Player has been burned");
            // console.log("Balance of Victim: %s", balanceOf(_victim));
        } else {
            player.hp = player.hp - potentialDamage;
            // console.log("Attack Damage", attacker.attackDamage, _random) ;
            // console.log("Player attacked enemy. New Enemy hp is: %s\n", player.hp);
            emit SuccessfulAttack(_attacker, _victim, potentialDamage, player.hp);
        }
    }

    // Boiler plate function to make the request to the airnode for a random number
    // while keeping track of the request ID, attakcer and the target
    function makeRequestUint256(address _victim, address _attacker) internal {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode, endpointIdUint256, address(this), sponsorWallet, address(this), this.fulfillUint256.selector, ""
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        //tag the request with the victim
        whoToHit[requestId] = [_victim, _attacker];
        emit RequestUint256(requestId);
    }

    // Boiler plate function to receive the random number from the airnode
    // Hit function is called with the random number
    function fulfillUint256(bytes32 requestId, bytes calldata data) external onlyAirnodeRrp {
        require(expectingRequestWithIdToBeFulfilled[requestId], "Request ID not known");
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        // Convert the uint256 to a number in the range 1-100
        randomInRange = (qrngUint256 % 100) + 1;
        hit(whoToHit[requestId][0], whoToHit[requestId][1], randomInRange);
        emit ReceivedUint256(requestId, qrngUint256);
    }

    // Function to get the current day as a unique identifier
    function getCurrentDay() public view returns (uint256) {
        // Assuming the time is in UTC
        return (block.timestamp / 86400); // Divide the current timestamp by the number of seconds in a day
    }

    // Blast chain specific function to claim the gas this contract has used
    function claimMyContractsGas() external onlyOwner {
        BLAST.claimAllGas(address(this), msg.sender);
    }

    // Function for users to claim their prize, requires the game to be over and the user to have an NFT
    function claimYourPrize() external {
        if (gameInProgress == true) revert GameHasNotEnded();
        // if (block.timestamp < endTime) revert GameHasNotEnded();
        if (balanceOf(msg.sender) == 0) revert YouNeedAnNFT();
        _burn(nftHolders[msg.sender]);

        // calculate the yield
        uint256 payout = calculatePayout();
        uint256 reward = payout + priceOfNFTEscrow;
        //when the game ends return all deposits back to owners
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        require(success, "Payment not sent");
    }

    // Function to calculate the payout for the winners once the game is ended
    function calculatePayout() internal view returns (uint256) {  
        uint256 earnedYield = yieldCollected;
        if (earnedYield == 0) return 0;
        uint256 payout = earnedYield / winners;
        uint256 winnerPayout = payout * winners;
        return winnerPayout;
    }

    // Function to claim the yield generated by the contract
    function claimYieldGenerated() internal {
		BLAST.claimAllYield(address(this), address(this));
    }

    // Function to withdraw the funds from the contract
    function claimGasUsedByContract() external onlyOwner {
        BLAST.claimAllGas(address(this), msg.sender);
    }

    // Getter function to view the yield generated during the game
    function getYieldOnContract() view external returns (uint256){
        uint256 yield = BLAST.readClaimableYield(address(this));
        return yield;
    }

    // Function to request funds from the sponsor wallet and bring it into the contract
    function withdrawSponsorWalletFunds() external {
        airnodeRrp.requestWithdrawal(airnode, sponsorWallet);
    }

    // Function to withdraw the funds from the contract
    // Must have limitations set to prevent a rug pull
    function withdrawContractFunds() external  {
        // put a limiting end game requirement to stop a rug pull
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Payment not sent");
    }

    // fund contract with extra ETH
    receive() external payable {}
}