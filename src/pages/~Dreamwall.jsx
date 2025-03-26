import { useState, useEffect } from "react";
import "../styles/Dreamwall.css";

export default function Dreamwall() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [entries, setEntries] = useState([]);

  // ✅ Load existing entries from localStorage
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("dreamwallEntries")) || [];
    setEntries(storedEntries);
  }, []);

  // ✅ Convert image to Base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !caption || !photo) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    // Convert image to Base64
    const base64Photo = await convertToBase64(photo);

    const newEntry = {
      id: Date.now(),
      title,
      caption,
      photo: base64Photo,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("dreamwallEntries", JSON.stringify(updatedEntries));

    // Reset form
    setTitle("");
    setCaption("");
    setPhoto(null);
  };

  return (
    <div className="dreamwall-container">
      {/* ✅ Upload Section */}
      <h1 className="heading">
        <img src="/evp/images/Header-Dreamwall.png" alt="Header EVP Video" />
      </h1>
     
      <div className="upload-section">
        <h2>Upload to Dreamwall</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />

          <textarea
            placeholder="Caption (max 180 characters)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={180}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />

          <button type="submit" className="submit-button">
            Upload Entry
          </button>
        </form>
      </div>

      {/* ✅ Display Section */}
      <div className="feed-section">
        <h2>Dreamwall Feed</h2>
        {entries.length === 0 ? (
          <p>No entries yet. Be the first to post!</p>
        ) : (
          <div className="feed-list">
            {entries.map((entry) => (
              <div key={entry.id} className="feed-item">
                <img src={entry.photo} alt={entry.title} className="feed-photo" />
                <h3>{entry.title}</h3>
                <p>{entry.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
