// Search.js

import React from 'react';
import './Search.css';

function Search({ darkMode }) {
  return (
    <div className={`search ${darkMode ? 'dark-mode' : ''}`}>
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </div>
  );
}

export default Search;
