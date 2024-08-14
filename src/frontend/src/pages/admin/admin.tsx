import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/admin/sidebar.js'; // Pastikan path sesuai
// import GuruAdminPages from './guruPages.js';
// import SiswaAdminPages from './siswaPages.js';

const AdminPages: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={true} items={[
        { name: 'Beranda', href: '/admin' },
        { name: 'Guru', href: '/admin/guru' },
        { name: 'Siswa', href: '/admin/siswa' },
        { name: 'Mapel', href: '/admin/mapel' },
        { name: 'Kelas', href: '/admin/kelas' },
        // Tambahkan item lain jika ada
      ]} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-gray-900">
          <div className="flex items-center">
            {/* Button for toggling sidebar */}
          </div>

          <div className="flex items-center">
            <div className="relative">
              <span className="text-gray-800 text-sm">Admin Name</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            WOI
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPages;
