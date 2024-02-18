// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Election.sol";

contract Data {
    struct user {
        string name;
        string email;
        uint256 age;
        string idProof;
        string profession;
    }
    struct contractDetails{
        uint256 id;
        string name;
        address contractAddress;
        string purpose;
        uint256 ageCheck;
        string profCheck;
        uint timeDuration;
    }
    
    mapping(address => user) public usersMap;
    mapping(address => bool) public userExistsMap;
    // election id is mapped with election address
    mapping(uint256 => contractDetails) public elections;
    uint256 current_id = 1;

    // Functions of user details
    function userExist(address _userAddress) external view returns (bool){
        if(userExistsMap[_userAddress])
            return true;
        return false;
    }

    function addUser(address _userAddress,user memory _userDetial) external {
        userExistsMap[_userAddress] = true;
        usersMap[_userAddress] = _userDetial;
    }

    // functions for election and their detailss
    function addElection(contractDetails memory _details) public returns(uint256){
        uint256 election_id = current_id;
        Election userElection = new Election(address(this),_details.name,_details.purpose,_details.ageCheck,_details.profCheck,_details.timeDuration);
        elections[election_id] = _details;
        elections[election_id].id = current_id;
        elections[election_id].contractAddress = address(userElection);
        current_id++;                     
        return election_id;
    }

    function getContractAddress(uint256 id) view external returns (address){
        return elections[id].contractAddress;
    }

    function getNameByAddress(address userAddress) view external returns (string memory){
        return usersMap[userAddress].name;
    }
}