import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    // try {
    //   const response = await axios.post("http://localhost:5000/create", {
    //     userName: username,
    //     password: password,
    //   });
    //   console.log(username, email, password);
    //   if (response.data.message === 'Signup successful') {
    //     navigate('/home');
    //   }
    // } catch (error) {
    //   if (error.response && error.response.data.message) {
    //     setErrorMessage(error.response.data.message);
    //   } else {
    //     setErrorMessage("Signup failed, please try again");
    //   }
    // }

    axios.post("http://localhost:5000/create", {
      userName: username,
      password: password,
    });
    navigate('/home'); 
  }

  return (
    <div className="login-div">
      <form className="login-cont" onSubmit={handleSubmit}>
        <h2 style={{ color: "black" }}>Sign Up</h2>
        <div className="username-cont">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="email-cont">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="password-cont">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirm-password-cont">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message" style={{ color: "white" }}>{errorMessage}</p>}
        <div className="submit-cont">
          <button className="submit-btn" type="submit">Sign up</button>
        </div>
        <div className="login-signup">
          <a href="/" className="login-signup-link">Already a user? Login</a>
        </div>
      </form>
    </div>
  );
}
