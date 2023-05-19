// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function airdropNfts(address[] calldata wAddresses, string memory tokenURI) public onlyOwner {

        for (uint i = 0; i < wAddresses.length; i++) {
            mintNFT(wAddresses[i], tokenURI);
        }
    }

    function updateTokenURI(uint256 tokenId, string memory newURI) public {
        _setTokenURI(tokenId, newURI);
    }
}