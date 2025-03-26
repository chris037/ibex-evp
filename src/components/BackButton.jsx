import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not show back button on the Home page
  if (location.pathname === "/") return null;

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} className="back-icon" /> Back
    </button>
  );
}
