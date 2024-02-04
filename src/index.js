import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App'; 
import './index.css'
import FirstScreen from './FirstScreen';
ReactDOM.render(
  <React.StrictMode>
    <FirstScreen /> {/* Render the main application component */}
    </React.StrictMode>,
  document.getElementById('root')
);
