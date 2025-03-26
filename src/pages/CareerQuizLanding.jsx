import { useNavigate } from "react-router-dom";
import "../styles/CareerQuizLanding.css";

export default function CareerQuizLanding() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz"); // Navigate to the quiz page
  };

  return (
    <div className="career-quiz-container">
      {/* ✅ Header Section */}
      <h1 className="heading">
        <img src="/evp/images/Header-Career.png" alt="Header EVP Video" />
      </h1>
      <h2 className="career-quiz-title">
        The Chronicles of ibex: Your Journey to the True Path
      </h2>

      <p className="career-quiz-description">
        In the mystical kingdom of ibex, adventurers are called upon to help the realm thrive.
        You are one such adventurer, standing at the dawn of your journey. As you navigate the 
        challenges ahead, the choices you make will reveal where your true talents lie. 
        Will you be a strategic leader, a creative visionary, or a seeker of the kingdom’s 
        next great heroes? Only time will tell.
      </p>

      {/* ✅ Hero Image */}
      <img 
        src="/evp/images/ibex-journey.png" 
        alt="The Chronicles of Ibex" 
        className="career-quiz-image" 
      />

      {/* ✅ Call to Action Button */}
      <button className="start-quiz-button" onClick={startQuiz}>
        Discover Your Dream Role at ibex!
      </button>
    </div>
  );
}
