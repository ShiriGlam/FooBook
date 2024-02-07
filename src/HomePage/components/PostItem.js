import React, { useState, useEffect } from 'react';
import './PostItem.css';

function PostItem({ post, onLike, onDelete, darkMode, currentUser }) {
  const { id, content, photo, author, timestamp, likes, comments, profilePicture } = post;
  const [commentInput, setCommentInput] = useState('');
  const [postComments, setPostComments] = useState(comments);

  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  const handleLikeClick = () => {
    onLike(id);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        id: Date.now(),
        author: currentUser,
        content: commentInput,
        profilePicture: '' // You may provide a default profile picture here if needed
      };
      setPostComments([...postComments, newComment]);
      setCommentInput('');
    }
  };

  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
      <div className="post-info">
        {/* Display profile photo and name of the author */}
        <div className="author">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <span>{author}</span>
        </div>
        <div className="timestamp">{timestamp}</div>
        <div className="like-section">
          <button onClick={handleLikeClick}>Like</button>
          <span className={darkMode ? 'dark-mode' : ''}>{likes} Likes</span>
        </div>
        {currentUser === author && ( // Show delete button only for the current user's posts
          <div className="post-actions">
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-content">
        <div>{content}</div>
        {photo && <img src={photo} alt="Post" className={`post-image ${darkMode ? 'dark-mode' : ''}`} />}
      </div>
      <div className="comment-section">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Comment</button>
        <ul>
          {postComments.map(comment => (
            <li key={comment.id}>
              {/* Render profile picture if available */}
              {comment.profilePicture && <img src={comment.profilePicture} alt="Profile" className="profile-picture" />}
              <span>{comment.author}: </span>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostItem;
