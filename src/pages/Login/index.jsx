import React, { useState } from 'react';
import './login.css';
import grp from "../../assets/grp.png";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';

const LoginPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  // Function to send data to Google Sheet
  const sendDataToGoogleSheet = async (userData) => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyF1OEt94-4AbaUfIVyGaX9BLndYeMu_9TaFzXxlkkbJ5b65tAagN96ieyMyJWmedgzig/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...userData,
          sheetName: "GMAT"
        }),
        mode: 'no-cors' // Add this if you're getting CORS errors
      });
      
      // If using no-cors, you won't be able to read the response
      console.log("Request sent successfully");
      
      // If not using no-cors, you can check the response
      // const data = await response.json();
      // console.log("Response:", data);
      
    } catch (err) {
      console.error("Error sending data:", err);
    }
};

  // Handle manual login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    submitUserData({
      firstName,
      lastName,
      email,
      contact
    });
  };

  // Common function to handle user data submission
  const submitUserData = (userData) => {
    const completeData = {
      ...userData,
      timestamp: new Date().toLocaleString(),
      score: "",
      totalQuestions: "",
    };

    sendDataToGoogleSheet(completeData);
    localStorage.setItem("gUser", JSON.stringify(completeData));
    navigate("/instructions"); // Redirect after login
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User:", decoded);

    // Auto-fill the form with Google data
    setFirstName(decoded.given_name || "");
    setLastName(decoded.family_name || "");
    setEmail(decoded.email);

    const userData = {
      firstName: decoded.given_name || "",
      lastName: decoded.family_name || "",
      email: decoded.email,
      contact: contact || "",
    };

    setTimeout(() => {
      submitUserData(userData);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="login-wrapper">
        <div className="login-image">
          <img src={grp} alt="group" />
        </div>

        <div className="login-form">
          <div className="login-box">
            <h2 className="login-title">Login to Your Account</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="John"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Doe"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  placeholder="valid phone number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit number"
                />
              </div>

              <div className="form-bottom">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me 
                </label>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={!firstName || !lastName || !email || !contact}
              >
                {email ? 'Continue' : 'Log In'}
              </button>
            </form>

            <div className="social-login">
              <div className="social-divider">or continue with</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log("Google Login Failed")}
                theme="filled_blue"
                size="large"
                shape="rectangular"
                text="signin_with"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
