import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Election from "../Component/Election";
import { ethers } from "ethers";
import "../Component/Styles/User.css"
import { useHref } from "react-router";

// const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your smart contract address
// const contractABI = [/* Your smart contract ABI */]; // Replace with your smart contract ABI


function User() {
  const [ongoingElections, setOngoingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractAddress, contractABI, signer);

  //       // Fetch ongoing elections
  //       const ongoingElectionsCount = await contract.getOngoingElectionsCount();
  //       const ongoingElectionsData = await Promise.all(
  //         Array.from({ length: ongoingElectionsCount.toNumber() }, (_, index) =>
  //           contract.getOngoingElection(index)
  //         )
  //       );

  //       // Fetch past elections
  //       const pastElectionsCount = await contract.getPastElectionsCount();
  //       const pastElectionsData = await Promise.all(
  //         Array.from({ length: pastElectionsCount.toNumber() }, (_, index) =>
  //           contract.getPastElection(index)
  //         )
  //       );

  //       setOngoingElections(ongoingElectionsData);
  //       setPastElections(pastElectionsData);
  //     } catch (error) {
  //       console.error("Error fetching data from smart contract:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="container-style">
      <Header />
      <h1>Welcome User</h1>
      <button className="button-style" >
        Create New Election
      </button>

      <div className="section-container-style">
        <div className="section-style">
          <h2>Ongoing Elections</h2>
          {ongoingElections.map((election, index) => (
            <Election key={index} title={election.title} status={election.status} />
          ))}
        </div>

        <div className="section-style">
          <h2>Past Elections</h2>
          {pastElections.map((election, index) => (
            <Election key={index} title={election.title} status={election.status} results={election.results} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
