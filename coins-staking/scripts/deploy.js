
const hre = require("hardhat");

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const Bonance = await ethers.getContractFactory("Bonance");
  const bonance = await Bonance.deploy();

  const MainETH = await ethers.getContractFactory("MainEthereum");
  const mainETH = await MainETH.deploy();

  const Recievers = await ethers.getContractFactory("Recievers");
  const recievers = await Recievers.deploy(mainETH.address);

  await mainETH.deployed();
  
  await mainETH.approve(owner.address, 20000000000);
  await mainETH.approve(recievers.address, 20000000000);

  await mainETH.transfer(addr1.address, 5000);

  await recievers.stakeToken(50);


 console.log("MainETH deployed to: ", mainETH.address);
 console.log("Bonance deployed to: ", bonance.address);
 console.log("Bonance Farm deployed to: ", recievers.address);

 const tx = await mainETH.balanceOf(recievers.address);
 const tx2 = await bonance.balanceOf(recievers.address);
 console.log("has staken :", tx);
 console.log("All token are:", tx2);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
