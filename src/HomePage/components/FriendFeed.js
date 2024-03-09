import React, { useState, useEffect } from 'react';
import './FriendFeed.css'
function FriendFeed({ friendId, onClose }) {
  const [friendPosts, setFriendPosts] = useState([]);
  const [friendInfo, setFriendInfo] = useState(null);
  const [likes, setLikes] = useState(null);
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
    const fetchFriendInfo = async () => {
      try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/api/users/${friendId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        setFriendInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error
      }
    };

    fetchFriendInfo();
  }, [friendId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = getCookie('token');
        console.log("friend id:",friendId);
        const response = await fetch(`http://localhost:3001/api/users/${friendId}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user posts');
        }

        const postData = await response.json();
        setFriendPosts(postData);
        setLikes(postData.likes);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        // Handle error
      }
    };

    fetchUserPosts();
  }, [friendId]);
  const handleLikeClick = async (postId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/posts/like/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
  
      // Update the likes count in the UI
      setFriendPosts(prevPosts =>
        prevPosts.map(prevPost => {
          if (prevPost._id === postId) {
            return { ...prevPost, likes: prevPost.likes + 1 };
          }
          return prevPost;
        })
      );
    } catch (error) {
      console.error('Error liking post:', error);
      // Handle error
    }
  };
  return (
    <div className="friend-feed">
      <div className="user-info">
        {friendInfo && (
          <>
            <img src={friendInfo.profilePhoto} alt={friendInfo.username} className="user-profile-pic" />
            <h3>{friendInfo.username}</h3>
          </>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
      <h3>Posts by </h3>{friendInfo&& friendInfo.username}
      <div className="posts">
        {friendPosts.map(post => (
          <div key={post.id} className="post">
            {post.photo && < img src={ post.photo} alt="Post" className="post-image" />}
            <div className="post-details">
               <p>{post.content}</p>
              <div className="like-section">
              <button className="like-button" onClick={() =>  handleLikeClick(post._id)}>Like</button>
                <span>{post.likes} Likes</span>
              </div>
              <div className="comments">
                <h4>Comments</h4>
                <ul>
                  {post.comments.map(comment => (
                    <li key={comment.author}>{comment.content}<p >{comment.createdAt}</p></li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendFeed;