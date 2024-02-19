import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import { ethers } from "ethers";
import abi from "../abis/Data.json";
import { Link } from 'react-router-dom';
import Election from "./Election";

function User() {
  const [contractData, setContractData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use BrowserProvider instead of Web3Provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
    <div>
        <Link to={`/election/${temp.name}/${temp.address}/${temp.id}`}>
          Name of Election: {temp.name}, Address: {temp.contractAddress}          
        </Link>
    </div>
  ));

  return (
    <div className="container-style">
      <Header />
      <div id="showData">{dataShow}</div>
    </div>
  );
}

export default User;