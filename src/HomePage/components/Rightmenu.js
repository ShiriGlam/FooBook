
import React, { useState } from 'react';
import './Rightmenu.css';
import logo from './facebook_logo.png';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import FriendRequests from './FriendRequest';
import DropdownMenu from './DeleteAccount';
function RightMenu({ darkMode, toggleDarkMode, profilePhoto, onPhotoChange, username, userid ,onUsernameChange, toggleExpandProfile, onDeleteAccount }) {

  const handleModeToggle = () => {
    toggleDarkMode();
  };
  const [userId, setUserId] = useState(userid);
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePhoto, setNewProfilePhoto] = useState(null); 
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };


  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie('token');
      const decodedToken = jwtDecode(token);
      const userId_ = decodedToken.id;
      setUserId(userId_)
      const requestBody = {};
      if (newUsername) {
        requestBody.username = newUsername;
        setNewUsername(newUsername);
        onUsernameChange(newUsername);
        
      }
      if (newProfilePhoto && typeof newProfilePhoto === 'string') {
        requestBody.profilePhoto = newProfilePhoto;
      }
      

      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      // Reset form fields
      setNewUsername('');
      setNewProfilePhoto(null);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
<aside className={`right-menu ${darkMode ? 'dark-mode' : ''}`}>
  <img src={logo} alt="Facebook Logo" className="logo" />

  <div className="profile-section">
    <img src={profilePhoto} alt="Profile" className="profile-picture-user" onClick={toggleExpandProfile} />
    <label htmlFor="file-input" className="gallery-button">📸 Upload Photo</label>
    <input id="file-input" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
    <h3>{username}</h3>
  </div>

  <form className="update-form" onSubmit={handleSubmit}>
    <input type="text" value={newUsername} onChange={handleChange} placeholder="New username" />
    <input type="file" onChange={handlePhotoChange} />
    <button type="submit">💾 Save</button>
  </form>

  <FriendRequests userId={userId} />

  <button className="mode-toggle" onClick={handleModeToggle}>
    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>

  <Link to="/login" className="logout-link">🚪 Log Out</Link>

  <DropdownMenu onDeleteAccount={onDeleteAccount} />
</aside>

  );
}

export default RightMenu;