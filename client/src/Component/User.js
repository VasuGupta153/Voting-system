import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import { ethers } from "ethers";
import abi from "../abis/Data.json";
import { Link ,useNavigate} from 'react-router-dom';
import Election from "./Election";
import "./Styles/User.css";
import electionAbi from "../abis/Election.json"

function User() {
  const [contractData, setContractData] = useState([]);
  const Navigate = useNavigate();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    async function fetchData() {
      try {
        // Use BrowserProvider instead of Web3Provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.getElections();
        setContractData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

 const dataShow = contractData.map((temp, index) => (
  <div key={index}>
      <button onClick={async () =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const Datacontract = new ethers.Contract(contractAddress, abi, provider);
        
        const ElectionProvider = new ethers.Contract(temp.contractAddress,electionAbi,provider);    
        const ElectionSigner = new ethers.Contract(temp.contractAddress,electionAbi,signer);
        const isFinished = ElectionSigner.isFinishedFunction();
        
        const ageThreshold = await ElectionProvider.ageCheck();
        const professionShould = await ElectionProvider.profCheck();
        const age = await Datacontract.usersMap(signer.address).age;
        const profession = await Datacontract.usersMap(signer.address).profession;
        

        if(age >= ageThreshold && profession !== professionShould){
          ElectionSigner.authorizeUser(signer.address);
        }
        Navigate('/election',{
        state: {
          electionName: temp.name,
          electionAddress: temp.contractAddress,
          electionId: temp.id,
        }}
        )
      }}>Name of Election: {temp.name}, Address: {temp.contractAddress}</button>

  </div>
));

  const goToCreateElection = () =>{
    Navigate("/createElections");
  }

  return (
    <div className="container-style">
      <Header />
      <div className="middle-container">
        <div id="showData">{dataShow}</div>
        <button onClick={goToCreateElection}>
          Create Election
        </button>
      </div>
    </div>
  );
}

export default User;