// src/NavLinks/NavLinks.js
import React, { useState, useRef, useEffect } from 'react';
import './NavLinks.css'; // Import component-specific styles
import Config from './Config'; // Import configuration data

const NavLinks = () => {
    // State to track which dropdown is open and if the menu is open
    const [openDropdown, setOpenDropdown] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Refs to access DOM elements
    const navRef = useRef(null); // Ref for the navigation container
    const menuRef = useRef(null); // Ref for the menu list
    const dropdownRefs = useRef({}); // Refs for each dropdown menu

    useEffect(() => {
        // Function to handle clicks outside the navigation menu
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                // Close dropdown and menu if click is outside
                setOpenDropdown(null);
                setMenuOpen(false);
            }
        };

        // Add event listener for clicks outside the menu
        document.addEventListener('mousedown', handleClickOutside);
        
        // Clean up event listener on component unmount
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []); // Empty dependency array means this effect runs only on mount and unmount

    useEffect(() => {
        if (menuRef.current) {
            // Calculate total height of dropdowns to adjust menu height
            const dropdownHeight = Object.values(dropdownRefs.current)
                .reduce((acc, el) => acc + (el?.scrollHeight || 0), 0);
            menuRef.current.style.maxHeight = menuOpen
                ? `${menuRef.current.scrollHeight + dropdownHeight}px`
                : '0px';
        }
    }, [menuOpen, openDropdown]); // Recalculate height when menuOpen or openDropdown changes

    // Toggle the menu visibility and close any open dropdown
    const handleToggleClick = () => {
        setMenuOpen(prev => {
            if (!prev) setOpenDropdown(null);
            return !prev;
        });
    };

    // Render individual menu items based on their type
    const renderItem = (item, index) => (
        item.type === 'link' ? (
            <li key={index}>
                <a href={item.href}>{item.label}</a>
            </li>
        ) : item.type === 'dropdown' && (
            <li key={index} className="NavLinks-dropdown">
                <a
                    href="#!"
                    onClick={() => setOpenDropdown(prev => prev === item.key ? null : item.key)}
                >
                    {item.label}
                    <svg
                        className={`NavLinks-arrow-icon ${openDropdown === item.key ? 'NavLinks-arrow-icon-open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path d="M12 15.59l-4.59-4.59L6 12l6 6 6-6-1.41-1.41L12 15.59z" fill="#fff" />
                    </svg>
                </a>
                <ul
                    className={`NavLinks-dropdown-menu ${openDropdown === item.key ? 'NavLinks-dropdown-menu-active' : ''}`}
                    ref={el => (dropdownRefs.current[item.key] = el)}
                >
                    {item.items
                        .sort((a, b) => a.position - b.position) // Sort dropdown items by position
                        .map((subItem, subIndex) => (
                            <li key={subIndex}><a href={subItem.href}>{subItem.label}</a></li>
                        ))}
                </ul>
            </li>
        )
    );

    return (
        <nav className="NavLinks-navbar" ref={navRef}>
            <button className="NavLinks-navbar-toggle" onClick={handleToggleClick}>☰</button>
            <ul className={`NavLinks-navbar-menu ${menuOpen ? 'NavLinks-navbar-menu-active' : ''}`} ref={menuRef}>
                {Config.items
                    .sort((a, b) => a.position - b.position) // Sort menu items by position
                    .map(renderItem)}
            </ul>
        </nav>
    );
};

export default NavLinks;
