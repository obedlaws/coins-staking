import { expect } from "chai";
import { ethers, network } from "hardhat";

// Testing Farm Staking and Unstaking with dummy contract "Recievers".

describe("Staking", function () {
  it("Should stake mETH in smart contract", async function () {

    // Deploying contracts
    const MainEthereum = await ethers.getContractFactory("MainETH");
    const mainEthereum = await MainEthereum.deploy();

    const Bonance = await ethers.getContractFactory("Bonance");
    const bonance = await Bonance.deploy();

    const BonanceFarm = await ethers.getContractFactory("BonanceFarm");
    const bonanceFarm = await BonanceFarm.deploy(mainEthereum.address, bonance.address);

    /*
    Approving contract to use mETH then staking mETH and checking smart contract balance to see if token was deposited.     
    */

    await mainEthereum.approve(bonanceFarm.address, "21000000000000000000000000");
    await bonanceFarm.stake("500000000000000000000")

    expect(await mainEthereum.balanceOf(bonanceFarm.address)).to.equal("500000000000000000000");


  });
});

describe("Unstake", function () {
  it("Should transfer token back to owner", async function () {
    const [owner] = await ethers.getSigners();
    
    // Deploying contracts
    const MainEthereum = await ethers.getContractFactory("MainETH");
    const mainEthereum = await MainEthereum.deploy();

    const Bonance = await ethers.getContractFactory("Bonance");
    const bonance = await Bonance.deploy();

    const BonanceFarm = await ethers.getContractFactory("BonanceFarm");
    const bonanceFarm = await BonanceFarm.deploy(mainEthereum.address, bonance.address);
    
    /*
    Approving contract to use mETH staking mETH and unstaking to check if function works.    
    */

    await mainEthereum.approve(bonanceFarm.address, "21000000000000000000000000");
    
    await bonanceFarm.stake("21000000000000000000000000");
    await bonanceFarm.unstake("200000000000000000000");

    const balance = await mainEthereum.balanceOf(owner.address);

    expect(await balance).to.equal("200000000000000000000");
    
  });
});

describe("Rewards", function () {
  it("Should reward bonance tokens to user", async function () {
    const [owner] = await ethers.getSigners();

    // Deploying contracts
    const MainEthereum = await ethers.getContractFactory("MainETH");
    const mainEthereum = await MainEthereum.deploy();
    
    const Bonance = await ethers.getContractFactory("Bonance");
    const bonance = await Bonance.deploy();
    
    const BonanceFarm = await ethers.getContractFactory("BonanceFarm");
    const bonanceFarm = await BonanceFarm.deploy(mainEthereum.address, bonance.address);
    
    /*
    Approving contract to use mETH and Bonance, sending all Bonance supply to Farm contract,
    Staking mETH and the after some time pass get some Bonance token by using getReward function
    */
    await mainEthereum.approve(bonanceFarm.address, "21000000000000000000000000");
    await bonance.approve(bonanceFarm.address, "21000000000000000000000000");

    await bonance.transfer(bonanceFarm.address, "21000000000000000000000000")

    await bonanceFarm.stake("100000000000000000000");

    await network.provider.send("evm_increaseTime", [3600]);

    await bonanceFarm.getReward()

    const balance = await bonance.balanceOf(owner.address);

    expect(await balance).to.equal("18000");

  });
});

