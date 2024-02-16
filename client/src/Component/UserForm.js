import React, { useState } from 'react';
import "./Styles/UserForm.css"
import abi from '../abis/Data.json';
import { Link, useNavigate } from "react-router-dom";

const { ethers} = require("ethers"); // Ensure correct import for your Ethers.js version

const UserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    idProof: '',
    profession: '',
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
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
    // await wait(signedTx);
    // const signedTx = await (await signer).sendTransaction(tx);
    // const result = await signedTx.send();
    // console.log('Transaction hash:', result.hash);
    setUser({ name: '', email: '', idProof: '', profession: '' });
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

      <button type="submit">Create Account</button>
    </form>
  );
};

export default UserForm;
