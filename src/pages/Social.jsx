import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Social.css";

export default function Social() {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [postLink, setPostLink] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // ✅ Handle file upload
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Display uploaded image
        }
    };

    // ✅ Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!photo || !postLink) {
            alert("Please upload a photo and enter the social media post link.");
            return;
        }

        // Save in sessionStorage as completed
        const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
        if (!completedTasks.includes("Post on Social Media")) {
            completedTasks.push("Post on Social Media");
            sessionStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        }

        setSubmitted(true);
        alert("Challenge Completed! Redirecting to Tasks...");
        navigate("/tasks"); // ✅ Redirect back to tasks
    };

    return (
        <div className="social-container">
            <h1 className="heading">
                <img src="/evp/images/Header-Social.png" alt="Header Social" />
            </h1>
            {/* <h2>#SpottedWithDot Challenge</h2> */}
            <p>
                Get ready to take on this EVP task! Head over to the ibex Recruitment Hub and track down Dot's standee!
                Once you find her, snap a creative selfie and show off how you're embracing the ibex EVP.
            </p>
            <p>
                Post your photo on Facebook or Instagram with the hashtags{" "}
                <b>#SpottedWithDot</b> and <b>#ibexEVP</b> to let everyone know you're in on the fun.
                Once you've posted, copy the link to your post and paste it in the space below to complete the challenge.
            </p>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="social-form">
                    {/* ✅ Upload Image */}
                    <label className="upload-label">
                        Upload Your Photo:
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} required />
                    </label>

                    {/* ✅ Show Preview */}
                    {photo && <img src={photo} alt="Uploaded preview" className="photo-preview" />}

                    {/* ✅ Paste Social Media Post Link */}
                    <label className="post-label">
                        Paste Your Post Link:
                        <input
                            type="url"
                            placeholder="https://www.instagram.com/yourpost"
                            value={postLink}
                            onChange={(e) => setPostLink(e.target.value)}
                            required
                        />
                    </label>

                    {/* ✅ Submit Button */}
                    <button type="submit" className="submit-button">
                        Submit Challenge
                    </button>
                </form>
            ) : (
                <p className="success-message">🎉 Challenge Completed! Returning to Tasks...</p>
            )}
        </div>
    );
}
