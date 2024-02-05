import { ethers } from "hardhat";

async function main() {

  const airnode = "0xD223DfDCb888CA1539bb3459a83c543A1608F038"; //Blast Airnode //"0x2ab9f26E18B64848cd349582ca3B55c2d06f507d"; // Airnode Sepolia
  const names = ["Tank", "Balanced", "Swift"];
  const images = ["https://i.imgur.com/DYy7js6.jpeg", 
    "https://i.imgur.com/lgPFnUw.jpeg", 
    "https://i.imgur.com/yRMhDS0.jpeg"];
  const hp = [210, 205, 190];
  const attack = [18, 23, 27];
  const defense = [18, 15, 12];
  const evade = [2, 12, 27];
  
  const TokenEx = await ethers.getContractFactory("NFTAttack");
  const tokenEx = await TokenEx.deploy(airnode, names, images, hp, attack, defense, evade);                                

  await tokenEx.waitForDeployment();

  console.log(`Contract address: ${tokenEx.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
