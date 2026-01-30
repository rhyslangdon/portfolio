import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/rhyslangdon/portfolio', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/rhyslangdon', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com/rhyslangdon', label: 'Twitter' },
    { icon: FaEnvelope, url: 'mailto:rhyslangdon@hotmail.com', label: 'Email' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Rhys Langdon</h3>
            <p className="footer-description">
              Building digital experiences that matter. Let's create something amazing together.
            </p>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                  About
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Me!</h4>
            <div className="footer-contact">
              <p>rhyslangdon@hotmail.com</p>
              <p>(705)-349-1150</p>
              <p>Halifax NS, Canada</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>
              &copy; {currentYear} Rhys Langdon Web Portfolio. 
            </p>
            <button onClick={scrollToTop} className="back-to-top">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;