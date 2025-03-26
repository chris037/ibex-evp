import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/GlobalStyles.css";

export default function Home() {
  const navigate = useNavigate();

  // ✅ Check session on component mount and redirect if session exists
  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
      navigate("/tasks");
    }
  }, [navigate]);

  return (
    <Container>
      <img src="/evp/images/ibex-logo.png" alt="Ibex Logo" className="logo" />
      <h1 className="heading">
        <img src="/evp/images/Header-Home.png" alt="Header Home" />
      </h1>
      <p className="description">
        At ibex, your goals are opportunities waiting to be realized. Discover our Employee Value Proposition (EVP) and see how we support your growth and well-being.
      </p>
      <p className="description">
        Take on challenges, gain insights, and complete tasks for a chance to unlock exclusive rewards. Your journey to a brighter future starts now—let’s make it happen!
      </p>
      <Link to="/register">
        <button className="register-button">Click here to register</button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/bg.jpg') no-repeat center center/cover;
  padding: 20px;
  text-align: center;
`;
