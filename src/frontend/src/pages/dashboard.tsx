import React from 'react';
import useSessionChecking from '../hooks/useSessionChecking.js';
import Sidebar from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
import Teacher from './teacher.js';

import Sidebar from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
import Teacher from './teacher.js';

const Dashboard: React.FC = () => {
  useSessionChecking();

  return (
    <main className='flex flex-col h-screen '>
        <Navbar />
        <div className='flex flex-1 border-b-[52px] border-red-100'>
            <Sidebar />
            <section className='flex flex-1 flex-col p-4 justify-start items-start gap-12 ml-5'>
                <div className='h-11 w-56 bg-purple-100 rounded-lg mt-auto text-center '>
                    Class Name
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
