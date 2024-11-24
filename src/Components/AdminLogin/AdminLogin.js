import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // В реальном приложении здесь должна быть безопасная проверка через API
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      onLogin(true);
      navigate('/admin/add-product');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="admin-login">
      <h2>Вход для администратора</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default AdminLogin;