import React, { useState } from 'react';
import './Search.css';
import FriendFeed from './FriendFeed';
  import { jwtDecode } from 'jwt-decode';

import FriendRequestSlide from './FriendRequestSlide';

function Search({ darkMode}) {

  const [searchQuery, setSearchQuery] = useState('');
  const [showFriendFeed, setShowFriendFeed] = useState(false);
  const [showFriendRequestSlide, setShowFriendRequestSlide] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
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
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/search/${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search for user');
      }

      const userData = await response.json();
      setSearchedUser(userData);

      // Check if the searched user is already a friend
      const isFriend = await checkIfFriend( userData._id); // Assuming checkIfFriend is implemented

      if (isFriend) {
        setShowFriendFeed(true);
      } else {
        setShowFriendRequestSlide(true);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };
  const checkIfFriend = async ( searchedUserId) => {
    try {
      const token = getCookie('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await fetch(`http://localhost:3001/api/users/${userId}/friends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to check friend status');
      }
  
      const friends  = await response.json();
      for (let i = 0; i < friends.length; i++) {
        if (friends[i]._id === searchedUserId) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking friend status:', error);
      return false;
    }
  };
  return (
    <div className={`search ${darkMode ? 'dark-mode' : ''}`}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {showFriendFeed && searchedUser && (
  <FriendFeed friendId={searchedUser._id} onClose={() => setShowFriendFeed(false)} />
)} 
     {showFriendRequestSlide && <FriendRequestSlide searchedUser={searchedUser} onClose={() =>setShowFriendRequestSlide(false)}/>} {}
    </div>
  );
}



export default Search;