import React from "react";
import "./Footer.css";
import logoHc from "../Assets/logoHC.png";
import x from "../Assets/X.png";
import insta from "../Assets/insta.png";
import youtube from "../Assets/youtube.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="social-icon">
        <img src={logoHc} alt="logo" className="footer-logo" />
        <div className="icon">
          <img src={x} alt="" className="x" />
          <img src={insta} alt="" className="insta" />
          <img src={youtube} alt="" className="youtube" />
        </div>
      </div>
      <div className="links">
        <h3>QUICK LINKS</h3>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/appointment">Appointment</Link>
          </li>
          <li>
            <Link to="/aboutUs">About us</Link>
          </li>
        </ul>
      </div>
      <div className="contact">
        <h3>CONTACT US</h3>
        <ul>
          <li>+91 1111111111</li>
          <li>hospital@email.com</li>
          <li>Delhi 110001</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
