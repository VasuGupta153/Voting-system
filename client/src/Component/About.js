import React from "react";
import Header from "../Component/Header";
import Footer from "./Footer"
import { useNavigate} from 'react-router-dom';
import { Container, Heading, Text, Button,ListItem,List } from "@chakra-ui/react";

function About() {
  const Navigate = useNavigate();
  const travel = ()=>{
    Navigate("/");
  }
  return (
    <>
      <Header />
      <Container mt={12} maxW="container.md" textAlign="center">
        <Heading mb={6} fontSize="4xl" fontFamily="MathSans, sans-serif" fontWeight="bold" color='#164863'>
          About this Project
        </Heading>
        <Text fontSize="xl" mb={8} fontFamily="MathSans, sans-serif" color='#164863'>
          Welcome to THE VOTING SYSTEM, a cutting-edge voting system that leverages React for a user-friendly interface and blockchain smart contracts for unparalleled transparency and security in elections.
        </Text>
        <Text fontSize="xl" mb={8} fontFamily="MathSans, sans-serif" color='#164863'>
          Our mission is to revolutionize the democratic process by addressing the challenges of traditional election systems. We prioritize transparency, security, and accessibility to ensure a fair and trustworthy voting experience for all.
        </Text>
        <Text fontSize="xl" mb={8} fontFamily="MathSans, sans-serif" fontWeight='bold' color='#164863'>
          Key Features:
        </Text>
      </Container>
        <List pl="33vw">
          <ListItem listStyleType="disc">
            <Text fontSize="xl" fontFamily="MathSans, sans-serif" color='#164863'>
              <strong>Unprecedented Transparency:</strong>   A transparent and immutable voting environment
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc" color='#164863'>
            <Text fontSize="xl" fontFamily="MathSans, sans-serif">
              <strong>Security Beyond Compromise:</strong>  Enhanced security using the blockchain technology
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc" color='#164863'>
            <Text fontSize="xl" fontFamily="MathSans, sans-serif">
              <strong>User-Friendly Interface:</strong>  Easy to use and implement
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc" color='#164863'>
            <Text fontSize="xl" fontFamily="MathSans, sans-serif">
              <strong>Inclusivity and Accessibility:</strong>  Can easily cater diverse needs requirements 
            </Text>
          </ListItem>
        </List>
        <Container>
          <Button ml="8vw" colorScheme="teal" mt={10} size="lg" fontFamily="MathSans, sans-serif" onClick={travel} color='#164863'>
            Get Started
          </Button>
        </Container>
        <br />
        <br />
        <Footer/>
    </>
  );
}

export default About;
