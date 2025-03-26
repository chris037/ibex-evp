import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios

import Swal from "sweetalert2"; // Optional if used for alert

import "../styles/Dreamwall.css";

export default function Dreamwall() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [entries, setEntries] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);




  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/dreamwall/entries");
      setEntries(response.data);
    } catch (error) {
      console.error("Error loading entries", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      Swal.fire("Error", "User not found in session", "error");
      return;
    }

    if (!title || !caption || !photo) {
      Swal.fire("Missing Info", "Please complete all fields", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("photo", photo);

    try {
      // ✅ Submit Dreamwall entry
      await axios.post("http://localhost:5001/api/dreamwall/submit", formData);

      // ✅ Show SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Entry Submitted!",
        text: "Your entry is pending approval. Great job!",
        confirmButtonColor: "#ffc107",
        timer: 2000,
        showConfirmButton: false
      });

      // ✅ Hide the form
      //setHasSubmitted(true);
      // ✅ Mark task as completed (pending approval is handled on backend)
      await axios.post("http://localhost:5001/api/tasks/complete", {
        userId,
        taskName: "Dreamwall / Aspirational Wall"
      });

      const completed = JSON.parse(sessionStorage.getItem("completedTasks")) || [];
      if (!completed.includes("Dreamwall / Aspirational Wall")) {
        completed.push("Dreamwall / Aspirational Wall");
        sessionStorage.setItem("completedTasks", JSON.stringify(completed));
      }

      // ✅ Reset form / disable
      setTitle("");
      setCaption("");
      setPhoto(null);
      setHasSubmitted(true);

    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire("Upload Error", "Something went wrong while submitting your entry.", "error");
    }
  };

  return (
    <div className="dreamwall-container py-4">
      <h1 className="text-center mb-4">
        <img src="/evp/images/Header-Dreamwall.png" alt="Dreamwall Header" className="img-fluid" />
      </h1>

      {/* Upload Form */}
      {!hasSubmitted && (
        <div className="upload-section card bg-dark text-white p-3 mb-4">
          <h2 className="text-center">Upload to Dreamwall</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control mb-2"
              maxLength={50}
              required
            />
            <textarea
              placeholder="Caption (max 180 characters)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="form-control mb-2"
              maxLength={180}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="form-control mb-3"
              required
            />
            <button type="submit" className="btn btn-warning w-100 fw-bold">
              Upload Entry
            </button>
          </form>
        </div>
      )}
      {hasSubmitted && (
        <div className="alert alert-info text-center">
          ✅ You’ve already submitted your Dreamwall entry. It is pending approval.
        </div>
      )}

      {/* Feed Section */}
      <h4 className="text-white mb-3">Dreamwall Feed</h4>
      <div className="row g-3">
        {entries.length === 0 ? (
          <p className="text-light">No entries yet. Be the first to post!</p>
        ) : (
          entries.map((entry) => (
            <div className="col-12" key={entry.id}>
              <div className="card text-white bg-dark">
                <img
                  src={`http://localhost:5001/uploads/${entry.photo}`}
                  alt={entry.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{entry.title}</h5>
                  <p className="card-text">{entry.caption}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
