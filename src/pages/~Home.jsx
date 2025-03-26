import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/GlobalStyles.css";


export default function Home() {
    return (
      <div className="container">
        <img src="/evp/images/ibex-logo.png" alt="Ibex Logo" className="logo" />
        <h1 className="heading"> <img src="/evp/images/Header-Home.png" alt="Header Home" /></h1>
        <p className="description">
          At ibex, your goals are opportunities waiting to be realized. Discover our Employee Value Proposition (EVP) and see how we support your growth and well-being.
        </p>
        <p className="description">
          Take on challenges, gain insights, and complete tasks for a chance to unlock exclusive rewards. Your journey to a brighter future starts now—let’s make it happen!
        </p>
        <Link to="/register">
        <button className="register-button">Click here to register</button>
        </Link>
      </div>
    );
  }