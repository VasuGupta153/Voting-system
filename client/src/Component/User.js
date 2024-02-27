import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import { ethers } from "ethers";
import abi from "../abis/Data.json";
import { Link ,useNavigate} from 'react-router-dom';
import "./Styles/User.css";
import { Container,Text,Button } from "@chakra-ui/react";

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

 const dataShow = contractData.slice(0,-1).map((temp, index) => (
  <div key={index}>
      <button id="candidates" style={{ justifyContent: 'space-between', alignItems: 'center' }} onClick={async () =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const Datacontract = new ethers.Contract(contractAddress, abi, provider);
        const age = (await Datacontract.usersMap(signer.address)).age;
        const profession = (await Datacontract.usersMap(signer.address)).profession;
        Navigate('/election',{
        state: {
          electionName: temp.name,
          electionAddress: temp.contractAddress,
          electionId: temp.id,
          userAge: age,
          userProf: profession
        }}
        )
      }}>Name of Election: <span className="names">{temp.name}</span> Address: <span className="names">{temp.contractAddress}</span></button>

  </div>
));

  const goToCreateElection = () =>{
    Navigate("/createElections");
  }

  return (
    <div>
      <Header />
        <Container>
          <Container pl="17vh" my="3vh">
            <Button height='6vh' fontWeight="bold" fontSize='large' onClick={goToCreateElection}>
              Create Election
            </Button>
          </Container>
          <Text fontWeight='bold' py='4vh' px='10vh'fontSize='xx-large'>Listed Elections:</Text>
        </Container>
          <div id="showData">{dataShow}</div>
    </div>
  );
}

export default User;