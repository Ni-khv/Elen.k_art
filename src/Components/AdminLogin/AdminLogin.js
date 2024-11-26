import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin({ setIsAdmin, setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Получаем список пользователей
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Добавляем админа, если его нет в списке
        if (!users.some(u => u.username === 'admin')) {
            users.push({ 
                username: 'admin', 
                password: 'admin123', 
                role: 'admin',
                email: 'admin@example.com'
            });
            localStorage.setItem('users', JSON.stringify(users));
        }

        const user = users.find(u => 
            u.username === formData.username && 
            u.password === formData.password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                role: user.role,
                email: user.email
            }));
            
            setIsAuthenticated(true);
            setIsAdmin(user.role === 'admin');
            
            if (user.role === 'admin') {
                navigate('/admin/add-product');
            } else {
                navigate('/profile');
            }
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Вход в систему</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя пользователя:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Войти</button>
                </form>
                <div className="register-link">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;