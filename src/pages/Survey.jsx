import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Survey.css";

export default function Survey() {
    const navigate = useNavigate();
    const [responses, setResponses] = useState({
        knowDot: "",
        brandIcon: "",
        coreValues: "",
        visitedWebsite: "",
        ibexNews: "",
        socialFollow: "",
        socialPlatform: "",
        onlineActivities: "",
        communicationFrequency: "",
        attendedEvents: "",
        referredSomeone: "",
        whyJoinIbex: "",
        memorableCampaign: "",
        brandImprovement: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponses({ ...responses, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // ✅ Save survey as completed in sessionStorage
        const completedTasks = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
        if (!completedTasks.includes("Satisfaction Survey")) {
            completedTasks.push("Satisfaction Survey");
            sessionStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        }

        alert("Survey submitted successfully!");
        navigate("/tasks"); // ✅ Redirect to tasks page
    };

    return (
        <div className="survey-container">
            <h1 className="heading">
                <img src="/evp/images/Header-Survey.png" alt="Header Social" />
            </h1>

            <form onSubmit={handleSubmit} className="survey-form">
                {/* ✅ Yes/No Question */}
                <label>Do you know Dot/Dottie?</label>
                <div className="radio-group">
                    <input type="radio" name="knowDot" value="Yes" onChange={handleChange} required /> Yes
                    <input type="radio" name="knowDot" value="No" onChange={handleChange} required /> No
                </div>

                {/* ✅ Text Input */}
                <label>What is the official Ibex Brand icon?</label>
                <input type="text" name="brandIcon" value={responses.brandIcon} onChange={handleChange} required />

                <label>Can you name Ibex’s core values?</label>
                <input type="text" name="coreValues" value={responses.coreValues} onChange={handleChange} required />

                {/* ✅ Yes/No Question */}
                <label>Have you visited Ibex’s official website?</label>
                <div className="radio-group">
                    <input type="radio" name="visitedWebsite" value="Yes" onChange={handleChange} required /> Yes
                    <input type="radio" name="visitedWebsite" value="No" onChange={handleChange} required /> No
                </div>

                {/* ✅ Text Input */}
                <label>How do you get news about Ibex?</label>
                <input type="text" name="ibexNews" value={responses.ibexNews} onChange={handleChange} required />

                {/* ✅ Yes/No with Text Input */}
                <label>Do you follow Ibex on social media? If yes, which platform(s)?</label>
                <div className="radio-group">
                    <input type="radio" name="socialFollow" value="Yes" onChange={handleChange} required /> Yes
                    <input type="radio" name="socialFollow" value="No" onChange={handleChange} required /> No
                </div>
                {responses.socialFollow === "Yes" && (
                    <input type="text" name="socialPlatform" value={responses.socialPlatform} onChange={handleChange} placeholder="Enter platform(s)" required />
                )}

                {/* ✅ Yes/No Question */}
                <label>Have you participated in any Ibex online engagement activities?</label>
                <div className="radio-group">
                    <input type="radio" name="onlineActivities" value="Yes" onChange={handleChange} required /> Yes
                    <input type="radio" name="onlineActivities" value="No" onChange={handleChange} required /> No
                </div>

                {/* ✅ Text Input */}
                <label>How frequently do you check Ibex’s internal communication channels?</label>
                <input type="text" name="communicationFrequency" value={responses.communicationFrequency} onChange={handleChange} required />

                <label>What Ibex events or programs have you attended in the past year?</label>
                <input type="text" name="attendedEvents" value={responses.attendedEvents} onChange={handleChange} required />

                <label>Have you ever referred a friend or family member to apply at Ibex?</label>
                <input type="text" name="referredSomeone" value={responses.referredSomeone} onChange={handleChange} required />

                <label>If someone asked you why they should join Ibex, what would you say?</label>
                <input type="text" name="whyJoinIbex" value={responses.whyJoinIbex} onChange={handleChange} required />

                <label>Which Ibex campaign, slogan, or tagline do you remember the most?</label>
                <input type="text" name="memorableCampaign" value={responses.memorableCampaign} onChange={handleChange} required />

                <label>What do you think Ibex can improve to enhance its brand identity and employee engagement?</label>
                <input type="text" name="brandImprovement" value={responses.brandImprovement} onChange={handleChange} required />

                {/* ✅ Submit Button */}
                <button type="submit" className="submit-button">Submit Survey</button>
            </form>
        </div>
    );
}
