import React, { useState, useEffect } from "react";
import img1 from "./Styles/a1.jpg";
import img2 from "./Styles/a2.jpg";
import img3 from "./Styles/a3.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Component/Styles/Home.css";
import Header from "../Component/Header";

function Home() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const sliderImages = [
    img1,img2,img3
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
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <div key={index}>
            <img src={image} style={imageStyles} alt={`Slider Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
        

      
      <div className="home-content">
        <h1 className="texting">Welcome to The Decentralised Voting System</h1>
        <p style={{fontSize:"large"}}>{greeting}, explore our innovative voting system and revolutionize the way elections are conducted.</p>
      </div>
      
    </>
  );
}

export default Home;
