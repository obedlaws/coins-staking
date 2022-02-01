//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Recievers {

    IERC20 private _bonance;

    event Approval(msg.sender);
}