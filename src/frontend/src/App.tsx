import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './pages/login-pages.js';
import Dashboard from './pages/dashboard-pages.js';
import SoalSiswa from './pages/student-pages.js';
import Teacher from './pages/teacher-pages.js';

import InputQuestion from './pages/questionInput-pages.js'

import AdminPages from './pages/admin/admin.js'
import GuruAdminPages from './pages/admin/guruPages.js';
import SiswaAdminPages from './pages/admin/siswaPages.js';

//TESTING CODE!
import InputQuestionTest from './test/inputSoalTest.js';

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
      <Route path="/soal" element={<SoalSiswa />} />
      <Route path="/teacher" element={<Teacher />} />

      <Route path="/" element={<Dashboard />} />

      {/* <Route path="/input-question" element={<InputQuestion />} /> */}
      <Route path="/input-question-test" element={<InputQuestionTest />} />

      <Route path="/admin" element={<AdminPages />} />
      <Route path="/admin/guru" element={<GuruAdminPages />} />
      <Route path="/admin/siswa" element={<SiswaAdminPages />} />
      
    </Routes>
  );
}

export default App;
