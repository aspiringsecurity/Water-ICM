const ethers = require("ethers");
require("dotenv").config();
const ABI = require("../artifacts/contracts/NFTAttack.sol/NFTAttack.json");
const {yourDeployedContractAddress} = require("./variables");


async function main() {

  // Connect to a provider (e.g., Infura, Alchemy)
  const provider = new ethers.JsonRpcProvider(process.env.BLAST_SEPOLIOA_RPC_URL);
  // Use your private key (keep this secure!)
  const privateKey = process.env.PRIVATE_KEY;
  const privateKey2 = process.env.PRIVATE_KEY2;
  const wallet = new ethers.Wallet(privateKey, provider);
  const wallet2 = new ethers.Wallet(privateKey2, provider);

  // Smart contract ABI and address
  const contractABI = ABI.abi;

  // Create a contract instance
  const contract = new ethers.Contract(yourDeployedContractAddress, contractABI, wallet);
  const contract2 = new ethers.Contract(yourDeployedContractAddress, contractABI, wallet2);

  console.log(
    "End The Game..."
  );

  //End the game
  const end = await contract.endGame();
    let txReceiptEnd = await end.wait();
    if (txReceiptEnd.status === 0) {
      throw new Error("Transaction failed");
    }
    console.log(
      "Game Ended"
    );
  
  //Look at yield earned
  const yield = await contract.getYieldOnContract();
  console.log("Yield Earned: ", ethers.formatEther(yield), "ETH");

    console.log(
      "Claiming Rewards..."
    );

  //Claim rewards
  const receipt = await contract.claimYourPrize();

  let txReceipt = await receipt.wait();
  if (txReceipt.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Owner Claimed Prize"
  );

  const receipt2 = await contract2.claimYourPrize();

  let txReceipt2 = await receipt2.wait();
  if (txReceipt2.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Other Wallet Claimed Prize"
  );

  // Claim contract gas
  const gas = await contract.claimGasUsedByContract();
  let txReceiptGas = await gas.wait();
  if (txReceiptGas.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Gas Claimed"
  );
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
