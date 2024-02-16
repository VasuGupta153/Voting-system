// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Data {
    struct user {
        string name;
        string email;
        string idProof;
        string profession;
    }

    struct ongoingContractDetails {
        string name;
        string totalVotes;
        string leadingCandindate;
    }

    mapping(address => user) public usersMap;
    mapping(address => bool) public userExistsMap;
    mapping(address => string) public contractDetailsMap;
    mapping(address => string) public finishedContractsMap;

    function userExist(address _userAddress) external view returns (bool){
        if(userExistsMap[_userAddress])
            return true;
        return false;
    }

    function addUser(address _userAddress,user memory _userDetial) external {
        userExistsMap[_userAddress] = true;
        usersMap[_userAddress] = _userDetial;
    }

    function getUserData(address _address) public view returns (user memory) {
        return usersMap[_address];
    }

    function addContractAddress(address _contractAddress, string memory _name) public {
        contractDetailsMap[_contractAddress] = _name;
    }

    function addFinishedContract(address _contractAddress, string memory _details) public {
        finishedContractsMap[_contractAddress] = _details;
    }
}