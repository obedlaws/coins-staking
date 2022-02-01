const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Bonance,mETH and IFO", function () {
  it("should create token and mint tokesn", async () => {
        const [owner] = await ethers.getSigners();

        const MainETH = await ethers.getContractFactory("MainEthereum");
        const mainETH = await MainETH.deploy();

        const Bonance = await ethers.getContractFactory("Bonance");
        const bonance = await Bonance.deploy();

        await bonance.deployed();
        const balanceETH = await mainETH.balanceOf(owner.address);
        const balanceBNC = await bonance.balanceOf(owner.address);

        expect(await bonance.totalSupply()).to.equal(balanceBNC)
        expect(await mainETH.totalSupply()).to.equal(balanceETH)
    });
})


describe("bDEX", function (){
    it("should deploy dex and send token to smart contract", async () => {
        const [owner] = await ethers.getSigners();
        
        const MainETH = await ethers.getContractFactory("MainEthereum");
        const mainETH = await MainETH.deploy();

        const Bonance = await ethers.getContractFactory("Bonance");
        const bonance = await Bonance.deploy();

        
    })
})