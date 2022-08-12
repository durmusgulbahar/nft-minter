// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ZiontopiaNFT is ERC721URIStorage, Ownable{

    uint256 public tokenIds = 0;
    uint public _price = 10000 gwei;

    constructor() public ERC721("ZiontopiaNFT", "ZTP") {}

    function mintNFT(string memory tokenUri)
        public payable
    {   
        require(msg.value == _price, "NFT price is 0.01 BNB");
        tokenIds += 1;
        uint256 newItemId = tokenIds;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
    }
}