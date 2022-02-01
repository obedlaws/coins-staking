
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
        
  const Bonance = await ethers.getContractFactory("Bonance");
  const bonance = await Bonance.deploy();

  const MainETH = await ethers.getContractFactory("MainETH");
  const mainETH = await MainETH.deploy();

  const BonanceFarm = await ethers.getContractFactory("BonanceFarm");
  const bonanceFarm = await BonanceFarm.deploy(bonance.address, mainETH.address);

  const tx = await bonanceFarm.stakeToken(800);

  await owner.sendTransaction(tx);

  console.log("Bonance deployed to:", bonancefarm.address);
  console.log(mainETH.balanceOf(bonanceFarm.address));
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
