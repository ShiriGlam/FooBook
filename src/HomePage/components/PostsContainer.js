

import React from 'react';
import Post from './PostItem';

function PostsContainer({ posts, onLike, darkMode }) {
  return (
    <div className={`posts-container ${darkMode ? 'dark-mode' : ''}`}>
      {posts.map(post => (
        <Post key={post.id} post={post} onLike={onLike} darkMode={darkMode} />
      ))}
    </div>
  );
}

export default PostsContainer;


