import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import SoalSiswa from './pages/pageSoalSiswa.js';

const App: React.FC = () => {
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

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Soal" element={<SoalSiswa />} />
    </Routes>
  );
}

export default App;
