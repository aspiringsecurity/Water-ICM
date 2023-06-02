//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BundleContract {
    // A BundleContract represents digital ownership over bundle files produced by a ThetaTV creator.
    
    string private name; // Name of the theta bundle contract / item.
    string private bundleUrl; // Link to the video assets on IFPS.
    string private creatorName; // Theta creator of the bundle.
    address private payableAddress; // Address to credit on purchase.

    uint private price;
    address owner;

    constructor(string memory _name, string memory _bundleUrl, string memory _creatorName, address _payableAddress, uint _price) {
        
        console.log("Deploying a BundleContract with name:", _name);
        name = _name;
        bundleUrl = _bundleUrl;
        creatorName = _creatorName;
        payableAddress = _payableAddress;
        price = _price;
    }

    function purchase() public payable {
        require(owner == address(0) , "Bundle already purchased");
        require(msg.value == price, "Incorrect amount");

        // Set ownership of contract.
        payable(payableAddress).transfer(msg.value);
        owner = msg.sender;
    }

     function getOwner() public view returns (address) {
        return owner;
    }

    function getPrice() public view returns (uint) {
        return price;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getCreator() public view returns (string memory) {
        return creatorName;
    }

    function getBundleUrl() public view returns (string memory) {
        return bundleUrl;
    }

}