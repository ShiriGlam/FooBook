
import React from 'react';
import PostItem from './PostItem';

function PostsContainer() {
  // Assuming you have an array of photos
  const photos = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    // Add more photo URLs as needed
  ];

  return (
    <div className="posts-container">
      {photos.map((photo, index) => (
        <PostItem key={index} photo={photo} />
      ))}
    </div>
  );
}

export default PostsContainer;
