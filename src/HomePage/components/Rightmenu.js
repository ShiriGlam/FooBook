import React, { useRef, useState } from 'react';
import './Rightmenu.css';
import logo from './facebook_logo.png';
import { Link } from 'react-router-dom';


function RightMenu({ darkMode, toggleDarkMode, profilePhoto, onPhotoChange,toggleExpandProfile }) {
  const handleModeToggle = () => {
    toggleDarkMode();
  };
  const fileInputRef = useRef(null);

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

  const handleGalleryButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('accept');
      fileInputRef.current.click();
    }
  };

 
  return (
    <aside className={`right-menu ${darkMode ? 'dark-mode' : ''}`}>
      <div>
      <img src={logo} alt="Facebook Logo" className="logo" />
      </div>
      <img src={profilePhoto} alt="Profile"  className="profile-picture-user "
         onClick={toggleExpandProfile} 
     />
      <button className="gallery-button" onClick={handleGalleryButtonClick}>
        Choose from Gallery
      </button>
      <input
        ref={fileInputRef}
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handlePhotoChange}
        className="choose-pic"
        style={{ display: 'none' }}
      />
      <ul>
      <li >Profile</li>
        <li>Posts</li>
        <li>Friends</li>
        <li>Groups</li>
      </ul>
      
      <button className="mode-toggle" onClick={handleModeToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <p><Link to="/login">Log Out</Link></p>
    </aside>
     
  );

  };
export default RightMenu;

