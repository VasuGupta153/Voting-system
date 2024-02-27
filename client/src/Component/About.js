import React from "react";
import Header from "../Component/Header";
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
        <Heading mb={6} fontSize="4xl" fontFamily="Montserrat, sans-serif" fontWeight="bold">
          About this Project
        </Heading>
        <Text fontSize="xl" mb={8} fontFamily="Lato, sans-serif">
          Welcome to THE VOTING SYSTEM, a cutting-edge voting system that leverages React for a user-friendly interface and blockchain smart contracts for unparalleled transparency and security in elections.
        </Text>
        <Text fontSize="xl" mb={8} fontFamily="Lato, sans-serif">
          Our mission is to revolutionize the democratic process by addressing the challenges of traditional election systems. We prioritize transparency, security, and accessibility to ensure a fair and trustworthy voting experience for all.
        </Text>
        <Text fontSize="xl" mb={8} fontFamily="Lato, sans-serif">
          Key Features:
        </Text>
      </Container>
        <List pl="33vw">
          <ListItem listStyleType="disc">
            <Text fontSize="xl" fontFamily="Lato, sans-serif">
              <strong>Unprecedented Transparency:</strong>   A transparent and immutable voting environment
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc">
            <Text fontSize="xl" fontFamily="Lato, sans-serif">
              <strong>Security Beyond Compromise:</strong>  Enhanced security using the blockchain technology
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc">
            <Text fontSize="xl" fontFamily="Lato, sans-serif">
              <strong>User-Friendly Interface:</strong>  Easy to use and implement
            </Text>
          </ListItem>
          <br />
          <ListItem listStyleType="disc">
            <Text fontSize="xl" fontFamily="Lato, sans-serif">
              <strong>Inclusivity and Accessibility:</strong>  Can easily cater diverse needs requirements 
            </Text>
          </ListItem>
        </List>
        <Container>
          <Button ml="8vw" colorScheme="teal" mt={10} size="lg" fontFamily="Montserrat, sans-serif" onClick={travel}>
            Get Started
          </Button>
        </Container>
    </>
  );
}

export default About;
