// HomePageApp.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
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
  const { username } = useParams(); // Get username from route parameters

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

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addPost = (newPost) => {
    // Use the username from route parameters when adding a new post
    const postWithUsername = { ...newPost, author: username };
    setPosts([postWithUsername, ...posts]);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Welcome, {username}!</h1>
      <Header />
      <div className="main-content">
        <div className="left-content">
          <Search darkMode={darkMode} />
          <Share onPost={addPost} darkMode={darkMode} />
          <PostsContainer
            posts={posts}
            onLike={handleLike}
            onDelete={deletePost}
            darkMode={darkMode}
            currentUser={username} // Pass currentUser to PostsContainer
          />
        </div>
        <Rightmenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}

export default HomePageApp;

