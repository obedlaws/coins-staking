//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Recievers is ERC20 {

    using Address for address;
    using SafeERC20 for IERC20;

    IERC20 private mETH;
    address private owner;

    constructor(address _mETH) ERC20("Bonance", "BNC"){
        mETH = IERC20(_mETH);
        owner = msg.sender;
    }

    function depositTokens(uint256 amount) public {
        require(amount > 0, "Amount should be greater than 0");
        mETH.safeApprove(address(this), amount);
        mETH.safeTransferFrom(msg.sender, address(this), amount);
    
    }

    function withdrawTokens(uint256 amount) public {
        mETH.safeTransfer(msg.sender, amount);
    }
}