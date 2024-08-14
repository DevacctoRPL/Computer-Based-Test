import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';

import InputQuestion from './pages/inputSoal.js'

import AdminPages from './pages/admin/admin.js'
import GuruAdminPages from './pages/admin/guruPages.js';
import SiswaAdminPages from './pages/admin/siswaPages.js';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Dashboard />} />

      <Route path="/input-question" element={<InputQuestion />} />

      <Route path="/admin" element={<AdminPages />} />
      <Route path="/admin/guru" element={<GuruAdminPages />} />
      <Route path="/admin/siswa" element={<SiswaAdminPages />} />
    </Routes>
  );
}

export default App;
