import React, { useState, useEffect } from 'react';
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
          <Search darkMode={darkMode} />
          <Share onPost={addPost} darkMode={darkMode} />
         
          <PostsContainer posts={posts} onLike={handleLike} onDelete={deletePost} darkMode={darkMode} />
        
        </div>
        <Rightmenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}

export default HomePageApp;
