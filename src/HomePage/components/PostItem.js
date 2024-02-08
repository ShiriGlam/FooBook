import React, { useState, useEffect } from 'react';
import './PostItem.css';

function PostItem({ post, onLike, onDelete, onUpdate, darkMode, currentUser }) {
  const { id, content, photo, author, timestamp, likes, comments, profilePicture } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState(photo);
  const [editedContent, setEditedContent] = useState(content);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedContent(content);
    setIsEditing(false);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
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
          <button className="like-button"onClick={handleLikeClick}>Like</button>
          <span className={darkMode ? 'dark-mode' : ''}>{likes} Likes</span>
        </div>
        {currentUser === author && (
          <div className="post-actions">
            {isEditing ? (
              <>
                <button className="save-button"onClick={handleSaveClick}> Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <button className="edit-button" onClick={handleEditClick}>Edit</button>
            )}
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-content">
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="edit-textarea"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="edit-image"
            />
          </>
        ) : (
          <>
            <div>{editedContent}</div>
            {editedPhoto && <img src={editedPhoto} alt="Post" className={`post-image ${darkMode ? 'dark-mode' : ''}`} />}
          </>
        )}
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

