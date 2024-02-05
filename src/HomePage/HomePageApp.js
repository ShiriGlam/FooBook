
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
    // Fetch initial posts from JSON file
    fetch('Posts.json')
      .then(response => response.json())
      .then(data => {
        // Create a deep copy of the data before setting it to state
        const copiedData = JSON.parse(JSON.stringify(data));
        setPosts(copiedData);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
   const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <div className="main-content">
        <div className="left-content">
          <Search darkMode={darkMode} /> {/* Pass darkMode to Search */}
          <Share onPost={addPost} darkMode={darkMode} />{/* Pass darkMode to Search */}
          <PostsContainer posts={posts} onLike={handleLike} onDelete={deletePost} darkMode={darkMode} />{/* Pass darkMode to Search */}
        </div>
        <Rightmenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Pass darkMode and toggleDarkMode to Rightmenu */}
      </div>
    </div>
  );
}

export default HomePageApp;
