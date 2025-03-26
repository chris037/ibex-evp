import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EVPRead.css";

export default function EVPRead() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);

  // ✅ Check if "Read the ibex EVP" is already completed
  useEffect(() => {
    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
    if (completedTasks.includes("Read the ibex EVP")) {
      setIsChecked(true);
      setIsAlreadyCompleted(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];

    if (!completedTasks.includes("Read the ibex EVP")) {
      completedTasks.push("Read the ibex EVP");
      sessionStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    navigate("/tasks"); // Redirect after submission
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

        {/* Checkbox for confirmation */}
        <div className="evp-checkbox">
          <input
            type="checkbox"
            id="evpCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={isAlreadyCompleted} // Disable if already completed
          />
          <label htmlFor="evpCheckbox">
            I acknowledge that I have read and understood the EVP statement.
          </label>
        </div>

        {/* Submit button */}
        {!isAlreadyCompleted && (
          <button
            className="evp-button"
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Submit
          </button>
        )}

        {/* Show "Go to Tasks" button only if already completed */}
        {isAlreadyCompleted && (
          <button className="evp-goto-button" onClick={() => navigate("/tasks")}>
            Go to Tasks
          </button>
        )}
      </div>
    </div>
  );
}
