import React, { useState, useEffect } from 'react';
import './PostItem.css'
function PostItem({ post, onLike, onDelete, darkMode }) {
  const { id, content, photo, author, timestamp, likes, comments } = post;
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
      const newComment = { id: Date.now(), text: commentInput, author: 'Your Name' };
      setPostComments([...postComments, newComment]);
      setCommentInput('');
    }
  };

  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
      <div className="post-content">
        <div>{content}</div>
        {photo && <img src={photo} alt="Post" className={darkMode ? 'dark-mode' : ''} />}
      </div>
      <div className="post-info">
        <div className="author">{author}</div>
        <div className="timestamp">{timestamp}</div>
        <div className="like-section">
          <button onClick={handleLikeClick}>{'Like'}</button>
          <span className={darkMode ? 'dark-mode' : ''}>{likes} Likes</span>
        </div>
        </div>
        <div className="post-actions">
          <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
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
               <img src={comment.profilePicture} alt="Profile" className="profile-picture" />
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