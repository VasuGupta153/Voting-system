import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Component/Styles/Home.css';
import abi from "../abis/Data.json";
import { Box, Button, Container, Flex, SimpleGrid, Menu, IconButton, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; 
import { HamburgerIcon } from '@chakra-ui/icons';
import { ethers } from "ethers"; 

function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const navigate = useNavigate(); 
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
        const output = (await signer).address;
        const check = await contract.userExist(output);
        if (check) {
          navigate("/user");
        } else {
          navigate("/newuser");
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    } else {
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
    window.ethereum.on("accountsChanged", (accounts) => {
      checkConnection();
    });
  }, [setIsConnected, setAccount]);

  return (
    <Box>
      <Box className="Header" boxShadow="0 0 10px rgba(0, 0, 0, 0.5)" bg = "#427D9D">
        <Container maxW={1400} maxH={160}>
          <SimpleGrid columns={{ lg: 3, base: 1 }} alignItems="center">
            <Box fontSize={70} fontWeight='bold' color='#DDF2FD' p={6}>
              <Link to='/' >𝚅𝙾𝚃𝙴</Link>
            </Box>
            <Flex justifyContent="flex-end"  color='#9BBEC8' fontSize={25} fontWeight='semibold' gap={10} pr={40}>
              <Link to='/'>𝖧𝗈𝗆𝖾</Link>
              <Link to='/about'>𝖠𝖻𝗈𝗎𝗍</Link>
              <Link to='/contact'>𝖢𝗈𝗇𝗍𝖺𝖼𝗍</Link>
            </Flex>
            
            <Flex justifyContent="flex-end"   gap={18}>
              
              <Box>
                <Button size='lg' colorScheme='green' onClick={handleUserLinkClick}>
                  𝖤𝗅𝖾𝖼𝗍𝗂𝗈𝗇𝗌
                </Button>
              </Box>
              {isConnected ? (
                <Box>
                  <Button bg="#fff" size="lg" variant="outline">
                    𝖢𝗈𝗇𝗇𝖾𝖼𝗍𝖾𝖽: {`${account.substring(0, 3)}...${account.slice(-3)}`}
                  </Button>
                </Box>
              ) : (
                <Button onClick={connectWallet} bg="#fff" _hover={{ bg: 'teal.700' }} size="lg">
                  𝖢𝗈𝗇𝗇𝖾𝖼𝗍 𝖶𝖺𝗅𝗅𝖾𝗍
                </Button>
              )}
              <Box>
                <Link to="/profile">
                  <Button aria-label="User Icon" variant="outline" size="lg" leftIcon={<FaUser />}>
                    Profile
                  </Button>
                </Link>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
      <Box pt='20px' display={{ lg: 'none', base: 'initial' }}>
            <Menu>
              <MenuButton float='right' as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
              <MenuList>
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                <MenuItem onClick={() => navigate("/contact")}>Contact Us</MenuItem>
              </MenuList>
            </Menu>
          </Box>
    </Box>
  );
}

export default Header;