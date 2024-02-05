const ethers = require("ethers");
require("dotenv").config();
const ABI = require("../artifacts/contracts/NFTAttack.sol/NFTAttack.json");
const {yourDeployedContractAddress} = require("./variables");

async function main() {

  const attacker = "0xe2b8651bF50913057fF47FC4f02A8e12146083B8";
  const victim = "0x9263bFf6ACCb60E83254E95220e7637465298171";
  // Connect to a provider (e.g., Infura, Alchemy)
  const provider = new ethers.JsonRpcProvider(process.env.BLAST_SEPOLIOA_RPC_URL);
  // Use your private key (keep this secure!)
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Smart contract ABI and address
  const contractABI = ABI.abi;

  // Create a contract instance
  const contract = new ethers.Contract(
    yourDeployedContractAddress,
    contractABI,
    wallet
  );

  console.log("Starting Attack...");
                                                // Your target's address
  const receipt = await contract.throwSnowball(victim);

  // console.log("Hash of the transaction: ", receipt.hash);

  let requestID;
  // Listen for all events from the contract
  contract.once("*", (event) => {
    // filter out with the specific transaction hash
    if (event.log.transactionHash === receipt.hash) {
      requestID = event.args[0];
      console.log("requestID: ", requestID);
    }
  });

  let txReceipt = await receipt.wait();
  if (txReceipt.status === 0) {
    throw new Error("Transaction failed");
  }
  console.log("Request completed successfully with request ID:", requestID);

  // console.log("Tnx logs: ", txReceipt.logs);
  // console.log("transaction receieipt: ", txReceipt.logsBloom);
  // console.log("transaction receieipt full: ", txReceipt);

  console.log("Waiting for the request to be fulfilled...");

  const response = await new Promise((resolve) => {
    // Function to clean up event listeners
    function cleanup() {
      contract.removeAllListeners(contract.filters.MissedAttack(attacker, victim));
      contract.removeAllListeners(contract.filters.SuccessfulAttack(attacker, victim, null, null));
      contract.removeAllListeners(contract.filters.NFTBurned(victim, null, attacker));
    }
  
    // Setting up listeners for each event
    contract.once(contract.filters.MissedAttack(), (event) => {
      if (event.args[0] !== attacker) {
        return;
      }
      console.log("Missed Attack");
      console.log("Attacker: ", event.args[0]);
      console.log("Victim: ", event.args[1]);
      resolve(event);
      cleanup();
    });
  
    contract.once(contract.filters.SuccessfulAttack(), (event) => {
      if (event.args[0] !== attacker) {
        return;
      }
      console.log("Successful Attack");
      console.log("Attacker: ", event.args[0]);
      console.log("Victim: ", event.args[1]);
      console.log("Attack Power: ", event.args[2]);
      console.log("Victim Health: ", event.args[3]);

      resolve(event);
      cleanup();
    });
  
    contract.once(contract.filters.NFTBurned(), (event) => {
      if (event.args[2] !== attacker) {
        return;
      }
      console.log("NFT Burned");
      console.log("Victim: ", event.args[0]);
      console.log("Token ID Burned: ", event.args[1]);
      console.log("Attacker: ", event.args[2]);
      resolve(event);
      cleanup();
    });
  });

//  console.log("response: ", response);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
