// Share.js

import React, { useState } from 'react';
import './Share.css';

function Share({ onPost, darkMode }) {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    // Check if content is empty before submitting
    if (content.trim() === '') {
      return; // Don't submit if content is empty
    }

    const newPost = {
      id: Date.now(),
      content,
      photo: photo ? URL.createObjectURL(photo) : null, // Convert photo to URL if available
      author: 'Your Name',
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    onPost(newPost);
    setContent('');
    setPhoto(null);
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleAddPhotoClick = () => {
    // Programmatically trigger the file input click event
    document.getElementById('photo-input').click();
  };

  return (
    <div className={`share ${darkMode ? 'dark-mode' : ''}`}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={darkMode ? 'dark-mode' : ''}
      ></textarea>
      {photo && <img src={URL.createObjectURL(photo)} alt="Selected" />} {/* Display selected photo */}
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: 'none' }} // Hide the file input
      />
      <button onClick={handleAddPhotoClick}>Add Photo</button>
      <button onClick={handleSubmit}>Share</button>
    </div>
  );
}

export default Share;
