import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

function PostsContainer({ posts }) {
  
  
  return (
    <div className="posts-container">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsContainer;
