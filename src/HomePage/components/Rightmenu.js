import React, { useState } from 'react';
import './Rightmenu.css';
import logo from './facebook_logo.png';



function RightMenu({ darkMode, toggleDarkMode, profilePhoto, onPhotoChange }) {
  const handleModeToggle = () => {
    toggleDarkMode();
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

  return (
    <aside className={`right-menu ${darkMode ? 'dark-mode' : ''}`}>
      <img src={profilePhoto} alt="Profile" className="profile-picture-user" />
      
      <input
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="choose-pic"
      />
      <img src={logo} alt="Facebook Logo" className="logo" />
      <ul>
        <li>Profile</li>
        <li>Posts</li>
        <li>Friends</li>
        <li>Groups</li>
      </ul>
      <button className="mode-toggle" onClick={handleModeToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  );
}

export default RightMenu;

