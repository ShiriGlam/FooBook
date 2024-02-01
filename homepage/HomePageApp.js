
import PostsContainer from './components/PostsContainer';
import Share from './components/Share';
import Search from './components/Search';
import RightMenu from './components/Rightmenu';
import Header from './components/Header';
import React from 'react';
import PostsContainer from './components/PostsContainer';

function HomePageApp() {
 return(
  <div class="container">
  <Header />
      <Search />
      <Share />
      <PostsContainer />
      <RightMenu />
    </div>
 );
}

export default HomePageApp;
