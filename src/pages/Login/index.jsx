import React, { useEffect, useRef, useState } from 'react';
import './login.css';
import grp from "../../assets/grp.png";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { saveUserdetail, logOut } from '../../Redux/loginSlice';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

import axios from 'axios';


const LoginPage = () => {
  const [otpError, setOtpError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyBtnRef = useRef(null); // 👈 Add this at top


  // 🔒 User data states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  // 🔐 OTP & validation states
  const [emailError, setEmailError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '']);

  // 🔄 Control flags
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const inputRefs = useRef([]);
  const emailInputRef = useRef(null);

  // ✅ Submit data to localStorage + Redux + redirect
  const submitUserData = (userData) => {
    const completeData = {
      ...userData,
      timestamp: new Date().toLocaleString(),
      score: "",
      totalQuestions: "",
    };

    localStorage.setItem("gUser", JSON.stringify(completeData));

    if (userData?.email) {
      dispatch(saveUserdetail({ user: { email: userData.email } }));
    }

    navigate("/instructions");
  };

  // ✅ Google Login Success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);

  const userData = {
    firstName: decoded.given_name || "",
    lastName: decoded.family_name || "",
    email: decoded.email,
    contact: contact || "", // Optional
  };

  setFirstName(userData.firstName);
  setLastName(userData.lastName);
  setEmail(userData.email);
  setIsEmailVerified(true);
  setIsGoogleLogin(true);

  try {
    // 🔄 Show loading Swal
    Swal.fire({
      title: 'Logging you in...',
       width: '300px',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="https://i.gifer.com/ZZ5H.gif" width="60" height="60" />
          <p style="margin: 0; font-size: 14px;">Saving your details...</p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      width: 320,
    });

    // 📤 Send data to Google Sheet
    await sendDataToGoogleSheet(userData);

    // ✅ Close loading Swal
    Swal.close();

    // 🎉 Show success Swal
    Swal.fire({
      icon: 'success',
      title: 'Logged in with Google!',
      text: 'Welcome, ' + userData.firstName,
      confirmButtonColor: '#3085d6',
      width: '300px',
      timer: 1500,
      showConfirmButton: false
    });

    // ⏳ Delay before navigating
    setTimeout(() => {
      submitUserData(userData);
    }, 1600);

  } catch (err) {
    console.error("Error sending Google data to Sheet:", err);

    // ❌ Show error Swal
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong while saving your data.',
      confirmButtonColor: '#d33',
    });
  }
};



  // ✅ Send user data to Google Sheet (optional)
  const sendDataToGoogleSheet = async (userData) => {
    try {
      await fetch(import.meta.env.VITE_GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, sheetName: "GMAT" }),
        mode: 'no-cors'
      });
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  // ✅ Manual login submit
  


  // ✅ Email format validator
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  
  let [emailData, setEmailData] = useState(null)

  // ✅ OTP email request handler
 const handleVerifyClick = async () => {
  if (!email.trim()) {
    setEmailError('Please enter your email');
    emailInputRef.current?.focus();
    return;
  }

  if (!isValidEmail(email)) {
    setEmailError('Please enter a valid email address');
    emailInputRef.current?.focus();
    return;
  }

  setEmailError('');

  // ⏳ Show initial Swal immediately
  Swal.fire({
    title: 'Sending OTP...',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="https://i.gifer.com/ZZ5H.gif" width="60" height="60" />
        <p style="margin: 0; font-size: 14px;">Please wait</p>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    width: 300,
  });

  try {
    let obj = { email };
    setEmailData(obj);

    // ✅ Send OTP request to backend
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/website/authentication/create`, obj);

    setShowOtp(true);

    // ✅ Update Swal with success message
   Swal.fire({
  icon: 'success',
  title: 'OTP Sent!',
  text: 'Check your email inbox.',
  confirmButtonColor: '#3085d6',
  width: '300px',
});


  } catch (error) {
    console.error('Error sending OTP:', error);
   Swal.fire({
  icon: 'error',
  title: 'Failed to Send OTP',
  text: 'Please try again later.',
  confirmButtonColor: '#d33',
  width: '300px', // match success alert width
});

  }
};


  // ✅ OTP input handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


const handleSubmit = async () => {

  if (!showOtp && !isGoogleLogin) {
    verifyBtnRef.current?.click(); // 👈 Trigger Verify button click
    return;
  }

  if (!firstName || !email || !contact) return;

  const joinedOtp = otp.join('');
  if (joinedOtp.length !== 5) return;

  // 🔄 Show loading Swal
  Swal.fire({
    title: 'Please wait...',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <img src="https://i.gifer.com/ZZ5H.gif" width="80" height="80" alt="Loading" />
        <p style="margin: 0; font-size: 14px;">Verifying OTP...</p>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    width: 300,
  });

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/website/authentication/verify`, {
      email: email,
      otp: joinedOtp
    });

    if (response.data.status !== 1) {
      Swal.close();
      setOtpError(true); // 🔴 Show red border
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'The OTP you entered is incorrect or expired.',
        confirmButtonColor: '#d33',
        width: '300px',
      });
      return;
    }

    setOtpError(false); // ✅ OTP success

    const userData = { firstName, lastName, email, contact };
    await sendDataToGoogleSheet(userData);

    // ✅ Show success Swal
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'OTP Verified!',
      text: 'You are successfully logged in.',
      confirmButtonColor: '#3085d6',
      width: '300px',
      timer: 1500,
      showConfirmButton: false,
    });

    // ⏳ Delay before final submit & redirect
    setTimeout(async () => {
      await submitUserData(userData);

      const cookie = Cookies.get("user");
      if (!cookie) {
        dispatch(logOut());
        navigate("/login");
      }
    }, 1600);

  } catch (err) {
    Swal.close();
    setOtpError(true);
    Swal.fire({
      icon: 'error',
      title: 'Invalid OTP',
      text: 'The OTP you entered is incorrect or has expired. Please try again.',
      confirmButtonColor: '#d33',
      width: '300px',
    });
  }
};





  // ✅ Logout if no valid cookie on refresh
  useEffect(() => {
    const cookie = Cookies.get("user");
    if (!cookie) {
      dispatch(logOut());
      navigate("/login");
    }
  }, [dispatch, navigate]);

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

            <form onSubmit={(e) => e.preventDefault()}>
              {/* First Name */}
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

              {/* Last Name */}
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>

              {/* Email + OTP */}
              <div className="form-group email-verification">
                <label>Email</label>
                <div className="input-wrapper">
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    required
                    placeholder="you@example.com"
                    className={emailError ? 'error' : ''}
                  />
                  <button
                    type="button" 
                    className="verify-inline-btn"
                    onClick={handleVerifyClick}
                     ref={verifyBtnRef} 
                  >
                    Verify
                  </button>
                </div>
                {emailError && <p className="error-text">{emailError}</p>}

                {/* OTP inputs (if not Google login) */}
                {showOtp && !isGoogleLogin && (
                  <div className="otp-box">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="otp-input-box"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Number */}
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  pattern="[0-9]{10}"
                  placeholder="Valid phone number"
                  title="Enter a 10-digit number"
                />
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="login-btn"
                disabled={!firstName || !lastName || !email || !contact}
              >
                Continue
              </button>
            </form>

            {/* Google Login */}
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
