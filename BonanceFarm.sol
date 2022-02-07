//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



contract BonanceFarm is IERC20 {

    string public name = "Bonance Harversting Fields";
    IERC20 private bonance;
    IERC20 public mainEthereum;
    address owner;
    
    
S
    address[] public Stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public Staked;
    mapping(address => bool) public Staking;

    constructor(Bonance _bonance, MainEthereum _mainEthereum) {
        bonance = _bonance;
        mainEthereum = _mainEthereum;
        owner = msg.sender;
    }

    //1. Stake
    function stakeToken(uint _amount) external {
        require(_amount > 0, "amount must be grater than 0");
        mainEthereum.Approval(msg.sender, address(this), _amount);
        mainEthereum.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!Staked[msg.sender]) {
            Stakers.push(msg.sender);
        }
        Staking[msg.sender] = true;
        Staked[msg.sender] = true;

    }

    //2. Unstake
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0,"must be grater than 0");
        mainEthereum.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        Staking[msg.sender] = false;

    }

    //3. Issue Token
    function issueToken() public {
        require(msg.sender == owner, "called should be the owner");
        for (uint i=0; i<Stakers.length; i++) {
            address recipient = Stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                bonance.transfer(recipient,balance);
            }
        }
    }
    

}