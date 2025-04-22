import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = ({ setUser, setUsername,setSubid }) => {
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userName: username,
        password: password,
      });
      if (response.data.message === 'Login successful') {
        setUsername(username);
        setUser(response.data.user._id);
        console.log("subss",response.data.sub)
        setSubid(response.data.sub) // Pass the user object from the response
        navigate('/home', { state: { us_name: username } });
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-div">
      // <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit} className="login-cont">
      <h2 style={{color: "black"}}>Login</h2>
        <img src="" alt="" srcSet="" />
        <div className="username-cont">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setLocalUsername(e.target.value)}
          />
        </div>
        <div className="password-cont">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message" style={{color:"white"}}>{errorMessage}</p>}
        <div className="submit-cont">
          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>
        <div className="login-signup">
          <a href="/signup" className="login-signup-link">
            New user ? Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
