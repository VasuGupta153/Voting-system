import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import '../Component/Styles/Home.css';
function Header() {

    const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
      } else {
        alert("MetaMask extension not detected. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            setAccount(address);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <>
        <header className="header">
            <div className="header-name"></div>
            <ul className="header-links">
            <li>
                <Link to="/"> Home </Link>
            </li>
            <li>
                <Link to="/about"> About </Link>
            </li>
            <li>
                <Link to="/contact"> Contact Us </Link>
            </li>
            </ul>
            <div className="wallet-section">
            {isConnected ? (
                <div className="wallet-box">
                <p className="wallet-address">
                    Connected: {`${account.substring(0, 3)}...${account.slice(-3)}`}
                </p>
                </div>
            ) : (
                <button className="wallet-box" onClick={connectWallet}>
                Connect Wallet
                </button>
            )}
            </div>
        </header>
    </>
  );
}

export default Header;