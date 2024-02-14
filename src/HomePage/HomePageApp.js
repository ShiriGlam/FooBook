
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from './components/Header';
import Share from './components/Share';
import Search from './components/Search';
import PostsContainer from './components/PostsContainer';
import Rightmenu from './components/Rightmenu';
import './HomePageApp.css';
import PostsData from './Posts.json';

function HomePageApp() {
  const [posts, setPosts] = useState(PostsData);
  const [darkMode, setDarkMode] = useState(false);
  //const [profilePhoto, setProfilePhoto] = useState('https://live.staticflickr.com/65535/53514521001_61cc6ac52e_t.jpg');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [username, setUsername] = useState('');
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setProfilePhoto(loggedInUser.profilePhoto);
    } else {
      window.location.href = '/login'; 
    }
  }, [])
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };
  const handlePhotoChange = (newPhoto) => {
    setProfilePhoto(newPhoto);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addPost = (newPost) => {
    
    const postWithUsername = { ...newPost, author: username };
    setPosts([postWithUsername, ...posts]);
  };
  const updatePost = (postId, updatedContent) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, content: updatedContent };
      }
      return post;
    }));
  };
  const toggleExpandProfile = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };
  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="welcome-message">Welcome, {username}!</h1>
      <Header />
      <div className="main-content">
        <div className="left-content">
          <Search darkMode={darkMode} />
          <Share onPost={addPost} darkMode={darkMode} />
          <PostsContainer
            posts={posts}
            onLike={handleLike}
            onDelete={deletePost}
            onUpdate={updatePost}
            darkMode={darkMode}
            currentUser={username} 
            profilePhoto={profilePhoto}
          />
          
        </div>
        <Rightmenu profilePhoto={profilePhoto}
          onPhotoChange={handlePhotoChange} darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleExpandProfile={toggleExpandProfile} />
      </div>
      {isProfileExpanded && (
        <div className="expanded-profile-view" onClick={toggleExpandProfile}>
          <img src={profilePhoto} alt="Profile" className="expanded-profile-image" />
          {/* Add additional content for the expanded profile view if needed */}
        </div>
      )}
    </div>
  );
}
export default HomePageApp;

