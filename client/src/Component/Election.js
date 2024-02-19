import {React,useEffect,useState} from "react";
import electionAbi from "../abis/Election.json";
import Header from "./Header";

const { ethers} = require("ethers"); 

function Election(props) {
  const [isConnected, setIsConnected] = useState(false);
  const [election,setElection] = useState({
    address : '',
    name : '',
    id : 0
  })
  const [leadingCandidate, setLeadingCandidate] = useState("");
  // const [candidateList, setCandidateList] = useEffect([]);

  let provider,signer,providerContract,singerContract;



  useEffect(() =>{
    console.log(props.electionName);
    setElection({address:props.electionAddress, name : props.electionName, id: props.setElectionId})
    async function intialiser(){
      try {
        if (window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = provider.getSigner();
          setIsConnected(true);
        } else {
          alert("MetaMask extension not detected. Please install MetaMask.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
      providerContract = new ethers.Contract(
        election.address,
        electionAbi,
        provider
      )
      
      singerContract = new ethers.Contract(
        election.address,
        electionAbi,
        signer
      )
      try{
        const leading = await providerContract.retrieveLeadingCandidate();
        // const candidates = await providerContract.candidates();
        // setCandidateList(candidates);
        setLeadingCandidate(leading);
      }catch(error){
        console.log(error);
      }
    } 
    intialiser();
  },[]);


  const runForElection = async () => {
    const isCandidate = await provider.isCandidate((await signer).address); 
    if(isCandidate){
      alert('Already candidate');
    }else{
      let totalvote;
      let candidateLen;
      [totalvote ,  candidateLen] = await providerContract.retrieveRunForElectionChecks();
      if(totalvote >= 2*candidateLen){
        await singerContract.runForElection((await signer).address);
        alert('congratulations');
      }else{
        alert('Not Enough total vote');
      }
    }
  }
  const vote = async (address) => {
    const hasVoted = await providerContract.hasVoted((await signer).address);
    if(hasVoted){
      alert('user has already voted');
    }else{
      await singerContract.vote(address, (await signer).address);
      alert('Thanks for voting');
    }
  }
  // const dataShow = candidateList.map((temp, index) => {
  //   <div key= {index}>
  //     Name of Candidate: {temp.name} , Address : {temp.add}
  //     <button onClick={vote(temp.add)}>vote</button>
  //   </div>
  // })

  if(!isConnected){
    return ("Connect Your MetaMask");
  }else{
    return (
      <div>
        <Header />
        <h1>{election.name}</h1>
        <h3>{election.address}</h3>
        {/* leadingcandidate & deadline  */}
        <h2>{leadingCandidate}</h2>
        {/* <h2></h2> */}
        <button onClick={runForElection}>Run for Election</button>
      </div>
    );
  }
}

export default Election;
