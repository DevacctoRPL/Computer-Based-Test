import React from 'react';
import LoginForm from '../components/loginForm.js';
const Login = () => {
    return (React.createElement("div", { className: 'bg-gradient-to-t from-[#280A46] from-25% via-[#3D1367] via-80% to-[#511C86] h-screen w-screen flex justify-center items-center flex-col relative' },
        React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "USER LOGIN"),
        React.createElement(LoginForm, null)));
};
export default Login;
