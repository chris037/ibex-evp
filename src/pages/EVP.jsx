import { useNavigate } from "react-router-dom";
import "../styles/EVP.css";

export default function EVP() {
  const navigate = useNavigate();

  return (
    <div className="evp-container">
       <img src="/evp/images/ibex-logo.png" alt="Ibex Logo" className="logo" />
       <h1 className="heading"> <img src="/evp/images/Header-Register.png" alt="Header Home" /></h1>
       <p class="pb32">You've discovered the IBEX EVP Launch Challenge—but this is just the beginning! Ready to unlock the secrets to an empowered, unstoppable you?</p>
      <button className="evp-button" onClick={() => navigate("/read-evp")}>Unleash the Challenge!</button>
    </div>
  );
}
