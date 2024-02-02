import React from 'react';
import './PostItem.css'
function PostItem({ post }) {
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.name} className="avatar" />
        <div className="author-info">
          <h3>{post.author.name}</h3>
          <p>{post.date}</p>
        </div>
      </div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostItem;
