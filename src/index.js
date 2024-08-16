// src/index.js

// Importing React and necessary libraries
import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import './App.css'; // Import global styles
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import performance logging

// 🎯 Render the App component into the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);

// Measure performance and log results
// Pass a function to log results (e.g., reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
