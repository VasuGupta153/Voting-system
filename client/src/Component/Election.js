import {React,useEffect,useState} from "react";
import abi from "../abis/Election.json";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const { ethers} = require("ethers"); 

function Election(props) {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [election,setElection] = useState({
    address : ' ',
    name : '',
    id : 0
  })
  const [leadingCandidate, setLeadingCandidate] = useState("");
  const [isFinished,setIsFinsihed] = useState();
  const [candidateList, setCandidateList] = useState([]);


  useEffect(() =>{
    // console.log(election.name);
    setElection({address: location.state.electionAddress, name : location.state.electionName, id: location.state.setElectionId})
    let provider,signer;
    async function intialiser(){
      try {
        if (window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
          setIsConnected(true);
        } else {
          alert("MetaMask extension not detected. Please install MetaMask.");
        }
   
        const contractAddress = location.state.electionAddress;
        const providerContract = new ethers.Contract(
          contractAddress,
          abi,
          provider
        )
        const signerContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        )
        // const isFinished = await signerContract.isFinishedFunction();
        // setIsFinsihed(isFinished);
        const candidates = await providerContract.getCandidates();
        setCandidateList(candidates);
        const check = Number(await providerContract.totalVotes());
        if(check > 0){
          const leading = await providerContract.retrieveLeadingCandidate();
          setLeadingCandidate(leading);
        }else{
          const leading = "No one has voted yet";
          setLeadingCandidate(leading);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } 
    intialiser();
  }
  ,[]);

  const authorizeYourSelf = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = location.state.electionAddress;
    const providerContract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    )
    const signerContract = new ethers.Contract(
     contractAddress,
     abi,
     signer
   )
   const checkIfAuthorized = await providerContract.voters(signer.address);
    if(checkIfAuthorized){
      alert("Already Authorized");
    }else{
      const ageCheck = await providerContract.ageCheck();
      const profCheck = await providerContract.profCheck();
      console.log(location.state.userAge);
      if(ageCheck <= location.state.userAge && profCheck === location.state.userProf){
        const tx = await signerContract.authorizeUser(signer.address);
        tx.wait();
        alert("You are Authorized");
      }else{
        alert("You cannot participate");
      }
    }
  }

  const runForElection = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = location.state.electionAddress;
    const providerContract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    )
    const signerContract = new ethers.Contract(
     contractAddress,
     abi,
     signer
   )
    const checkIfAuthorized = await providerContract.voters(signer.address);
    if(checkIfAuthorized){
      let check = await providerContract.isCandidate(signer.address);
      if(check){
        alert('Already candidate');
      }else{
        let totalvote = Number(await providerContract.totalvoters());
        let candidateLen = Number(await providerContract.numOfCandidates());
        console.log(totalvote);
        console.log(candidateLen);
        if(totalvote >= 2*candidateLen){
          const tx = await signerContract.runForElection(signer.address);
          tx.wait();
          alert('congratulations');
        }else{
          alert('Not Enough total vote');
        }
      }
    }else{
      alert("You are not authorized to run for election!");
    }
  }
  const vote = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = location.state.electionAddress;
    const providerContract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    )
    const signerContract = new ethers.Contract(
     contractAddress,
     abi,
     signer
   )
    const checkIfAuthorized = await providerContract.voters(signer.address);
    if(checkIfAuthorized){
      const hasVoted = await providerContract.hasVoted( signer.address);
      if(hasVoted){
        alert('User has already voted');
      }else{
        await signerContract.vote(address, (await signer).address);
        alert('Thanks for voting');
      }
    }else{
      alert("You are not authorized to vote!");
    }
  }
  const dataShow = candidateList.map((temp, index) => (
    <div key={index}>
      <h3>Candidate: {temp.name}</h3>
      <button onClick={() => vote(temp.add)}>Vote</button> 
      {/* <button onClick={vote(temp.add)}>vote</button> */}
    </div>  
  ));
  

  if(!isConnected){
    return ("Connect Your MetaMask");
  }else{
    // if(isFinished){
    //   return (
    //     <div>
    //       <Header />
    //       <h1>{election.name}</h1>
    //       <h3>{election.address}</h3>
    //       <h2>The Winning Candidate is:</h2>
    //       <h2>{leadingCandidate}</h2> 
    //     </div>
    //   );
    // }else{
      return (
        <div>
          <Header />
          <h1>{election.name}</h1>
          <h3>{election.address}</h3>
          {/* leadingcandidate & deadline  */} 
          <h2>{leadingCandidate}</h2> 
          <button onClick={authorizeYourSelf}> Authorize </button>
          <button onClick={runForElection}>Run for Election</button>
          <div id="showData">{dataShow}</div>
        </div>
      );
    }
  // }
}

export default Election;
