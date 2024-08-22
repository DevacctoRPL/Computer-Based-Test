import React, { useState, useEffect } from 'react';
import useSessionChecking from '../hooks/useSessionChecking.js';
import Sidebar from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
import Teacher from './teacher-pages.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Dashboard: React.FC = () => {
  const [nama, setNama] = useState<string | null>(null); // State to store 'nama'

  useSessionChecking();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token) as { nis: string };
      axios.get(`https://49kdgk28-7772.asse.devtunnels.ms/api/siswa/${decodedToken.nis}`)
        .then((res) => {
          setNama(res.data.nama);  // Store 'nama' in state
        })
        .catch((error) => {
          console.error('Error fetching data', error);
        });
    }
  }, []);  // Empty array to run effect once on mount

  return (
    <main className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-1 border-b-[52px] border-red-100'>
        <Sidebar />
        <section className='flex flex-1 flex-col p-4 justify-start items-start gap-12 ml-5'>
          <div className='h-11 w-56 bg-purple-100 rounded-lg mt-auto text-center'>
            {nama ? nama : 'Loading...'} {/* Display 'nama' */}
          </div>
          <div className='my-auto'>
            <Teacher />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
