import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear specific session storage data
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("completedTasks");

    // ✅ Clear specific local storage data
    localStorage.removeItem("referrals");
    localStorage.removeItem("dreamwallEntries");

    // ✅ Optionally, clear all storage
    // localStorage.clear();
    // sessionStorage.clear();

    // ✅ Redirect to home or login page
    navigate("/");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}