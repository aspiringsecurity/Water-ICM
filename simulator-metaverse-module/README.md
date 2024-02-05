# The Last Few Standing

## Overview
Many NFTs enter, only a few survive.  Stake a small amount of ETH to join the game, survive until the end of the game and share the prize of the staked yield on Blast network.

### Key Features
- **Free to play**:All users get their stake back after playing the game
- **Prize increases with more players**: Yield is earned through staked ETH, so it encourages more players to join to get a share of the prize.
- **Character Attributes**: All data is stored on chain, such as health status.
- **Fair Play**: Using API3's QRNG (Random Numbers), we let everyone have a fair chance at winning the prize.

## SnowDay & NFTAttack Contracts

### Important Functions
- `startGame()`: Starts the game, setting up the necessary state to allow players to enter the game.
- `endGame()`: Ends the game and allows winners to claim rewards.
- `enterTheArena(uint256 _characterIndex)`: Allows a user to stake a small amount of ETH and claim an NFT to participate
- `throwSnowball(address _victim)`: Choose another players NFT to "throw a snowball at", the goal is to knock out other players to receive a higher prize.
- `claimYourPrize()`: Allows the winners to claim back their stake and any yield earned during the game.

### Events
- `CharacterNFTMinted`: Emitted when a new character NFT is minted, can let others know a new player has entered the game
- `MissedAttack`: Target received no damage
- `SuccessfulAttack`: Target was hit and health is lowered
- `NFTBurned`: Player is out of the game and their stake has been returned

## The Contracts
The setup consists of 4 files.
- `Interface/IBlast.sol`: This are there interfaces to take advantage of the unique Blast network's tools
- `lib/Base64.sol`: Libary to allow us to encode our tokenURI intoa base64 format
- `SnowDay.sol`: Base NFT contract - Setups of basic minting, and formating of the NFT structure
- `NFTAttack.sol`: Front facing contract that sets up the yield and gas mode for blast network, handles the random number requests and sets the logic for the game play.

## Snowday.sol
The snowday contract is the NFT portion of the game.  It uses the standard ERC721 format while also keeping stats of the NFT on chain.  The image can be hosted externaly on a medium such as IPFS or Arweave.  It imports the BASE64.sol file to encode the tokenURI to squeeze in as much onchain data as we can in the evm on a single line return.
On deployment the constructor requires the Names, Image URI, HP, Attack, Defense, and Evade stats for each character (standard setup is 3).
The contract has internal functions for a front facing contract to add logic to.
- start the game
- end the game
- mint an NFT
- many getters for the front end to check on status such as HP
- functions to update names and stats of each character
- function to add new characters to the roster

