import React from 'react';

const Dashboard: React.FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <div>You need to login first.</div>;
  }

  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center flex-col'>
      <h1 className='text-slate-300 text-[64px] mb-12'>Welcome to the Dashboard</h1>
      <p className='text-slate-300'>You are logged in!</p>
    </div>
  );
}

export default Dashboard;
