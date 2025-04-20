import React, {useState,useEffect, useRef } from 'react';
import './FriendRequestSlide.css';
import { jwtDecode } from 'jwt-decode';

function FriendRequestSlide({ searchedUser, onClose }) {
  const containerRef = useRef(null);
  const [isSendRequest, setIsSendRequest] = useState(false);



  const fetchFriendsRequest = async () => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${searchedUser._id}/friend-requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const friendRequestsList = await response.json();
        //console.log(friendRequestsList.pendingRequests);
        // Check if the author of the post is among the friends
		const token = getCookie('token');
		const decodedToken = jwtDecode(token);
		const userId = decodedToken.id;
        const isSend = friendRequestsList.pendingRequests.includes(userId);
        setIsSendRequest(isSend);
       
      }
    } catch (error) {
      console.error('Error fetching requsts:', error);
    }
  };
  useEffect(() => {
    fetchFriendsRequest();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose(); // Close the FriendRequestSlide when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  const handleSendRequest = async () => {
    try {
      const serached = searchedUser._id;
      const token = getCookie('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await fetch(`http://localhost:3001/api/users/${userId}/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: serached })
      });

      if (!response.ok) {
        throw new Error('Failed to add membership request');
      }
	  setIsSendRequest(true);
      console.log('Membership request added successfully');
      
    } catch (error) {
      console.error('Error adding membership request:', error);
    }
  };

  return (
    <div className="friend-request-slide" ref={containerRef}>
      <img src={searchedUser.profilePhoto} alt={searchedUser.username} className="friend-request-slide-profile-photo" />
      <div className="friend-request-slide-info">
        <span className="friend-request-slide-username">{searchedUser.username}</span>
				{!isSendRequest ? (
					<button className="send-request-button" onClick={handleSendRequest}>Send Friend Request</button>
				) : (isSendRequest &&
					<p className="already-sent">you already sent request</p>
				)}      </div>
		</div>
	);
}



export default FriendRequestSlide;
