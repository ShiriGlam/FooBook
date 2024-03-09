import React, { useState, useEffect } from 'react';
import './PostItem.css';
import FriendFeed from './FriendFeed';
function PostItem({ post, onLike, onDelete, onUpdate, darkMode, currentUser,userid, profilePhoto  }) {
  console.log('Post:', post);
  const {_id,  userId, author,photo, content, likes, comments, createdAt } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState(photo);
  const [editedContent, setEditedContent] = useState(content);
  const [commentInput, setCommentInput] = useState('');
  const [postComments, setPostComments] = useState(comments);
  const [isFriend, setIsFriend] = useState(true);
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [profilePicture, setProfilePicture] = useState(comments);
  const [showFriendFeed, setShowFriendFeed] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
 const timestamp=createdAt;
 useEffect(() => {
  const fetchUserProfile = async (userId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      setProfilePicture(userData.profilePhoto);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  fetchUserProfile(userId);
}, []);
 const handleSendRequest = async () => {
  try {
    const token = getCookie('token'); // Assuming you have a function to retrieve the JWT token
    const response = await fetch(`http://localhost:3001/api/users/${userid}/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error('Failed to add membership request');
    }

    console.log('Membership request added successfully');
    setIsSendRequest(true)
  } catch (error) {
    console.error('Error adding membership request:', error);
    console.log(error)
  }
};

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
    onLike(_id); // This will handle the like operation on the server side
  
    // Update the likes count locally
    setLikesCount(prevLikes => prevLikes + 1);
  };
  useEffect(() => {
    // Fetch list of friends for the current user
    fetchFriends();
  }, []);
  useEffect(() => {
    fetchFriendsRequest();
  }, []);
  const fetchFriends = async () => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${userid}/friends`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const friendList = await response.json();
        // Check if the author of the post is among the friends
        const isFriend = friendList.some(friend => friend._id === userId);
        setIsFriend(isFriend);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
    
  };
  const fetchFriendsRequest = async () => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${userId}/friend-requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const friendRequestsList = await response.json();
        console.log(friendRequestsList.pendingRequests);
        // Check if the author of the post is among the friends
        const isSend = friendRequestsList.pendingRequests.includes(userid);
        setIsSendRequest(isSend);
       
      }
    } catch (error) {
      console.error('Error fetching requsts:', error);
    }
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
  
  const handleFriendClick = () => {
    // Check if the author is a friend
    if (isFriend) {
      setShowFriendFeed(true);
    } else {
      // Logic to handle if the author is not a friend (optional)
      console.log(`${author} is not your friend.`);
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
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        )}
      <div className="author" onClick={handleFriendClick}>
  <p>{author}</p>
</div>
        {!isFriend && !isSendRequest ? (
          <button className="send-request-button" onClick={handleSendRequest}>Send Friend Request</button>
        ):(isSendRequest && 
          <p className="already-sent">you already sent request</p> 
        )}
        <div className="timestamp">{timestamp}</div>
        <div className="like-section">
          <button className="like-button" onClick={handleLikeClick}>Like</button>
          <span className={darkMode ? 'dark-mode' : ''}>{likesCount} Likes</span>
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
      {}
      {comment.profilePicture && <img src={comment.profilePicture} alt="Profile" className="profile-picture" />}
      <span>{comment.author}: </span>
      {comment.content} {}
    </li>
  ))}
</ul>{showFriendFeed && <FriendFeed friendId={userId} onLike={onLike} onClose={() => setShowFriendFeed(false)} />}
      </div>
    </div>
  );
}



export default PostItem;

