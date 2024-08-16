// src/NavLinks/Config.js
const navConfig = {
    items: [
      { href: '/', label: 'Home', position: 1, type: 'link' },
      { href: '/about', label: 'About', position: 2, type: 'link' },
      { href: '/contact', label: 'Contact', position: 5, type: 'link' },
      {
        position: 3, 
        type: 'dropdown', 
        label: 'Services', 
        key: 'services',
        items: [
          { href: '/services/web-development', label: 'Web Development', position: 1 },
          { href: '/services/software-development', label: 'Software Development', position: 2 },
          { href: '/services/mobile-application', label: 'Mobile Application', position: 3 },
          { href: '/services/graphic-design', label: 'Graphic Design', position: 4 },
          { href: '/services/digital-marketing', label: 'Digital Marketing', position: 5 },
        ]
      },
      {
        position: 4, 
        type: 'dropdown', 
        label: 'Policy', 
        key: 'policy',
        items: [
          { href: '/policy/privacy', label: 'Privacy Policy', position: 1 },
          { href: '/policy/terms', label: 'Terms of Service', position: 2 },
          { href: '/policy/disclaimer', label: 'Disclaimer', position: 3 },
        ]
      }
    ]
  };
  
  export default navConfig;
  