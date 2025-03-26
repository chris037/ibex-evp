import { useState, useEffect } from "react";
import "../styles/ReferPage.css";

export default function ReferPage() {
  const [referrals, setReferrals] = useState([
    { name: "", email: "", mobile: "", city: "", address: "" },
    { name: "", email: "", mobile: "", city: "", address: "" },
    { name: "", email: "", mobile: "", city: "", address: "" },
    { name: "", email: "", mobile: "", city: "", address: "" },
    { name: "", email: "", mobile: "", city: "", address: "" },
  ]);

  const [submitted, setSubmitted] = useState(false);

  // ✅ Load existing referrals from localStorage
  useEffect(() => {
    const storedReferrals = JSON.parse(localStorage.getItem("referrals")) || [];
    if (storedReferrals.length > 0) {
      setReferrals(storedReferrals);
      setSubmitted(true);
    }
  }, []);

  // ✅ Handle form input changes
  const handleChange = (index, field, value) => {
    const updatedReferrals = [...referrals];
    updatedReferrals[index][field] = value;
    setReferrals(updatedReferrals);
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    for (const referral of referrals) {
      if (!referral.name || !referral.email || !referral.mobile || !referral.city || !referral.address) {
        alert("Please fill in all fields for every referral.");
        return;
      }
    }

    localStorage.setItem("referrals", JSON.stringify(referrals));
    setSubmitted(true);
    alert("Referrals submitted successfully!");
  };

  return (
    
    <div className="refer-container">
      <h1 className="heading">
        <img src="/evp/images/Header-Refer.png" alt="Header EVP Video" />
      </h1>
      {/* <h2>Refer Applicants</h2> */}

      {submitted ? (
        <p className="success-message">Thank you for submitting the referrals!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {referrals.map((referral, index) => (
            <div key={index} className="referral-form">
              <h3>Referral #{index + 1}</h3>

              <input
                type="text"
                placeholder="Full Name"
                value={referral.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={referral.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={referral.mobile}
                onChange={(e) => handleChange(index, "mobile", e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="City"
                value={referral.city}
                onChange={(e) => handleChange(index, "city", e.target.value)}
                required
              />

              <textarea
                placeholder="Address"
                value={referral.address}
                onChange={(e) => handleChange(index, "address", e.target.value)}
                required
              />

            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit Referrals
          </button>
        </form>
      )}
    </div>
  );
}
