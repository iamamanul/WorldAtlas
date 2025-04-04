import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <NavLink to="/" className="nav-logo">
                    <span className="logo-icon">🌎</span>
                    <span className="logo-text">WorldAtlas</span>
                </NavLink>

                <button 
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </NavLink>
                    <NavLink 
                        to="/country" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Countries
                    </NavLink>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}; 