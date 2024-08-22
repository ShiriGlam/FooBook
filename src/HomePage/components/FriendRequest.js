import React, { useState, useEffect } from 'react';
import './FriendRequest.css'
import { jwtDecode } from 'jwt-decode';
function FriendRequests({ userId }) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [UsersRequests, setUsers] = useState([]);
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
  


  const handleFetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('token');

      // Decode the token to access the user ID
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
      console.log(data)
      setFriendRequests(data.pendingRequests);
      // Fetch usernames for each friend request
      const requestsUsers = await Promise.all(data.pendingRequests.map(async requestId => {
        const userResponse = await fetch(`http://localhost:3001/api/users/${requestId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = await userResponse.json();
        return userData;
      }));
      setUsers(requestsUsers);
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
    

  const handleAcceptRequest = async (friendId) => {
    try {
      const token = getCookie('token');
      const decodedToken = jwtDecode(token);
      const userId2 = decodedToken.id;
      const response = await fetch(`http://localhost:3001/api/users/${userId2}/friends/${friendId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      // Update the list of friend requests after accepting
      setFriendRequests(friendRequests.filter(request => request !== friendId));
      //console.log(friendRequests)
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Handle error
    }
  };

  const handleRejectRequest = async (friendId) => {
    try {
      const token = getCookie('token');
      const decodedToken = jwtDecode(token);
      const userId2 = decodedToken.id;
      const response = await fetch(`http://localhost:3001/api/users/${userId2}/friend-requests/${friendId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject friend request');
      }
  
      // Update the list of friend requests after rejecting
      setFriendRequests(friendRequests.filter(request => request !== friendId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      // Handle error
    }
  };

  return (
    <div className="friend-requests-list">
      <li onClick={handleFetchRequests}>Click to see Friend Requests</li>
      {friendRequests !== null && (
        <div className="friend-requests-container">
          {isLoading ? (
            <p>Loading friend requests...</p>
          ) : friendRequests.length > 0 ? (
            <ul>
              {friendRequests.map((requestId, index) => (
                <li key={index} className="friend-request-item">
                  <div className="user-request">
                    <img
                      src={UsersRequests[index].profilePhoto}
                      alt="Profile"
                      className="profile-photo"
                    />
                    <span className="username">{UsersRequests[index].username}</span>
                  </div>
                  <button className="accept" onClick={() => handleAcceptRequest(requestId)}>Accept</button>
                  <button className="reject" onClick={() => handleRejectRequest(requestId)}>Reject</button>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );}
export default FriendRequests;