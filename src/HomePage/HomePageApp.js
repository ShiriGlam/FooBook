import React, { useState } from 'react';
import Header from './components/Header';
import Share from './components/Share';
import Search from './components/Search';
import PostsContainer from './components/PostsContainer';
import Rightmenu from './components/Rightmenu';
import './HomePageApp.css';
import PostsData from './Posts.json';

function HomePageApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState(PostsData);
  const currentUser = "Your Username"; // Set the current user here

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
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
            currentUser={currentUser}
          />
        </div>
        <Rightmenu darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

export default HomePageApp;
