
import React, { useState } from 'react';

const ProfilePhotoUpload = ({ onPhotoSelect }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
    onPhotoSelect(file);
  };

  return (
    <div className="profile-photo-upload">
      <label htmlFor="profilePhoto" className="upload-button">
        {selectedPhoto ? (
          <img src={URL.createObjectURL(selectedPhoto)} alt="Preview" />
        ) : (
          <div className="default-photo">
          <span>Choose Profile Photo</span></div>
        )}
        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </label>
    </div>
  );
};

export default ProfilePhotoUpload;