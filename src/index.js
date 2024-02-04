import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App'; 
import './index.css'
import FirstScreen from './FirstScreen';
import HomePageApp from './HomePage/HomePageApp';
ReactDOM.render(
  <React.StrictMode>
    <HomePageApp /> {/* Render the main application component */}
    </React.StrictMode>,
  document.getElementById('root')
); 
