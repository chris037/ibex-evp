import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate("/"); // Redirect to the Home page
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}
