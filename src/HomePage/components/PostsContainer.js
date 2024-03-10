import React from 'react';

import './PostContainer.css';
import PostItem from './PostItem'; // Assuming PostItem is in the same directory
function PostsContainer({ posts, onLike, onDelete, onUpdate, darkMode, currentUser,userid, profilePhoto }) {
  if (!posts || posts.length === 0) {
    return <div>No posts to display.</div>;
  }

  return (
    <div className={`posts-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="posts-wrapper">
        {posts.map(post => (
          <PostItem 
            key={post._id} 
            post={post} 
            onLike={onLike}  
            onDelete={onDelete} 
            onUpdate={onUpdate} 
            darkMode={darkMode}
            currentUser={currentUser} 
            userid={userid}
            profilePhoto={profilePhoto} 
          />
        ))}
      </div>
    </div>
  );
}


export default PostsContainer;





