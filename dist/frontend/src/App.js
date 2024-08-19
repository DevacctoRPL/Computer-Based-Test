import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import SoalSiswa from './pages/pageSoalSiswa.js';
import Teacher from './pages/teacher.js';
import InputQuestion from './pages/inputSoal.js';
import AdminPages from './pages/admin/admin.js';
import GuruAdminPages from './pages/admin/guruPages.js';
import SiswaAdminPages from './pages/admin/siswaPages.js';
const App = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
        React.createElement(Route, { path: "/soal", element: React.createElement(SoalSiswa, null) }),
        React.createElement(Route, { path: "/teacher", element: React.createElement(Teacher, null) }),
        React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) }),
        React.createElement(Route, { path: "/input-question", element: React.createElement(InputQuestion, null) }),
        React.createElement(Route, { path: "/admin", element: React.createElement(AdminPages, null) }),
        React.createElement(Route, { path: "/admin/guru", element: React.createElement(GuruAdminPages, null) }),
        React.createElement(Route, { path: "/admin/siswa", element: React.createElement(SiswaAdminPages, null) })));
};
export default App;
