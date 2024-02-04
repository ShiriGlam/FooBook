// HomePage.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Share from './components/Share';
import Search from './components/Search';
import PostsContainer from './components/PostsContainer';
import Rightmenu from './components/Rightmenu';
import PostItem from './components/PostItem';
import './HomePageApp.css';

function HomePageApp() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
  }, []);

  const fetchPosts = () => {
    // Fetch posts data from Posts.json
    fetch('HomePage/Posts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <div className="main-content">
        <div className="left-content">
          <Search darkMode={darkMode} /> {/* Pass darkMode to Search */}
          <Share onPost={addPost} darkMode={darkMode} />{/* Pass darkMode to Search */}
          <PostsContainer posts={posts} darkMode={darkMode} />{/* Pass darkMode to Search */}
        </div>
        <Rightmenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Pass darkMode and toggleDarkMode to Rightmenu */}
      </div>
    </div>
  );
}

export default HomePageApp;
