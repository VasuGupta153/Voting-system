import React, { useState } from 'react';
import "./Styles/UserForm.css"
import abi from '../abis/Data.json';
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Container,
  Button
} from '@chakra-ui/react'

const { ethers} = require("ethers"); // Ensure correct import for your Ethers.js version

const UserForm = () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
    idProof: '',
    profession: '',
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
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
      const tx = await contract.addUser((await signer).address, user);
      await tx.wait();
    }catch(error){
      console.log(error);
    }
    setUser({ name: '', email: '',age : 0, idProof: '', profession: '' });
    navigate("/user");
  };
  

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>New User Registration</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="int"
          name="age"
          id="age"
          value={user.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="idProof">ID Proof:</label>
        <input
          type="text"
          name="idProof"
          id="idProof"
          value={user.idProof}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="profession">Profession:</label>
        <input
          type="text"
          name="profession"
          id="profession"
          value={user.profession}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" style={{ fontSize: '17px'}}>𝗖𝗿𝗲𝗮𝘁𝗲 𝗔𝗰𝗰𝗼𝘂𝗻𝘁</button>
      

    </form>

      // <FormControl className='user-form'>
      //   <h2>Register User</h2>
      //   <FormLabel>
      //     <label htmlFor="name">Name:</label>
      //       <input
      //         type="text"
      //         name="name"
      //         id="name"
      //         value={user.name}
      //         onChange={handleChange}
      //         required
      //       />
      //   </FormLabel>
      //   <br />
      //   <FormLabel>
      //     <label htmlFor="email">Email:</label>
      //     <input
      //       type="email"
      //       name="email"
      //       id="email"
      //       value={user.email}
      //       onChange={handleChange}
      //       required
      //     />
      //     <FormHelperText>We'll never share your email.</FormHelperText>
      //   </FormLabel>
      //   <br />

      //   <FormLabel>
      //     <label htmlFor="age">Age:</label>
      //     <input
      //       type="int"
      //       name="age"
      //       id="age"
      //       value={user.age}
      //       onChange={handleChange}
      //       required
      //     />
      //   </FormLabel>
      //   <br />
      //   <FormLabel>
      //     <label htmlFor="idProof">ID Proof:</label>
      //     <input
      //       type="text"
      //       name="idProof"
      //       id="idProof"
      //       value={user.idProof}
      //       onChange={handleChange}
      //       required
      //     />
      //   </FormLabel>
      //   <br />
      //   <FormLabel>
      //     <label htmlFor="profession">Profession:</label>
      //     <input
      //       type="text"
      //       name="profession"
      //       id="profession"
      //       value={user.profession}
      //       onChange={handleChange}
      //       required
      //     />
      //   </FormLabel>
      //   <br />
      //   <Container className='submitting'>
      //     <button type="submit">Create Account</button>
      //   </Container>
      // </FormControl>
    
  );
};

export default UserForm;
