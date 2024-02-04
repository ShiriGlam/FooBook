import React from 'react';
import { useState } from 'react';
import './PostItem.css'
function PostItem({ post, onLike, darkMode }) {
  const { id, content, photo, author, timestamp } = post;
  const [likes, setLikes] = useState(post.likes);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
      <div className="post-content">
        <div>{content}</div>
        {photo && <img src={photo} alt="Post" className={darkMode ? 'dark-mode' : ''} />} {/* Apply dark mode styles to photo if exists */}
      </div>
      <div className="post-info">
        <div className="author">{author}</div>
        <div className="timestamp">{timestamp}</div>
        <div className="like-section">
          <button onClick={handleLikeClick}>{ 'Like'}</button> {/* Change button text based on dark mode */}
          <span className={darkMode ? 'dark-mode' : ''}>{likes} Likes</span> {/* Apply dark mode styles to likes count */}
        </div>
      </div>
    </div>
  );
}


export default PostItem;