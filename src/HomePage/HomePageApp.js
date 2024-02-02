import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Share from './components/Share';
import Search from './components/Search';
import RightMenu from './components/Rightmenu';
import PostsContainer from './components/PostsContainer';
import './HomePageApp.css';

function HomePageApp() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('Posts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <div className="left-content">
          <Share />
          <Search />
          <PostsContainer posts={posts} />
        </div>
        <RightMenu />
      </div>
    </div>
  );
}

export default HomePageApp;




