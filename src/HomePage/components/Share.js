import React, { useState } from 'react';
import './Share.css';

function Share({ onPost, darkMode }) {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
 
  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        setPhoto(photoData); // Set the photo variable with the base64 data of the selected photo
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };
  const handleAddPhotoClick = () => {
    // Programmatically trigger the file input click event
    document.getElementById('photo-input').click();
  };
  const handleSubmit = async () => {
    try {
      // Call the onPost function passed from the parent component
      await onPost({
         
        content,
        photo,
        likes: [],
        comments: []
      });
      setContent('');
      setPhoto(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  return (
    <div className={`share ${darkMode ? 'dark-mode' : ''}`}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={darkMode ? 'dark-mode' : ''}
      ></textarea>
      {photo && <img src={photo} alt="Selected" />} {/* Display selected photo */}
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
