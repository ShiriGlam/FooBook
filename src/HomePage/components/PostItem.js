import React, { useState, useEffect } from 'react';
import './PostItem.css';

function PostItem({ post, onLike, onDelete, onUpdate, darkMode, currentUser, profilePhoto  }) {
  console.log('Post:', post);
  const { _id, userId, author,photo, content, likes, comments, createdAt } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState(photo);
  const [editedContent, setEditedContent] = useState(content);
  const [commentInput, setCommentInput] = useState('');
  const [postComments, setPostComments] = useState(comments);

 const timestamp=createdAt;
 const profilePicture=profilePhoto;
 function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
}
  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  const handleLikeClick = () => {
    onLike(_id);
    likes.length++;
  };

  const handleDeleteClick = () => {
    onDelete(_id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = getCookie('token');
      const formData = new FormData();
      formData.append('content', editedContent);
      if (editedPhoto) {
        formData.append('photo', editedPhoto);
      }
  
      const response = await fetch(`http://localhost:3001/api/posts/${_id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
  
      // Update the post content in the UI
      onUpdate(_id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('photo', file);
  
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/api/posts/${_id}`, {
          method: 'PATCH', // Use PATCH method to update the post
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Failed to update post photo');
        }
  
        // Fetch the updated post data after updating photo
        const updatedPostData = await fetchPostData(); // You need to implement fetchPostData function to fetch updated post data
        setEditedPhoto(updatedPostData.photo);
      } catch (error) {
        console.error('Error updating post photo:', error);
      }
    }
  };

  const handleCancelClick = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleCommentSubmit = async () => {
    try {
      if (commentInput.trim() !== '') {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/api/posts/comment/${_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({postId: _id, content: commentInput })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
  
        const newupdatepost = await response.json();
        const newCommentData = newupdatepost.comments[newupdatepost.comments.length - 1];        // Update the comment list with the newly added comment
        setPostComments([...postComments, newCommentData]);
        setCommentInput('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
      <div className="post-info">
        {/* Display profile photo and name of the author */}
        {author === currentUser ? (
          <img src={profilePhoto} alt="Profile" className="profile-picture" />
        ) : (
          <img src={profilePhoto} alt="Profile" className="profile-picture" />
        )}
        <span>{author}</span>
        <div className="timestamp">{timestamp}</div>
        <div className="like-section">
          <button className="like-button" onClick={handleLikeClick}>Like</button>
          <span className={darkMode ? 'dark-mode' : ''}>{likes.length} Likes</span>
        </div>
        {author === currentUser && (
  <div className="post-actions">
    {isEditing ? (
      <>
        <button className="save-button" onClick={handleSaveClick}>Save</button>
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
            <div>{content}</div>
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
  {postComments && postComments.map(comment => (
    <li key={comment.id}>
      {/* Display profile photo if available */}
      {comment.profilePicture && <img src={comment.profilePicture} alt="Profile" className="profile-picture" />}
      <span>{comment.author}: </span>
      {comment.content} {/* This line should display the comment content */}
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}



export default PostItem;

