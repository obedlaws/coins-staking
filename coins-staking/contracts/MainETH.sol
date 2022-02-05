//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MainETH is ERC20 {

    constructor() ERC20("MainEthereum","mETH") {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }
}
