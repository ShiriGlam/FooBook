import React from 'react';
import Post from './PostItem';
import './PostContainer.css';

function PostsContainer({ posts, onLike, onDelete, darkMode, currentUser }) {
  return (
    <div className={`posts-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="posts-wrapper">
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={onLike}  onDelete={onDelete}  darkMode={darkMode}
            currentUser={currentUser} // Pass the currentUser prop to each Post
          />
        ))}
      </div>
    </div>
  );
}

export default PostsContainer;




