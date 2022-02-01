//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MainEthereum is ERC20{
    constructor() ERC20("MainEthereum", "mETH") {
        _mint(msg.sender, 20000000000 * 10 ** decimals());
    }
}