## NFTAttack.sol
This contract has the blast yield strategy, game mechanics and random number management (using API3's QRNG)
- It imports `IBlast.sol` which is the standard interface contract for all contracts deploying to blast
- the RrpRequesterV0.sol to handle the random number requests
- the SnowDay contract with all the NFT functionality
- Open Zeppelin's only owner.

We interface BLASTs network contract with `IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002);` So we can call Blast function required.
We follow it up with global variables we need for the logic of our game.
Important ones to know are :
- airnode
- endpointIdUint256
- sponsorWallet


These varialbes are used in the setup of are random number parameters.
We have mappings that help keep track of our requests for random numbers
A mapping of who the attacker is and who they are attacking
Keeping track of how many times an NFT gets attacked daily
Keeping track of how many times and NFT can attackdaily

We have a few events to let us know that a request was made and that a response was received with our number

Our constructor has to satisfy a few of our import needs, our RrPRequesterV0 contract requires the `airnode` contract address specific to our chain.  You can find that [here](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/deployments/blast-sepolia-testnet/AirnodeRrpV0.json) `0xD223DfDCb888CA1539bb3459a83c543A1608F038`
Since we are importing in our `SnowDay` contract, we will also need to pass through all our names and stats
Finally, in the body of our constructor we are choosing our Blast network settings.  In this case, we are choosing to have claimableYield and claimableGas.  This allows us to claim the yield held by the ETH in our contract at a separate time and the ability to claim gas used by the contract.

Focusing on the random number aspect, there are 3 functions that control this 
- setRequestParameters
- makeRequestUint256
- fulfillUint256

The `setRequestParameters` function is only setup once, in which we tell our contract what we are asking for and who's going to pay for the gas.  In order to get true randomness, we must request a number from on offchain source.  Since validators can have the ability to roll back transactions, we can't do this on the same transaction or the game can be cheated.  Instead, we send a request for a number and a few blocks later the numbers comes in on another transaction.  The user pays for the request, but who pays for the response with the number transaction?  This is where our `sponsorWallet` comes in.  This is our relayer that pays for the gas when we return the value. (we will touch on how to generate a wallet later on)
- You will need the airnode ID (available in the [docs]("https://docs.api3.org/reference/qrng/providers.html#testnet-random-numbers")): 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D
- The Endpoind type is the choice of using a single number or an arrary of random numbers.  This case we are only requesting one number so we will use the endpointIdUint256 (not the endpointUint256Array): `0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36`

- Then we will need the sponsor wallet, the wallet is generated by a script that uses your deployed contract's address. (We can generate until it is deployed).  To read more about this here is the reference [Sponsor Wallet Creation](https://docs.api3.org/reference/airnode/latest/packages/admin-cli.html#derive-sponsor-wallet-address)  You need to run a script that will grab the [extended public address]("https://docs.api3.org/reference/qrng/providers.html#testnet-random-numbers"): `xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo`
- The airnode address: 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D
- Your deployed contracts address that will need the sponsoring: TBD when you deployed.
Once the sponsor wallet is created, it will need to be funded with some gas to be able to pay for the returned number transaction.
- For reference, there is a script called `fund.js` in the scripts folder that does this for you already, you will need to update the `variables.js` with you deployed contract address and the run the fund.js script.

The `makeRequestUint256` is where our logic sends the request to get the random number.  Most of it is boiler plate code except the logic where we keep track of our target and the wallet that send the attack.  It is tied to a requestId so in case there are 10 different requests at the same time, we can keep track of each request.

The `fulfillUint256` is the function that is called when out number is returned to us (from the sponsor wallet, hence the modifier of onlyAirnodeRrp). Once our number is received, we will input our logic and do something with our number.  In this case we will call another function within this function to see what damage our snowball did to our target.

If you would like a much more detailed breakdown on the QRNG setup, please refer to this video for [step by step instructional]("https://www.youtube.com/watch?v=pV976MvviIA&t=904s")

### The Logic

The functions:
- `startGame`: The external function that is callable only by the owner of the contract.  There are a few requirements we want to have in place to make sure the game runs smooth,  We don't want to restart a game if a game already is in progress with checking the boolean `gameInProgress`, we also want to have a delay when a game ends to allow users to claim their winnings.  This function then calls the internal `startTheGame` in SnowDay.sol that runs those logistics
- `endGame`: Once the game set time has passed, anyone can end the game (or the community can choose to let the game continue).  The internal function of `endTheGame` is called and a snapshot of the remaining winner count is taken.  The yield generated during the game is pulled into the contract and used the variable is used to calculate the payout.
- `enterTheArena`: This function is where the user can temporarily stake to mint and NFT to join the game.  Users are only allowed to mint one NFT at a time.  There is also a minting window, (set in the `startTheGame` in SnowDay.sol) so it doesn't allow users to mint an NFT last minute before the game ends and claim a prize (currently set to a two day window)
- `throwSnowball`: This is the primary function called during the game. The user will set the address to who they want to attack and send out the request to receive the random number `makeRequestUint256`.  In order to avoid spammers and mass centralized attacks, we keep a two mappings `dailyAttacksReceived` and `attacksSentDaily`.  We are capping attacks to 3 attacks a day and NFT tokenId getting attacked daily (set by `MAX_ATTACKS` and `MAX_SHOTS_TAKEN`)
- `hit`: an internal function called by the fulfillUint256, this is the bulk of the attack logic.  Keep note that logic hear uses gas from the tx of the sponsor wallet.  The target, attacker and the modulared number is passed through. The attributes of the NFT are copied to a local memory to run the calculations and end result.  To keeps things suspensfull, we add 50% chance to miss while also adding in the character's ability to evade (from their stats).  If the damage sent meets the requirements to hit it will calculate the damage it will due the target NFT.  If the damage is more than the health of the target, it will burn the NFT of the target, lower the amount of NFTs left to claim the prize, returns the stake to the player that is now out of the game. If the damage doesn't finish the target, theh health is updated and reflected onchain.
- `getCurrentDay`: A way to check what current day it is, taking the block.timestamp divided by 86400 (how many seconds there are in a day)
- `claimMyContractGas`: This function allows the owner of the contract to claim ALL the gas that the contract generated.  This is unique to the Blast network.
- `claimYourPrize`: After the game has ended, those that still have an NFT will be able to claim their prize.  Upon claiming the prize, the NFT will be burned and will call the `calculatePayout` function to see how much of the yield share goes to each winner and then will return the users stake and the winners yield.
- `calculatePayout`: This function reads the yield generated by the contract during the game.  When the time has ended, the yeild is pulled and used to calculate the payout split with the total amount of winners.
- `claimYieldGenerated`: Internal function to claim the yield generated by the contract during the game.  Called when the game ends.
- `claimGasUsedByContract`: Allows the owner of the contract to claim the share of gas generated by the contract.
- `getYieldOnContract`: A getter function to read the yield generated by the contract.
- `withdrawSponsorWalletFunds`: This function allows us to claim back the funds we load the sponsor wallet with.  (Currently there is not direct way to retreive funds from a sponsor wallet, so this is a way to bring the funds into the contract)
- `withdrawContractFunds`: The ability to pull funds (Primarily used for testing purposes).  If kept in, there should be requirements that will not allow contract owner to rug the game.
- `receive`: A special function that will allow the contract to receive ETH by sending it to the address.  (Can be used to increase the yield)



## The Scripts
The scripts folder, has multiple scripts to run through a test run of the game.  With the proper .env (PRIVATE_KEY, BLAST_SEPOLIA_RPC) in place, you can run through the scripts to play the game. 
- `variable.js`: This will hold all the variables in the contract to be used by the scripts, such as the deployed contract address and sponsor wallet. 
- `deploy.ts`; This has the airnode variable for the Blast network set as well as all the data for the 3 starting characters, each with their own attributes to give options of play style.  Once deployed, the address will print out to the console (to be put into variables.js file).
- `fund.js`: This uses the `@api3/airnode-admin` libary to generate the sponsor wallet, using the variables set in the `variable.js` file, it will generate AND fund the sponsor wallet with 0.001 ETH
- `setparams.js`: With the sponsor wallet updated in the `variables.js`, you can now setup the contract by calling the `setRequestParameters` with the variables set.  This will set up your contract to request random numbers.
- `t_mintnft.js`:This script will start the game. Adding two different private keys (deployer and another wallet), it will Mint the NFT for 2 different wallets staking the temp hold.
- `y_attack.js`: Placing the public address of the attacker and the target, the script will send the `throwSnowball` function to the victim. Once the request has be sent, we will keep track of the requestID.  We will then listen and wait for a response from the contract to return our number and see what even occursed during the attack.  MissedAttack, SuccessfulAttack or NFTBurned.
- `z_endgame.js`: This will end the game and allow the users to claim their prizes calling the `claimYourPrize` function and let the owner of the contract `claimGasUsedByContract` to harvest the gas rewards.  Ending the game and allowing a new game to start.

Deploy the contract:
```Javascript 
npx hardhat run scripts/deploy.ts --network blastsepolia
 ```
 It will console out:
 ```
 Contract address: 0xdFDf1c5b8847C841fd27F9d7257822fc37A845Ab
 ```
 Verify the contract (make sure args.js match your deployment args)
 ```
 npx hardhat verify --network blastsepolia --constructor-args args.js 0xdFDf1c5b8847C841fd27F9d7257822fc37A845Ab
 ```

 Make sure to update `variables.js` with your contract address, then run:
 ```
 npx hardhat run scripts/fund.js
 ```
 It will return the status in the console to let you know it was successful.
 ```
 Sponsor wallet address: 0x0aC744292ef8015030721b6376D282493e95758F
Funding sponsor wallet at 0x0aC744292ef8015030721b6376D282493e95758F with 0.001 ...
Sponsor wallet funded
 ```
Make sure to update the `variables.js` file with your new sponsor wallet, then run:

```
npx hardhat run scripts/setparams.js
```
To run the next specific script, you will need two separate private keys.  This will have two different wallets mint an NFT to play eachother
```
npx hardhat run scripts/t_mintnft.js
```
It will console out if successful:
```
Game Started
Minting NFTs...
Owner Minted NFT
Other Wallet Minted NFT
```
In this following script, put the public and the victims public addresses for the variables to see who attackts who.  It will send the request and then put up and event listener to see what happens when the numbers is returned to the contract


```
npx hardhat run scripts/y_attack.js 
```
It will return an example like this over time:
```
Starting Attack...
requestID:  0xa836a9c9a33c4d68d269e2315bf5cae6433f7b249dc0ea1e98b4aa5f140f42a1
Request completed successfully with request ID: 0xa836a9c9a33c4d68d269e2315bf5cae6433f7b249dc0ea1e98b4aa5f140f42a1
Waiting for the request to be fulfilled...
Successful Attack
Attacker:  0xe2b865....083B8
Victim:  0x9263b...98171
Attack Power:  4n
Victim Health:  201n
```

After a few rounds of attacks and when the game can end based on the requirements, assuming both NFTs survived, the game will end and both NFTs will claim their prize and escrow deposit back while the owner of the contract will claim the gas used by the contract.

```
npx hardhat run scripts/z_endgame.js
```

It will output:
```
End The Game...
Game Ended
Yield Earned:  0.0 ETH
Claiming Rewards...
Owner Claimed Prize
Other Wallet Claimed Prize
Gas Claimed
```

The game has completed and ready to play again