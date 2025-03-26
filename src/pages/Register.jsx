import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // npm install axios
import Swal from 'sweetalert2';
import "../styles/Register.css";

export default function Register() {
    const navigate = useNavigate(); // Initialize navigation

    const regionSites = {
        "United States": ["Beckley", "Pittsburgh", "New Braunfels"],
        "Honduras": ["Honduras"],
        "Nicaragua": ["Invercasa", "Ofiplaza 1", "Ofiplaza 2", "Ofiplaza 3"],
        "Pakistan": ["Islamabad", "Lahore", "Karachi"],
        "Jamaica": ["Ocho Rios", "Campus 1", "Campus 2", "Kingston"],
        "Philippines": ["Alabang", "Paranaque", "Silver City", "Shaw", "Cyberpark", "Davao Lanang", "Davao Felcris", "Bohol 1", "Bohol 2"],
        "India": ["Sembridge"]
    };
    // Define the list of site options
    const siteOptions = [
        "Silvercity",
        "Davao",
        "Davao 2",
        "Parañaque",
        "Shaw",
        "Cyberpark",
        "Alabang",
        "Bohol 1",
        "Bohol 2",
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        region: "Philippines", // Default region
        site: "Alabang" // Default site based on default region
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "region") {
            const firstSite = regionSites[value][0];
            setFormData({ ...formData, region: value, site: firstSite });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    // // Handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Form Submitted:", formData);

    //     sessionStorage.setItem("userName", formData.name);
    //     // Redirect to EVP page after submission
    //     navigate("/evp");
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axios.post("http://localhost:5000/api/users/register", formData);
    //         sessionStorage.setItem("userName", formData.name);
    //         navigate("/evp");
    //     } catch (err) {
    //         console.error("❌ Failed to register:", err);
    //         alert("Error saving to database");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:5001/api/users/register", formData);
      
          // Save user data
          sessionStorage.setItem("userName", formData.name);
          sessionStorage.setItem("userId", response.data.userId);

          console.log(sessionStorage.getItem("userId"));
      
          // SweetAlert confirmation
          Swal.fire({
            icon: 'success',
            title: 'Registration Complete!',
            text: 'Thank you for registering. Redirecting...',
            confirmButtonColor: '#ffcc00',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
      
          // Redirect after delay
          setTimeout(() => {
            navigate("/evp");
          }, 2000);
      
        } catch (error) {
          console.error("Registration failed", error);
      
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
          });
        }
      };

    return (
        <div className="register-container">

            {/* Header Section */}
            <img src="/evp/images/ibex-logo.png" alt="Ibex Logo" className="logo" />
            <div className="register-header">

                <h1 className="register-title"> <img src="/evp/images/Header-Register.png" alt="Header Register" /></h1>
                <div className="torn-paper"></div>
            </div>

            {/* Registration Form */}
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title"><img src="/evp/images/HeaderSub-Register.png" alt="Header Register" /></h2>

                <label>Name</label>
                <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />

                <label>Personal Email</label>
                <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />

                <label>Mobile</label>
                <input type="tel" name="mobile" placeholder="Enter your mobile number" onChange={handleChange} required />

                {/* Region Selection */}
                <label>Region</label>
                <select name="region" value={formData.region} onChange={handleChange} required>
                    {Object.keys(regionSites).map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>

                {/* Site Selection */}
                <label>Site</label>
                <select name="site" value={formData.site} onChange={handleChange} required>
                    {regionSites[formData.region].map((site, index) => (
                        <option key={index} value={site}>
                            {site}
                        </option>
                    ))}
                </select>

                <button type="submit" className="register-button">Submit Form</button>
            </form>
        </div>

    );
}

