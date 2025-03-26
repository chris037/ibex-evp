import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Logout from "../components/Logout"; // ✅ Import the Logout component
import "../styles/Tasks.css";
import axios from "axios";

export default function Tasks() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // ✅ Fetch session data on load
  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    const storedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];

    if (storedName) {
      setUserName(storedName);
      setCompletedTasks(storedTasks);
    } else {
      // Redirect to Home if no session
      navigate("/");
    }
  }, [navigate]);

  // ✅ Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    axios.get(`http://localhost:5001/api/tasks/${userId}`)
      .then(res => {
        setCompletedTasks(res.data); // or update your local state
      });
  }, []);

  // ✅ Mark task as completed
  // const markTaskAsCompleted = (taskName) => {
  //   const updatedTasks = [...new Set([...completedTasks, taskName])];
  //   setCompletedTasks(updatedTasks);
  //   sessionStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
  // };

  const markTaskAsCompleted = async (taskName) => {
    const userId = sessionStorage.getItem("userId");
    try {
      await axios.post("http://localhost:5001/api/tasks/complete", {
        userId,
        taskName
      });
      // Update local state if needed
    } catch (error) {
      console.error("Task update failed", error);
    }
  };

  const tasks = [
    { name: "Read the ibex EVP", path: "/read-evp" },
    { name: "Watch the EVP video", path: "/video" },
    { name: "Dreamwall / Aspirational Wall", path: "/dreamwall" },
    { name: "Refer 5 People", path: "/refer" },
    { name: "Career Quiz", path: "/career-quiz" },
    { name: "Post on Social Media", path: "/social" },
    { name: "Satisfaction Survey", path: "/survey" },
  ];

  return (
    <div className="tasks-container">
      {/* ✅ Header */}
      <div className="tasks-header">
        <p>Hello, <b>{userName}</b></p>

        <div className="settings-menu" ref={menuRef}>
          <FontAwesomeIcon
            icon={faGear}
            className="settings-icon"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="submenu">
              <button onClick={() => navigate("/")}>Home</button>
              <Logout /> {/* ✅ Reusable Logout Component */}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Task List */}
      <h2 className="tasks-title">List of Tasks</h2>
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <button
            key={index}
            className="task-button"
            onClick={() => {
              // markTaskAsCompleted(task.name);
              navigate(task.path);
            }}
          >
            <span className="task-text">{task.name}</span>
            {completedTasks.includes(task.name) ? (
              <span className="task-status completed">✅</span>
            ) : (
              <span className="task-status pending">⚠️</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
