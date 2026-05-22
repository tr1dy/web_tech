import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Пожалуйста, введите имя пользователя и пароль.');
      return;
    }
    
    // Simulate login success
    login(username);
    navigate('/');
  };

  if (user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Добро пожаловать, {user.username}!</h2>
          <p>Вы вошли в систему.</p>
          <button className="logout-btn" onClick={logout}>Выйти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Войти</h2>
        <p>Пожалуйста, введите свои данные для доступа к избранному.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль (любой)"
            />
          </div>
          <button type="submit" className="login-submit-btn">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
