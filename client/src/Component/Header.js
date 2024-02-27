import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Component/Styles/Home.css';
import abi from "../abis/Data.json";
import logo from "./Styles/logo.png"
import { Box, Button, Container, Flex, SimpleGrid, Menu, IconButton, MenuButton, MenuList, MenuItem,Text } from '@chakra-ui/react'
import Image from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
const { ethers} = require("ethers"); // Ensure correct import for your Ethers.js version


function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        alert("MetaMask extension not detected. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };
  

  const handleUserLinkClick = async () => {
    if (isConnected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
      try {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          provider
        );
        // console.log(contract);
        const output = (await signer).address;
        const check = await contract.userExist(output);
        // await console.log(check);
        if (check) {
          navigate("/user");
        } else {
          navigate("/newuser");
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    } else {
      // Handle the case where the user is not connected
      alert("Please connect your wallet before navigating to the user page.");
    }
  };
  

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            const address = accounts[0];
            setIsConnected(true);
            setAccount(address);
          } else {
            setIsConnected(false);
            setAccount("");
          }
        } else {
          setIsConnected(false);
          setAccount("");
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
        setIsConnected(false);
        setAccount("");
      }
    };
  
    checkConnection();
    // Add an event listener to detect MetaMask connection changes
    window.ethereum.on("accountsChanged", (accounts) => {
      checkConnection();
    });
  }, [setIsConnected, setAccount]); // Include dependencies for re-running
  

  return (

      <Box className="Header" boxShadow='lg' bg = "#90b7d1">
      <Container maxW={1400}>
          <SimpleGrid templateColumns={{ lg: 'repeat(3, 1fr)', base: 'repeat(2, 1fr)' }}>
              <Box>
                  <img src={logo} className="logo" alt="alternate" />
              </Box>
              <Flex display={{ lg: 'flex', base: 'none' }} placeItems='center' color='black' fontSize={25} fontWeight='semibold' gap={10}>
                  <Link to='/'>Home</Link>
                  <Link to='/about'>About</Link>
                  <Link to='/contact'>Contact</Link>

              </Flex>
              <Box display={{ lg: 'initial', base: 'none' }}>
                  <Button mt='5vh' size='lg' colorScheme='green' float='right' onClick={handleUserLinkClick}>User</Button>
                  {isConnected ? (
                    <Box p="5vh">
                      <Button bg="#fff" size='lg'  >
                        Connected: {`${account.substring(0, 3)}...${account.slice(-3)}`}
                      </Button>
                    </Box>
                  ) : (
                    <Box p="5vh">
                      <Button onClick={connectWallet}  bg="#fff" _hover={{ bg: 'teal.700' }}>
                        Connect Wallet
                      </Button>
                    </Box>
                  )}
              </Box>
              
              
              <Box pt='20px' display={{ lg: 'none', base: 'initial' }}>
                  <Menu  >
                      <MenuButton float='right'
                          as={IconButton}
                          aria-label='Options'
                          icon={<HamburgerIcon />}
                          variant='outline'
                      />
                      <MenuList>
                        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                        <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                        <MenuItem onClick={() => navigate("/contact")}>Contact Us</MenuItem>
                      </MenuList>

                  </Menu>
              </Box>
          </SimpleGrid>
      </Container>
  </Box>

    
  );
}

export default Header;