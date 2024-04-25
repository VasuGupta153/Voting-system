import React from "react";
import { Flex, Heading, Text, Box, Image, HStack, Link, Icon } from "@chakra-ui/react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function Contact() {
  // Data for the creators
  const creators = [
    {
      name: "𝖵𝖺𝗌𝗎 𝖦𝗎𝗉𝗍𝖺",
      brief: "Full Stack Web-3 developer",
      image: "https://media.licdn.com/dms/image/D5603AQENcTEiGYRF1Q/profile-displayphoto-shrink_800_800/0/1707938849374?e=1719446400&v=beta&t=G82SCUIfJ0CpEHADt9xushnRAaZ3iKOJGgogrexWBv8", // Replace with actual image path
      socialLinks: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://www.linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
      }
    },
    {
      name: "𝖲𝗁𝗂𝗏𝖺𝗆𝗄𝗎𝗆𝖺𝗋 𝖱𝖾𝗐𝖺𝗍𝗄𝖺𝗋",
      brief: "Full Stack Web-3 Developer",
      image: "https://i.postimg.cc/DfYV16zS/Whats-App-Image-2024-04-24-at-21-07-09-d99de471-removebg-preview.png", // Replace with actual image path
      socialLinks: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://www.linkedin.com/in/janesmith",
        github: "https://github.com/janesmith"
      }
    }
  ];

  return (
    <>
      <Header />
      <Flex direction="column" align="center" mt={8}>
        <Heading mb={6}>𝖬𝖾𝖾𝗍 𝗍𝗁𝖾 𝖢𝗋𝖾𝖺𝗍𝖾𝗋𝗌</Heading>
        <br/>
        <br />
        <Flex justify="space-between" w="80%" mb={8}>
          {creators.map((creator, index) => (
            <Flex key={index} bg="white" rounded="md" boxShadow="md" w="45%">
              <Image src={creator.image} alt={creator.name} mr={4} width={317} height={350} border-radius="10%" p={4} />
              <Box p={4} color='#164863'>
                <Heading mb={2}>{creator.name}</Heading>
                <Text mb={4}>{creator.brief}</Text>
                <HStack spacing={4}>
                  <Link href={creator.socialLinks.twitter} isExternal>
                    <Icon boxSize={6} as={FaTwitter} />
                  </Link>
                  <Link href={creator.socialLinks.linkedin} isExternal>
                    <Icon boxSize={6} as={FaLinkedin} />
                  </Link>
                  <Link href={creator.socialLinks.github} isExternal>
                    <Icon boxSize={6} as={FaGithub} />
                  </Link>
                </HStack>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Flex>
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}

export default Contact;
