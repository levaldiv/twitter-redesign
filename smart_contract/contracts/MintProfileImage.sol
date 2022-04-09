// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProfileImageNfts is ERC721, Ownable {

    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;

    // defines schema of object
    struct RenderToken{
        uint256 id;
        string uri;
        string space;
    }

    // as soon as the app runs
    constructor() ERC721("ProfileImageNFTs","PIN"){}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId),"URI not exist on that ID");
        //acutal URI given the token ID
        string memory _RUri =  _tokenURIs[tokenId];
        return _RUri;
    }

    function getAlltoken() public view returns (RenderToken[] memory){
        // keeps track of current token
        uint256 latestId = _tokenIds.current();
        // res is a type redner token, an array of objects
        // exist is a built in fcn from solidity and knows everything that has been created
        // line 41 is apending an obj inside the token res
        RenderToken[] memory res = new RenderToken[](latestId);
        for(uint256 i = 0; i  <= latestId ; i++){
            if(_exists(i)){
                string memory uri = tokenURI(i);
                // returns an obj, with keys id, uri, space
                // i is the token id, uri maps to line 19 uri
                res[i] = RenderToken(i,uri," ");
            }
        }
        // returns an array of all the tokens
        return res;
    }

    function mint(address recipents, string memory _uri) public returns (uint256){
        // which ever token were at
        uint256 newId = _tokenIds.current();
        _mint(recipents,newId);
        _setTokenURI(newId,_uri);
        _tokenIds.increment();
        return newId;
    }
}