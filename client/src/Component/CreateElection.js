import React, { useState } from 'react';
import abi from '../abis/Data.json';
import "./Styles/UserForm.css"
import { Link, useNavigate } from "react-router-dom";

const { ethers} = require("ethers"); // Ensure correct import for your Ethers.js version

const CreateElection = () => {
  const [contractDetails, setContractDetails] = useState({
    id: 0,
    name: '',
    address: 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0,
    purpose: '',
    ageCheck: 0,
    profCheck: '',
    timeDuration:0
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (event) => {
    setContractDetails({ ...contractDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
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
        address: '',
        purpose: '',
        ageCheck: 0,
        profCheck: '',
        timeDuration:0 });
    navigate("/user");
  };
  

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>New Election Registration</h2>

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

      <div className="form-group">
        <label htmlFor="purpose">Purpose of election:</label>
        <input
          type="text"
          name="purpose"
          id="purose"
          value={contractDetails.purpose}
          onChange={handleChange}
          required
        />
      </div>

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

      <div className="form-group">
        <label htmlFor="profCheck">IProfession Check:</label>
        <input
          type="text"
          name="profCheck"
          id="profCheck"
          value={contractDetails.profCheck}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="timeDuration">Time Duration of election:</label>
        <input
          type="int"
          name="ageCheck"
          id="ageCheck"
          value={contractDetails.ageCheck}
          onChange={handleChange}
          required
        />
      </div>

      

      <button type="submit">Add Election</button>
    </form>
  );
};

export default CreateElection;