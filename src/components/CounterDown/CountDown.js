// src/components/CountDown.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CONFIG from './Config'; // 📜 Configuration file for constants
import './CountDown.css'; // Import component-specific styles

const CountDown = () => {
    // 🗓️ Memoized target date
    const targetDate = useMemo(() => new Date(CONFIG.TARGET_DATE), []);

    // ⏳ Calculate remaining time until the target date
    const calculateTimeLeft = useCallback(() => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        // Time constants for calculations
        const secondsInYear = 365 * 24 * 60 * 60 * 1000;
        const secondsInMonth = 30 * 24 * 60 * 60 * 1000;

        return {
            years: Math.floor(timeRemaining / secondsInYear),
            months: Math.floor((timeRemaining % secondsInYear) / secondsInMonth),
            days: Math.floor((timeRemaining % secondsInMonth) / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
        };
    }, [targetDate]);

    // State hooks for time left and mobile view detection
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 420);

    // Effect for resizing and updating time
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 460);

        window.addEventListener('resize', handleResize);

        const interval = setInterval(() => {
            if (CONFIG.SHOW_COUNTDOWN) {
                setTimeLeft(calculateTimeLeft());
            } else {
                setCurrentTime(new Date());
            }
        }, 1000);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, [calculateTimeLeft]);

    // Format current time for 12-hour clock display
    const formatTime = (date) => {
        const hours24 = date.getHours();
        const hours12 = hours24 % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours24 >= 12 ? 'PM' : 'AM';
        return { hours: hours12.toString().padStart(2, '0'), minutes, seconds, ampm };
    };

    // Get singular or plural label
    const getLabel = (value, unit) => value === 1 ? unit : `${unit}s`;

    // Determine display content based on configuration and time left
    const getDisplayContent = () => {
        if (CONFIG.SHOW_COUNTDOWN) {
            const { years, months, days, hours, minutes, seconds } = timeLeft;
            const components = [];

            // Add components based on remaining time
            if (years > 0) components.push({ value: years.toString().padStart(2, '0'), label: getLabel(years, 'Year') });
            if (months > 0 || years > 0) components.push({ value: months.toString().padStart(2, '0'), label: getLabel(months, 'Month') });
            if (days > 0 || months > 0 || years > 0) components.push({ value: days.toString().padStart(2, '0'), label: getLabel(days, 'Day') });
            if (hours > 0 || days > 0 || months > 0 || years > 0) components.push({ value: hours.toString().padStart(2, '0'), label: getLabel(hours, 'Hour') });
            if (minutes > 0 || hours > 0 || days > 0 || months > 0 || years > 0) components.push({ value: minutes.toString().padStart(2, '0'), label: getLabel(minutes, 'Minute') });
            if (!isMobile || years <= 0) components.push({ value: seconds.toString().padStart(2, '0'), label: getLabel(seconds, 'Second') });

            return { components };
        } else {
            // Format current time if countdown is not shown
            const { hours, minutes, seconds, ampm } = formatTime(currentTime);
            return {
                components: [
                    { value: hours },
                    { value: minutes },
                    { value: seconds },
                    { value: ampm },
                ],
            };
        }
    };

    // 📝 Get the content to display
    const displayContent = getDisplayContent();

    return (
        <div className="countdown">
            {displayContent.components.map((comp, index) => (
                <div className="countdown-item" key={index}>
                    <div className="countdown-number">{comp.value}</div>
                    <div className="countdown-label">{comp.label}</div>
                </div>
            ))}
        </div>
    );
}

export default CountDown; // Export the CountDown component
