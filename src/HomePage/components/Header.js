import FriendFeed from './FriendFeed';
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logo from "./facebook_logo.png"
import { jwtDecode } from 'jwt-decode';
function Header({userId, onLike}) {
  const [showFriendList, setShowFriendList] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showFriendFeed, setShowFriendFeed] = useState(false);
  const friendListRef = useRef(null);
  const token = getCookie('token');
  const decodedToken = jwtDecode(token);
   const currentusername = decodedToken.username;
   
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
    const handleClickOutside = (event) => {
      if (friendListRef.current && !friendListRef.current.contains(event.target)) {
        setShowFriendList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserProfile = async (friendId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/users/${friendId._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const userData = await response.json();
      return { id: friendId, userName: userData.username,profilePhoto: userData.profilePhoto };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error; 
    }
  };
  
  const fetchUserProfiles = async (friendIds) => {
    try {
      const profiles = await Promise.all(friendIds.map(friendId => fetchUserProfile(friendId)));
      return profiles;
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      throw error; 
    }
  };
 
  const handleFriendClick = async () => {
    if (!showFriendList) {
      try {
        const token = getCookie('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://localhost:3001/api/users/${userId}/friends`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch friend list');
        } 
        const friendIds = await response.json();
        const profiles = await fetchUserProfiles(friendIds);
        const profilesfiltered=profiles.filter(friend => friend.userName !== currentusername);
        setFriendList(profilesfiltered);
        setShowFriendList(true);
      } catch (error) {
        console.error('Error fetching friend list:', error);
        // Handle error
      }
    } else {
      setShowFriendList(false);
      
    }
   
  };
 const handleFriendListItemClick = (friendId) => {
      setShowFriendFeed(true);
      setSelectedFriendId(friendId);
    };
 
  return (
    <header>
      <img src={logo} alt="Facebook Logo" className="logo" />
      <div className="logo">Facebook</div>
      <SecMenu onFriendClick={handleFriendClick} />
      {showFriendList && (
  <div className="friend-list" ref={friendListRef}>
    <h3>Friends</h3>
    <ul>
            {friendList.map(friend => (
              <li key={friend.id} onClick={() => handleFriendListItemClick(friend.id)}>
                <img src={friend.profilePhoto} alt={friend.userName} className="friend-photo" />
                {friend.userName}
              </li>
            ))}
          </ul> 
        </div>
      )}{showFriendFeed && selectedFriendId && (
        <FriendFeed friendId={selectedFriendId._id} onClose={() => setShowFriendFeed(false)} onLike={onLike} />
      )}
    </header>

  );
}

function SecMenu({ onFriendClick }) {
  return (
    <sec-menu>
      
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li onClick={() => onFriendClick()}>Friends</li>

      </ul>
    </sec-menu>
  );
}

export default Header;