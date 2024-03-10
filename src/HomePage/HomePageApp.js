
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Share from './components/Share';
import Search from './components/Search';
import PostsContainer from './components/PostsContainer';
import Rightmenu from './components/Rightmenu';

import './HomePageApp.css';
function HomePageApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [username, setUsername] = useState('');
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [feedPosts, setFeedPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUsername(data.username);
        setProfilePhoto(data.profilePhoto);
        setUserId(data._id);
        console.log("username" ,username)
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    const fetchFeedPosts = async () => {
       try {
        // Fetching feed posts for the current user's friends
        const response = await fetch(`http://localhost:3001/api/posts`, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch feed posts');
        }
    
        const data = await response.json();
        setFeedPosts(data); // Update feedPosts state with fetched data
      } catch (error) {
        console.error('Error fetching feed posts:', error);
      }
    };
    fetchUserProfile();
    fetchFeedPosts();
  }, [userId]);

  const updatePost = async (postId, updatedContent) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: updatedContent })
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPostData = await response.json();

      // Update the feed with the newly updated post data
      setFeedPosts(feedPosts.map(post => post._id === postId ? updatedPostData : post));
    } catch (error) {
      console.error('Error updating post:', error);
    }
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
  const handlePostCreation = async (postData) => {
    try {
      const token = getCookie('token');
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
  
      const newPostData = await response.json();
  
      // Update the feed with the newly created post
      setFeedPosts([newPostData, ...feedPosts]);
  
      return newPostData; // Return the newly created post data
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  // Update the handleLike function in your front-end code
  const handleLike = async (postId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/posts/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
    
      const updatedPostData = await response.json();
    
      // Update the feed with the newly updated post data
      setFeedPosts(feedPosts.map(post => post._id === postId ? updatedPostData : post));
      console.log(updatedPostData );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const handlePhotoChange = (newPhoto) => {
    setProfilePhoto(newPhoto);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const deletePost = async (postId) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
  
      // Remove the deleted post from the UI
      
      console.log('Before deletion:', feedPosts);
      setFeedPosts(feedPosts.filter(post => post._id !== postId));
     console.log('After deletion:', feedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
 
  const toggleExpandProfile = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };
  const handleDeleteAccount = async () => {
    try {
      const token = getCookie('token');
      // Fetch all posts belonging to the user
      const response = await fetch(`http://localhost:3001/api/users/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
  
      const posts = await response.json();
      
      // Delete each post
      await Promise.all(posts.map(async post => {
        const deleteResponse = await fetch(`http://localhost:3001/api/posts/${post._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!deleteResponse.ok) {
          throw new Error('Failed to delete user posts');
        }
      }));
  
      // Delete the user account
      const userDeleteResponse = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!userDeleteResponse.ok) {
        throw new Error('Failed to delete user account');
      }
  
      // Handle successful deletion
      console.log('User account and posts deleted successfully');
      alert('Your account has been deleted successfully. Please log out to complete the process.');
      // Redirect to login page or perform any other action after successful deletion
    } catch (error) {
      console.error('Error deleting user account and posts:', error);
      // Handle the error appropriately (e.g., display a message to the user)
    }
  };
  

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="welcome-message">Welcome, {username}!</h1>
      {userId && <Header userId={userId} onLike={handleLike} />} {}
      <div className="main-content">
        <div className="left-content">
          <Search darkMode={darkMode} />
          <Share onPost={handlePostCreation} darkMode={darkMode} />
          <PostsContainer
  posts={feedPosts}
  onLike={handleLike}
  onDelete={deletePost}
  onUpdate={updatePost}
  darkMode={darkMode}
  currentUser={username} // Pass the username
  userid={userId}
  profilePhoto={profilePhoto}
/>
        </div>
        <Rightmenu
          profilePhoto={profilePhoto}
          username={username}
          userId={userId}
          onUsernameChange={handleUsernameChange} 
          onPhotoChange={handlePhotoChange}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleExpandProfile={toggleExpandProfile}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
      {isProfileExpanded && (
        <div className="expanded-profile-view" onClick={toggleExpandProfile}>
          <img src={profilePhoto} alt="Profile" className="expanded-profile-image" />
          {}
        </div>
      )}
    </div>
  );
}

export default HomePageApp;