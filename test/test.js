const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking coins", function (){
    it("balance of pool is 500", async () => {
        const owner = await ethers.getSigners();

        const MainETH = await ethers.getContractFactory("MainETH");
        const mainETH = await MainETH.deploy();
      
        const Recievers = await ethers.getContractFactory("Recievers");
        const recievers = await Recievers.deploy(mainETH.address);
      
        await recievers.deployed();

        await recievers.connect(owner).depositTokens(500);

        expect(await mainETH.balanceOf(recievers.address)).to.equal(500)
    })
})