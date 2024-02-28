import React, { useState, useEffect } from 'react';
import './FriendRequest.css'
import { jwtDecode } from 'jwt-decode';
function FriendRequests({ userId }) {
  const [friendRequests, setFriendRequests] = useState([]);
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
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = getCookie('token');
		const decodedToken = jwtDecode(token);
		const userId2 = decodedToken.id;
        const response = await fetch(`http://localhost:3001/api/users/${userId2}/friend-requests`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pending friend requests');
        }

        const data = await response.json();
        setFriendRequests(data.pendingRequests);
      } catch (error) {
        console.error('Error fetching pending friend requests:', error);
        // Handle error
      }
    };

    
      fetchFriendRequests();
    
  }, [userId]);
  const handleAcceptRequest = async (friendId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${userId}/friends/${friendId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      // Update the list of friend requests after accepting
      setFriendRequests(friendRequests.filter(request => request.id !== friendId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Handle error
    }
  };

  const handleRejectRequest = async (friendId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${userId}/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject friend request');
      }

      // Update the list of friend requests after rejecting
      setFriendRequests(friendRequests.filter(request => request.id !== friendId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      // Handle error
    }
  };

  return (
    <div className="friend-requests-list">
      <li>Friend Requests</li>
      <div className="friend-requests-container">
        {friendRequests.length > 0 ? (
          <ul>
            {friendRequests.map(request => (
              <li key={request.id}>
                {request.username}
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No friend requests</p>
        )}
      </div>
    </div>
  );
}

export default FriendRequests;