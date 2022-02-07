//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract BonanceFarm{

    using Address for address;
    using SafeERC20 for IERC20;

    IERC20 private mETH;
    IERC20 private bonance;
    address private owner;

     // Staking rewards variables and mappings
    uint public rewardRate = 5;
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;

    uint private _totalSupply;
    mapping(address => uint) private _balances;

    constructor(address _mETH, address _bonance) {
        mETH = IERC20(_mETH);
        bonance = IERC20(_bonance);
        owner = msg.sender;
    }

    modifier updateRewards(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    // -1. Rewards per token staken
    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return 0;
        }
        return rewardPerTokenStored + (
            rewardRate * (block.timestamp - lastUpdateTime) * 1e18 / _totalSupply
        );
        
    }
    // 0. Token earned by each user.
    function earned(address account) public view returns (uint) {
        return(
            _balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18
        ) + rewards[account];
    }

    //1. Deposit MainEthereum
    function stake(uint amount) external updateRewards(msg.sender){
        _totalSupply += amount;
        _balances[msg.sender] += amount;
        mETH.safeTransferFrom(msg.sender, address(this), amount);
    }

    //2. Withdraw MainEthereum
    function unstake(uint amount) external updateRewards(msg.sender){
        _totalSupply -= amount;
        _balances[msg.sender] -= amount;
        mETH.safeTransfer(msg.sender, amount);
    }

    //3. Get Bonance Rewards
    function getReward() external updateRewards(msg.sender){
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        bonance.transfer(msg.sender, reward);
    }


}

