import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { exp: number };
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center flex-col'>
      <h1 className='text-slate-300 text-[64px] mb-12'>Welcome to the Dashboard</h1>
      <p className='text-slate-300'>You are logged in!</p>
    </div>
  );
};

export default Dashboard;
