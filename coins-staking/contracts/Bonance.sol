//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bonance is ERC20{
    constructor() ERC20("Bonance", "BNC") {
        _mint(msg.sender, 20000000 * 10 ** decimals());
    }
}

