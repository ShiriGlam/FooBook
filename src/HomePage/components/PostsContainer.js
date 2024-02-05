import React from 'react';
import Post from './PostItem';
import './PostContainer.css'
function PostsContainer({ posts, onLike, onDelete, darkMode }) {
  return (
    <div className={`posts-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="posts-wrapper">
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={onLike} onDelete={onDelete} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

export default PostsContainer;




