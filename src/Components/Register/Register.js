import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        
        // Проверка паролей
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        // Проверка длины пароля
        if (formData.password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            return;
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Введите корректный email адрес');
            return;
        }

        // Получаем существующих пользователей
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

        // Проверяем, не занято ли имя пользователя
        if (existingUsers.some(user => user.username === formData.username)) {
            setError('Это имя пользователя уже занято');
            return;
        }

        // Проверяем, не занят ли email
        if (existingUsers.some(user => user.email === formData.email)) {
            setError('Этот email уже зарегистрирован');
            return;
        }

        // Создаем нового пользователя
        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        // Добавляем пользователя в хранилище
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Показываем сообщение об успехе
        setSuccess('Регистрация успешна! Сейчас вы будете перенаправлены на страницу входа...');
        
        // Перенаправляем на страницу входа через 2 секунды
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Регистрация</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя пользователя:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            minLength="3"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label>Подтвердите пароль:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <div className="login-link">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
