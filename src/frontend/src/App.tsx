import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/login-pages.js';
import Dashboard from './pages/dashboard-pages.js';
import StudentsQuestions from './pages/Exam/studentExam-pages.js';
import Teacher from './pages/Teacher/teacher-pages.js';
import InputQuestion from './pages/Pre-Exam/QuestionMaker/questionInput-pages.js';
import AdminPages from './pages/admin/admin.js';
import GuruAdminPages from './pages/admin/guruPages.js';
import SiswaAdminPages from './pages/admin/siswaPages.js';
import PrivateRoute from './components/privateRoutes.js';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/soal" element={<StudentsQuestions />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/input-question" element={<InputQuestion />} />

      <Route path="/admin" element={<PrivateRoute element={<AdminPages />} />} />
      <Route path="/admin/guru" element={<PrivateRoute element={<GuruAdminPages />} />} />
      <Route path="/admin/siswa" element={<PrivateRoute element={<SiswaAdminPages />} />} />
    </Routes>
  );
}

export default App;
