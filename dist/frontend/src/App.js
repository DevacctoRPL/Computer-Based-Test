import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import SoalSiswa from './pages/pageSoalSiswa.js';
const App = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
        // else {
        //   navigate('/login')
        // }
    }, [navigate]);
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) }),
        React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
        React.createElement(Route, { path: "/Soal", element: React.createElement(SoalSiswa, null) })));
};
export default App;
