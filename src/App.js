// src/App.js
import React from 'react';
import CountDown from './components/CounterDown/CountDown'; // Import the CountDown component
import NavLinks from './components/NavLinks/NavLinks'; // Import the Navigation component

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <NavLinks />
        <div className='heading-container'>
          <h1>Website&nbsp;</h1>
          <h1>Coming Soon</h1>
        </div>
        <div className='text-content'>
          <p>Our website is almost here!&nbsp;</p>
          <p>Stay tuned for exciting updates!</p>
        </div>
        {/* Test component here*/}
        <CountDown />
      </main>
    </div>
  );
}

export default App; // Export the App component
