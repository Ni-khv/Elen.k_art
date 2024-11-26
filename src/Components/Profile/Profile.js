import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(currentUser));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>Личный кабинет</h2>
                <div className="profile-info">
                    <div className="info-group">
                        <label>Имя пользователя:</label>
                        <p>{user.username}</p>
                    </div>
                    <div className="info-group">
                        <label>Роль:</label>
                        <p>{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
                    </div>
                    {user.role === 'admin' && (
                        <button 
                            className="admin-button"
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            Панель администратора
                        </button>
                    )}
                    <button onClick={handleLogout} className="logout-button">
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
