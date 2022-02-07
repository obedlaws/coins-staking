
import { ethers } from "hardhat";

async function main() {

  //1. Simply deploying contract.
  const MainEthereum = await ethers.getContractFactory("MainETH");
  const mainEthereum = await MainEthereum.deploy();
    
  const Bonance = await ethers.getContractFactory("Bonance");
  const bonance = await Bonance.deploy();
    
  const BonanceFarm = await ethers.getContractFactory("BonanceFarm");
  const bonanceFarm = await BonanceFarm.deploy(mainEthereum.address, bonance.address);
  

  //2. Setup approving contract to use tokens and total supply of Bonance to Farm Contract.
  await mainEthereum.approve(bonanceFarm.address, "21000000000000000000000000");
  await bonance.approve(bonanceFarm.address, "21000000000000000000000000");
  await bonance.transfer(bonanceFarm.address, "21000000000000000000000000")

  console.log("mETH deployed at:", mainEthereum.address);
  console.log("Bonance deployed at:", bonance.address);
  console.log("Bonance Farm deployed at:", bonanceFarm.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
