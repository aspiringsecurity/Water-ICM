const ethers = require("ethers");
require("dotenv").config();
const ABI = require("../artifacts/contracts/NFTAttack.sol/NFTAttack.json");
const {yourDeployedContractAddress } = require("./variables");


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
    "Starting The Game..."
  );

  //START the game
  const starter = await contract.startGame();
    let txReceiptStarter = await starter.wait();
    if (txReceiptStarter.status === 0) {
      throw new Error("Transaction failed");
    }
    console.log(
      "Game Started"
    );

    console.log(
      "Minting NFTs..."
    );

  //make sure to pay!!!!
  const receipt = await contract.enterTheArena(0 ,{value: ethers.parseEther("0.05")});

  let txReceipt = await receipt.wait();
  if (txReceipt.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Owner Minted NFT"
  );

  const receipt2 = await contract2.enterTheArena(1, {value: ethers.parseEther("0.05")});

  let txReceipt2 = await receipt2.wait();
  if (txReceipt2.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Other Wallet Minted NFT"
  );
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
