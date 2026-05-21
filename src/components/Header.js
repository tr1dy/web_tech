import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaSearch, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FaUtensils /> RecipeApp
        </Link>
        <nav className="nav-links">
          <Link to="/"><FaUtensils /> Home</Link>
          <Link to="/search"><FaSearch /> Search</Link>
          <Link to="/favorites"><FaHeart /> Favorites</Link>
          {user ? (
            <Link to="/login" className="user-logged-in">
              <FaSignOutAlt /> Profile ({user.username})
            </Link>
          ) : (
            <Link to="/login"><FaUser /> Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
