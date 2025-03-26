import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios
import Swal from "sweetalert2"; // Optional if used for alert
import "../styles/EVPRead.css";

export default function EVPRead() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const userEmail = sessionStorage.getItem("userEmail");

  // ✅ Check if the task was already completed
  useEffect(() => {
    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
    if (completedTasks.includes("Read the ibex EVP")) {
      setIsAlreadyCompleted(true);
      setIsChecked(true); // ✅ Auto-check the box
    }
  }, []);

  // ✅ Handle submit & save task
  const handleSubmit = async () => {
    if (!isChecked || isAlreadyCompleted) return;

    try {
      await axios.post("http://localhost:5001/api/tasks/complete", {
        userId,
        taskName: "Read the ibex EVP"
      });

      // ✅ Save to local session too
      const updatedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
      updatedTasks.push("Read the ibex EVP");
      sessionStorage.setItem("completedTasks", JSON.stringify(updatedTasks));

      // ✅ Optionally show feedback
      Swal.fire({
        icon: "success",
        title: "Task Completed!",
        text: "You've completed the EVP reading task.",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ Redirect
      navigate("/tasks");
    } catch (error) {
      console.error("Error completing task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save task. Try again later.",
      });
    }
  };

  return (
    <div className="evpread-container">
      <div className="evpread-container-sub">
        <img src="/evp/images/ibex-logo.png" alt="Ibex Logo" className="logo" />
        <h2 className="evp-title">EMPLOYEE VALUE PROPOSITION</h2>

        <p className="evp-text">
          Welcome to ibex, where we turn aspirations into reality by investing in your professional development, offering rewards that inspire, and providing outstanding benefits.
        </p>

        <p className="evp-text">
          Our thriving culture is built on teamwork, creativity, and excellence, all driven by an award-winning employee experience.
        </p>

        <p className="evp-text">
          Guided by our values of <b>Respect, Integrity, Transparency, and Excellence</b>, we do the RITE things the RITE way to grow and win together.
        </p>

        <p className="evp-highlight">
          <b>Join us to <span className="highlight-text">realize your dream</span> – that's the ibexperience!</b>
        </p>

        <div className="evp-checkbox">
          <input
            type="checkbox"
            id="evpCheckbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            disabled={isAlreadyCompleted}
          />
          <label htmlFor="evpCheckbox">
            I acknowledge that I have read and understood the EVP statement.
          </label>
        </div>

        {!isAlreadyCompleted && (
          <button
            className="evp-button"
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Submit
          </button>
        )}

        {/* Optionally show "Go to Tasks" */}
        {isAlreadyCompleted && (
          <button className="evp-goto-button" onClick={() => navigate("/tasks")}>
            Return to Tasks
          </button>
        )}
      </div>
    </div>
  );
}
