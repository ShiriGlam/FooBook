import FriendFeed from './FriendFeed';
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logo from "./facebook_logo.png"
import homelogo from "./homelogo.png"
import friend from "./friendsPic.png"
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
function Header({userId, onLike}) {
  const [showFriendList, setShowFriendList] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showFriendFeed, setShowFriendFeed] = useState(false);
  const [cancelMessageVisible, setCancelMessageVisible] = useState(false);

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
    const handleRemoveFriend = async (friendId) => {
      try {
        const token = getCookie('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://localhost:3001/api/users/${userId}/friends/${friendId._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to remove friend');
        }
    
        // If successful, update the friend list in the state
        setFriendList(friendListRef => friendListRef.filter(friend => friend.id !== friendId._id));
        setCancelMessageVisible(true);

        // Hide the cancel message after 3 seconds
        setTimeout(() => {
          setCancelMessageVisible(false);
        }, 3000);
      } catch (error) {
        console.error('Error removing friend:', error);
        // Handle error
      }
    };
     

  return (
    <header>
      <img src={logo} alt="Facebook Logo" className="logopic" />
      <div className="logo">Facebook</div>
      <SecMenu onFriendClick={handleFriendClick} />
      {showFriendList && (
  <div className="friend-list" ref={friendListRef}>
     <img src={friend} alt="friend Logo" className="friendlogo" />
    <h3>Friends</h3>
    <ul>{friendList.map(friend => (
    <li key={friend.userName}>
        <img src={friend.profilePhoto} alt={friend.userName} className="friend-photo" />
        <span className='username-friend' onClick={() => handleFriendListItemClick(friend.id)}>{friend.userName}</span>
        <button onClick={() => handleRemoveFriend(friend.id)}>Delete Friendship</button>
        {cancelMessageVisible && <div className="cancel-message">Friendship deleted succesfully</div>}
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
   const [profilePic, setprofilePic] = useState(null);
   const [isProfileExpanded, setIsProfileExpanded] = useState(false); 
   useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getCookie('token');
        const decodedToken = jwtDecode(token);
        const response = await fetch(`http://localhost:3001/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setprofilePic(data.profilePhoto);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

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

   const toggleExpandProfile = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };
  return (
    <sec-menu>
      
      <ul>
      <li><Link to="/feed"><img src={homelogo} alt=" home Logo" className="homelogo" /> Home</Link></li>
        <li>
          <img 
            src={profilePic} 
            alt="Profile Pic" 
            className="pic" 
            onClick={toggleExpandProfile} 
            style={{ cursor: 'pointer' }} 
          />
          Profile
        </li>
        <li onClick={() => onFriendClick()}><img src={friend} alt="friend Logo" className="friendlogo" /> Friends</li>
      </ul>
      {isProfileExpanded && (
        <div className="expanded-profile-view" onClick={toggleExpandProfile}>
          <img src={profilePic} alt="Profile Expanded" className="expanded-profile-image" />
        </div>
      )}
   
    </sec-menu>
  );
}

export default Header;