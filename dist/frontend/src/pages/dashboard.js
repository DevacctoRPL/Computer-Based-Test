import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt.decode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    alert('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
            catch (error) {
                console.error('Error decoding token:', error);
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);
    return (React.createElement(React.Fragment, null,
        React.createElement("main", { className: "h-dvh w-dvh" },
            React.createElement(Navbar, null),
            React.createElement("div", { className: 'flex h- bg-purple-200' },
                React.createElement("div", { className: "h-full" },
                    React.createElement(Sidebar, null)),
                React.createElement("div", { className: 'flex' },
                    React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "Welcome to the Dashboard"),
                    React.createElement("p", { className: 'text-slate-300' }, "You are logged in!"))))));
};
export default Dashboard;
