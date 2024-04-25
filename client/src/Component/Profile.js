import React, { useState, useEffect } from 'react';
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import '../Component/Styles/Profile.css'; // Import your CSS file for styling

import abi from "../abis/Data.json";
import { ethers } from 'ethers'; // Import ethers library


const Profile = () => {

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Profile;
