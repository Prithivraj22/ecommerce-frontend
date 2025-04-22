import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser, FaSearch } from 'react-icons/fa';
import '../styles/styles.css';
import SuprSendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = ({ username, setUsername,subid }) => {
  console.log("in nav",subid+username)
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  
    setUsername("")
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const toggleProfileDropdown = () => {
    setProfileOpen(prevState => !prevState);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to='/home' className='iconLink'>
        <FaHome style={{marginTop:"8px"}}  size={20} />
      </Link>
      <h3>PrimeDeals</h3>
      <div className="navbar-icons">
        <FaSearch style={{marginTop:"18px"}} size={20} className='iconLink' onClick={handleSearchClick} />
        <Link to='/cart' className='iconLink'>
          <FaShoppingCart style={{marginTop:"3px",marginLeft:"-8px"}} size={20} />
        </Link>
        <div style={{marginTop:'-7px'}}>
        <SuprSendInbox 
        
        theme={{ bell: { color: 'white' } }}
          workspaceKey="3BQAluJ5w24iwFgy88IE"
          subscriberId={subid}
          distinctId={username}
        />
        </div>
        <div className='profile-container'>
          <FaUser style={{marginTop:"19px",marginLeft:"5px"}}  size={20} className='iconLink' onClick={toggleProfileDropdown} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <p>{username && username !== "Login to view Username" ? `Hello, ${username}!` : "Not logged in"}</p>
              {username && username !== "Login to view Username" ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/">
                  <button>Login</button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
