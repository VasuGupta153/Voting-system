import React from 'react';

import '../Component/Styles/Footer.css'; // Import your CSS file for styling
const Footer = () => {
    return (
      <footer className="footer" style={{ backgroundColor: '#164863', color: '#9BBEC8' }}>
        <div className="footer-content">
          <div className="social-links">
            <a href="link_to_facebook" className="social-link"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="link_to_twitter" className="social-link"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="link_to_instagram" className="social-link"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="link_to_linkedin" className="social-link"><i className="fab fa-linkedin fa-lg"></i></a>
          </div>
        </div>
        <p className="footer-text" style={{ fontSize: '23px' }}>𝖢𝗈𝗇𝗇𝖾𝖼𝗍 𝗐𝗂𝗍𝗁 𝗎𝗌 𝗈𝗇 𝗏𝖺𝗋𝗂𝗈𝗎𝗌 𝗉𝗅𝖺𝗍𝖿𝗈𝗋𝗆𝗌 𝖺𝗌 𝗅𝗂𝗌𝗍𝖾𝖽 𝖺𝖻𝗈𝗏𝖾</p>
        <p className="copyright" style={{ fontSize: '19px' }}>Thankyou!</p>
      </footer>
    );
  };
  

export default Footer;
