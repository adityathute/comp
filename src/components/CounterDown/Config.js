// src/CountDownConfig.js

// 📜 Configuration file for app settings

// 📅 TARGET_DATE: Set the countdown end date and time.
// Format: 'YYYY-MM-DDTHH:MM:SS'
// Example: '2024-08-30T00:44:00' (August 30, 2024, at 00:44 AM)

// ⏳ SHOW_COUNTDOWN: Toggle countdown display.
// Set to true to show the countdown.
// Set to false to show the current time.

const CONFIG = {
    SHOW_COUNTDOWN: false, // Set to false to show current time instead
    TARGET_DATE: '2024-08-30T00:44:00' // Enter your target date and time here
};

export default CONFIG; // Export for use in App.js and other files
