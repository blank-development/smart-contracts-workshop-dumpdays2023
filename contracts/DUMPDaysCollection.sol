// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DUMPDaysCollection is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("DUMP Days Collection", "DDC") {}

    function mintToken() external {
        _tokenIdCounter++;
        _mint(0x593092c91bCfEe1Bd73EFcf9729E049e70133154, _tokenIdCounter);
    }
}
