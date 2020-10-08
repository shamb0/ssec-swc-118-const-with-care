// SPDX-License-Identifier: MIT
// pragma solidity ^0.4.18;
// pragma solidity ^0.5.1;
pragma solidity ^0.6.0;

// import "@nomiclabs/buidler/console.sol";

contract OwnerWallet {

    address public owner;

    //constructor
    function ownerWallet(address _owner) public {
        owner = _owner;
    }

    receive () external payable {

    }

    // fallback. Collect ether.
    fallback () external payable {

    }

    function withdraw() public {
        require(msg.sender == owner);
        msg.sender.transfer( address(this).balance );
    }

}
