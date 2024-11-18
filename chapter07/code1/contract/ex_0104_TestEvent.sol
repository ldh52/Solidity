// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TestEvent {
	
    event myEvent1(uint256 indexed id, string message);

    event myEvent2(uint256 indexed id, string message);
    
    function fireEvent1(uint256 _id, string memory _message) public {
    	emit myEvent1(_id, _message);
    }

    function fireEvent2(uint256 _id, string memory _message) public {
    	emit myEvent2(_id, _message);
    }
}
