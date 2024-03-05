import React, { useState } from 'react';
import './Search.css';
import FriendFeed from './FriendFeed';
function Search({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFriendFeed, setShowFriendFeed] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
      setShowFriendFeed(true);
      setSelectedFriendId(userData._id);
      console.log(userData);
    } catch (error) {
      console.error('Error searching for user:', error);
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
      {showFriendFeed && selectedFriendId && (
        <FriendFeed friendId={selectedFriendId} onClose={() => setShowFriendFeed(false)}  />
      )}
    </div>
  );
}

export default Search;