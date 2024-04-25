import React, { useState, useEffect } from "react";
import img1 from "./Styles/a1.jpg";
import img2 from "./Styles/a2.jpg";
import img3 from "./Styles/a3.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Component/Styles/Home.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Container } from '@chakra-ui/react';

function Home() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("𝖦𝗈𝗈𝖽 𝖬𝗈𝗋𝗇𝗂𝗇𝗀");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("𝖦𝗈𝗈𝖽 𝖠𝖿𝗍𝖾𝗋𝗇𝗈𝗈𝗇");
    } else {
      setGreeting("𝖦𝗈𝗈𝖽 𝖤𝗏𝖾𝗇𝗂𝗇𝗀");
    }
  }, []);

  const sliderImages = [
    img2,img3
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
  };
  const imageStyles = {
    height:"75vh",
    width:"90vw",
    marginLeft:"5vw"
  }
  return (
    <>
      <Header />
      <br />
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <div key={index}>
            <img src={image} style={imageStyles} alt={`Slider Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
        <br />
        <br />
       

      <div className="home-content" maxW="100%">
        <h1 className="texting">𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐃𝐞𝐜𝐞𝐧𝐭𝐫𝐚𝐥𝐢𝐬𝐞𝐝 𝐕𝐨𝐭𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦</h1>
        <p style={{fontSize:"x-large", color: "#427D9D"}}>{greeting}, 𝖾𝗑𝗉𝗅𝗈𝗋𝖾 𝗈𝗎𝗋 𝗂𝗇𝗇𝗈𝗏𝖺𝗍𝗂𝗏𝖾 𝗏𝗈𝗍𝗂𝗇𝗀 𝗌𝗒𝗌𝗍𝖾𝗆 𝖺𝗇𝖽 𝗋𝖾𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇𝗂𝗓𝖾 𝗍𝗁𝖾 𝗐𝖺𝗒 𝖾𝗅𝖾𝖼𝗍𝗂𝗈𝗇𝗌 𝖺𝗋𝖾 𝖼𝗈𝗇𝖽𝗎𝖼𝗍𝖾𝖽.  <br />
        𝖶𝖾 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖽𝖾𝖼𝖾𝗇𝗍𝗋𝖺𝗅𝗂𝗌𝖾𝖽 𝖻𝗅𝗈𝖼𝗄𝖼𝗁𝖺𝗂𝗇 𝗍𝖾𝖼𝗁𝗇𝗈𝗅𝗈𝗀𝗒 𝗍𝗈 𝖾𝗇𝗁𝖺𝗇𝖼𝖾 𝗍𝗁𝖾 𝖾𝖿𝖿𝗂𝖼𝗂𝖾𝗇𝖼𝗒, 𝗌𝖾𝖼𝗎𝗋𝗂𝗍𝗒 𝖺𝗇𝖽 𝗌𝖼𝖺𝗅𝖺𝖻𝗂𝗅𝗂𝗍𝗒 𝗈𝖿 𝗍𝗁𝖾 𝖾𝗅𝖾𝖼𝗍𝗂𝗈𝗇 𝖾𝖼𝗈𝗌𝗒𝗌𝗍𝖾𝗆. <br />
        𝖸𝗈𝗎𝗋 𝗏𝖺𝗅𝗎𝖺𝖻𝗅𝖾 𝖿𝖾𝖾𝖽𝖻𝖺𝖼𝗄 𝗂𝗌 𝗆𝗎𝖼𝗁 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾𝖽.</p>
      </div>
        
        <br />
        <br />
        <Footer/>
      
      
    </>
  );
}

export default Home;
