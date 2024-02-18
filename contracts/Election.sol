// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Data.sol";

contract Election {
    struct candidate {
        address add;
        uint numVotes;
    }

    string public electionName;
    string public purpose;
    uint256 public ageCheck;
    string public profCheck;
    uint256 public timeDuration;
    uint256 public timeCreation;
    bool public isFinished = false;
    candidate public winner;
    address public dataContract;

    constructor(address _dataContract,string memory _electionName, string memory _purpose, uint256 _ageCheck, string memory _profCheck, uint256 _timeDuration) {
        electionName = _electionName;
        purpose = _purpose;
        ageCheck = _ageCheck;
        profCheck = _profCheck;
        timeDuration = _timeDuration;
        timeCreation = block.timestamp;
        dataContract = _dataContract;
    }
    candidate[] public candidates;

    mapping(address => bool) public voters;
    mapping(address => bool) public isCandidate;
    mapping(address => bool) public hasVoted;
    uint256 public totalVotes;
    uint256 public totalvoters;
  
    function checkFinished() external returns (bool){
        if(timeCreation + timeDuration <= block.timestamp){
            isFinished = true;
            winner = winningCandidate();
        }
        return isFinished;
    }

    function retrieveWinner() view external returns(string memory,uint256,uint256){
        string memory name = Data(dataContract).getNameByAddress(winner.add);
        return (name,winner.numVotes,totalVotes);
    }

    function retrieveLeadingCandidate() view external returns (string memory) {
        candidate memory leading = winningCandidate();
        string memory name = Data(dataContract).getNameByAddress(leading.add);
        return (name);
    }
  

    function winningCandidate() private view returns (candidate memory _winningCandidate) {
        uint winningVoteCount = 0;
        uint winningCandidateIndex = 9999;

        for (uint i = 0; i < numOfCandidates(); i++) {
            if (candidates[i].numVotes > winningVoteCount) {
                winningVoteCount = candidates[i].numVotes;
                winningCandidateIndex = i;
            } else if (candidates[i].numVotes == winningVoteCount && i != winningCandidateIndex) {
                winningCandidateIndex = 9999;
            }
        }
        _winningCandidate = candidates[winningCandidateIndex];

    }

    function retrieveChecks() external view returns (uint256, string memory){
        return (ageCheck,profCheck);
    }

    function authorizeUser(address voter) external {
        voters[voter] = true;
        totalvoters++;
    }

    function retrieveRunForElectionChecks() external view returns (uint256, uint256){
        return (totalvoters, candidates.length);
    }

    function runForElection(address voter) external {
        isCandidate[voter] = true;
        candidate memory cd = candidate(voter,0);
        candidates.push(cd);
    }

    function numOfCandidates() public view returns(uint) {
        return candidates.length;
    }
    
    function vote(address _voter, address _candidateAddress) external{
        for(uint256 i = 0;i < candidates.length; i++){
            if(candidates[i].add == _candidateAddress){
                candidates[i].numVotes++;
                hasVoted[_voter] = true;
            }
        }
        totalVotes++;
    }

}
