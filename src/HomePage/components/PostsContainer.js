// PostsContainer.js
import React from 'react';
import Post from './PostItem';
import './PostContainer.css'
function PostsContainer({ posts, onLike, onDelete, darkMode }) {
  return (
    <div className="posts-container">
      {posts.map(post => (
        <Post key={post.id} post={post} onLike={onLike} onDelete={onDelete} darkMode={darkMode} />
      ))}
    </div>
  );
}

export default PostsContainer;




