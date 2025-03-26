import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Optional if used for alert
import "../styles/EVPVideo.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function EVPVideo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
    if (completedTasks.includes("Watch the EVP video")) {
      setIsVideoCompleted(true);
    }
  }, []);
  // ✅ Detect when video ends
  const handleVideoEnd = () => {
    setIsVideoCompleted(true);
    setShowAlert(true); // Show Bootstrap alert
    setTimeout(() => {
      setShowAlert(false);
    }, 3000)
  };

  // ✅ Save task to session storage upon completion
  const markTaskAsCompleted = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in session.");
      return;
    }

    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
    const alreadySaved = completedTasks.includes("Watch the EVP video");

    if (!alreadySaved) {
      try {
        await axios.post("http://localhost:5001/api/tasks/complete", {
          userId,
          taskName: "Watch the EVP video"
        });

        completedTasks.push("Watch the EVP video");
        sessionStorage.setItem("completedTasks", JSON.stringify(completedTasks));

        // ✅ Show SweetAlert on first successful save
        Swal.fire({
          icon: "success",
          title: "Task Completed!",
          text: "You’ve successfully completed the EVP video task.",
          confirmButtonColor: "#ffcc00",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

      } catch (error) {
        console.error("Failed to save task to database", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while saving your task.",
        });
      }
    }
  };

  // ✅ Remove the task from session storage if video is not completed
  const unmarkTaskAsCompleted = () => {
    const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
    const updatedTasks = completedTasks.filter(task => task !== "Watch the EVP video");
    sessionStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
  };

  // ✅ Handle navigation back with confirmation
  const handleBack = () => {
    if (!isVideoCompleted) {
      const confirmExit = window.confirm(
        "You haven't finished watching the video. Are you sure you want to leave?"
      );
      if (!confirmExit) return;
      unmarkTaskAsCompleted(); // Remove the task if the video isn't fully watched
    } else {
      markTaskAsCompleted(); // Ensure task is saved if completed
    }
    navigate(-1);
  };

  // ✅ Save and navigate after completion
  const handleComplete = async () => {
    if (isVideoCompleted) {
      await markTaskAsCompleted(); // ✅ Only save if completed
      navigate("/tasks");
    } else {
      console.warn("User tried to submit before completing video.");
    }
  };


  // ✅ Check for landscape mode
  const checkOrientation = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };

  // ✅ Listen for orientation changes
  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="evp-video-container">
      {/* <button className="back-button" onClick={handleBack}>
        <span className="back-icon">←</span> Back
      </button> */}

      <h1 className="heading">
        <img src="/evp/images/Header-Video.png" alt="Header EVP Video" />
      </h1>



      {!isLandscape && (
        <div className="orientation-alert">
          Please rotate your phone to landscape mode for a better viewing experience.
        </div>
      )}

      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="evp-video"
          controls
          onEnded={handleVideoEnd}
        >
          <source src="/videos/evp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {showAlert && (
         <div
         className="alert alert-success alert-dismissible fade show text-center mt-3"
         role="alert">
            You've completed the video!
          </div>
        )}
      </div>

      <div className="evp-video-description">
        <h3>Discover What Makes Us Unique</h3>
        <p>
          Our EVP is more than just words—it’s our commitment to creating a workplace where people thrive. See what sets us apart and why our employees love being part of our team.
        </p>
      </div>

      <button
        className={isVideoCompleted ? "evp-goto-button" : "done-watching-button"}
        onClick={handleComplete}
        disabled={!isVideoCompleted}
      >
        {isVideoCompleted ? "Return to Tasks" : "Watch Full Video First"}
      </button>


    </div>
  );
}
