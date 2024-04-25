import React, { useState } from 'react';
import abi from '../abis/Data.json';
import "./Styles/UserForm.css"
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import { Container, textDecoration } from '@chakra-ui/react';

const { ethers} = require("ethers"); // Ensure correct import for your Ethers.js version

const CreateElection = () => {
  const [contractDetails, setContractDetails] = useState({
    id: 0,
    name: '',
    contractAddress: "0x0000000000000000000000000000000000000000",
    purpose: '',
    ageCheck: 0,
    profCheck: '',
    timeDuration:0
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const handleChange = (event) => {
    setContractDetails({ ...contractDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    try{
      const tx = await contract.addElection(contractDetails);
      await tx.wait();
    }catch(error){
      console.log(error);
    }
    
    setContractDetails({
        id: 0,
        name: '',
        address: "0x0000000000000000000000000000000000000000",
        purpose: '',
        ageCheck: 0,
        profCheck: '',
        timeDuration:0 });
    navigate("/user");
  };
  

  return (
    <div>

    <Header />
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 >New Election Registration</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={contractDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="purpose">Purpose of election:</label>
          <input
            type="text"
            name="purpose"
            id="purpose"
            value={contractDetails.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="ageCheck">Age Check:</label>
          <input
            type="int"
            name="ageCheck"
            id="ageCheck"
            value={contractDetails.ageCheck}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="profCheck">Profession Check:</label>
          <input
            type="text"
            name="profCheck"
            id="profCheck"
            value={contractDetails.profCheck}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="timeDuration">Time Duration of election:</label>
          <input
            type="int"
            name="timeDuration"
            id="timeDuration"
            value={contractDetails.timeDuration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Election</button>
      </form> 
      <br />
      <br />
      <Footer/>
    </div>
  
  );

};

export default CreateElection;