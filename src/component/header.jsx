import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';
import { useAuth0 } from '@auth0/auth0-react';
const Header = () => {
        const{logout: auth0Logout, user } = useAuth0();
    
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
        const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

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
            <button onClick={logout}>Logout</button>
            <button onClick={toggleDarkMode} className="mode-toggle">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
};

export default Header;
