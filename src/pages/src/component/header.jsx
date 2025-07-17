import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
            <img src="/logo.webp" className="logo" alt="Logo" />

            <div className="nav-links">
                <Link to="/" className="dec">Home</Link>
                <Link to="/about" className="dec">Crud</Link>
                <Link to="/contact" className="dec">Third</Link>
                <Link to="/todo" className="dec">ToDo</Link>
                <Link to="/calcu" className="dec">Calculator</Link>
                <Link to="/Quiz" className="dec">Quiz!</Link>
            </div>

            {/* Toggle Button */}
            <button onClick={toggleDarkMode} className="mode-toggle">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
};

export default Header;
