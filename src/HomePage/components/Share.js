import React, { useState } from 'react';
import './Share.css';

function Share({ onPost, darkMode }) {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        // Set the photo variable with the base64 data of the selected photo
        setPhoto(photoData); 
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };
  const handleAddPhotoClick = () => {
    document.getElementById('photo-input').click();
  };
  const handleSubmit = async () => {
    try {
      if (content.trim() === '') {
        setErrorMessage('');
        alert('Content cannot be empty');
        return;
      }
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
      alert(error);
      setContent('');
      setPhoto(null);
      return
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
      {photo && <img src={photo} alt="Selected" />} {}
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: 'none' }} 
      />
      <button onClick={handleAddPhotoClick}>Add Photo</button>
      <button onClick={handleSubmit}>Share</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Share;
