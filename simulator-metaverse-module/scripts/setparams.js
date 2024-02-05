const ethers = require("ethers");
require("dotenv").config();
const ABI = require("../artifacts/contracts/NFTAttack.sol/NFTAttack.json");
const { airnodeAddress, endPointAddress, yourDeployedContractAddress, sponsorWallet } = require("./variables");


async function main() {
  // Connect to a provider (e.g., Infura, Alchemy)
  const provider = new ethers.JsonRpcProvider(process.env.BLAST_SEPOLIOA_RPC_URL);
  // Use your private key (keep this secure!)
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Smart contract ABI and address
  const contractABI = ABI.abi;

  // Create a contract instance
  const contract = new ethers.Contract(yourDeployedContractAddress, contractABI, wallet);

  console.log(
    "Setting Params, waiting for it to be confirmed..."
  );

  const receipt = await contract.setRequestParameters(
    airnodeAddress,
    endPointAddress,
    sponsorWallet
  );

  let txReceipt = await receipt.wait();
  if (txReceipt.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log(
    "Request Parameters set"
  ); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
