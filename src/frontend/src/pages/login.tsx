import React from 'react';
import LoginForm from '../components/loginForm.js';

const Login: React.FC = () => {
    return (
        <div className='bg-black h-screen w-screen flex justify-center items-center flex-col'>
            <h1 className='text-slate-300 text-[64px] mb-12'>USER LOGIN</h1>
            <LoginForm />
        </div>
    );
}

export default Login;
