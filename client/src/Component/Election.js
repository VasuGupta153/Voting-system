import {React,useEffect,useState} from "react";
import abi from "../abis/Election.json";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import "./Styles/Election.css"
import { Container,Text, background,Button } from "@chakra-ui/react";
import Footer from "./Footer";
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
  const [isFinished,setIsFinished] = useState(false);
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
        const deadLine = await providerContract.deadLine();
        const currTime = await providerContract.getTime();
        console.log(currTime);
        if(currTime >= deadLine){
          setIsFinished((isFinished) => !isFinished);
        }
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
      console.log(isFinished);
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
      const canAuth = await providerContract.canAuthorize(location.state.userAge,location.state.userProf);
      if(canAuth){
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
        const checking = await providerContract.canVote();
        if(checking){
          const tx = await signerContract.runForElection(signer.address);
          tx.wait();
          alert('Congrats! You are now a candidate~');
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
      <div id="candidates" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'MathSans, sans-serif' }}>
  Candidate {index + 1}: {temp.name}
  <Button mr='5vw' bg='#cac2c2' onClick={() => vote(temp.add)}>Vote</Button>
</div>

      {/* <button onClick={vote(temp.add)}>vote</button> */}
    </div>  
  ));
  

  if(!isConnected){
    return ("Connect Your MetaMask");
  }else{
    if(isFinished){
      return (
        <div>
          <Header />
          <Text fontSize="x-large" fontWeight='bold' p='3vh'>
            <span className="name">Name of Election: <span className="props">{election.name}</span> Address: <props className="props">{election.address}</props></span>
          </Text>
          <Text fontSize="x-large" fontWeight='bold' pl='5.2vh'>Winning Candidate: {leadingCandidate}</Text>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
         
          
          <Footer/>
        </div>
      );
    }else{
      return (
        <div>
          <Header />
          
            <Text fontSize="x-large" fontWeight='bold' p='3vh'>
            <span className="name">Name of Election: <span className="props">{election.name}</span> Address: <props className="props">{election.address}</props></span>
            </Text>
            <Text fontSize="x-large" fontWeight='bold' pl='3vh'></Text>
          
          
          <Text fontSize="x-large" fontWeight='bold' pl='5.2vh'>Leading Candidate: {leadingCandidate}</Text> 
          <br />
          <hr />
          <br />
            <Button p='3vh' mr='2vh' ml='5vh' onClick={authorizeYourSelf} bg='#ddd' fontSize={20} _hover={{ bg: '#ccc' }}>𝖠𝗎𝗍𝗁𝗈𝗋𝗂𝗌𝖾</Button>
            <Button p='3vh' m='1vh' onClick={runForElection} bg='#ddd' fontSize={20} _hover={{ bg: '#ccc' }}>𝖱𝗎𝗇 𝖿𝗈𝗋 𝖤𝗅𝖾𝖼𝗍𝗂𝗈𝗇</Button>

          <br />
          <br />
          <span className="showData"><span className="top-list">𝖢𝖺𝗇𝖽𝗂𝖽𝖺𝗍𝖾𝗌:</span>   <br /> {dataShow}</span>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer/>
        </div>
      );
    }
  }
}

export default Election;
