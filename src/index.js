import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import FirstScreen from './FirstScreen.js';
import HomePageApp from './HomePage/HomePageApp.js';
import App from './App/App.js';
ReactDOM.render(
  <React.StrictMode>
    <FirstScreen /> {/* Render the main application component */}
    </React.StrictMode>,
  document.getElementById('root')
); 
