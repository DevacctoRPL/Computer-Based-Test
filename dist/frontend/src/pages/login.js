import React from 'react';
import LoginForm from '../components/loginForm.js';
const Login = () => {
    return (React.createElement("div", { className: 'bg-black h-screen w-screen flex justify-center items-center flex-col' },
        React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "USER LOGIN"),
        React.createElement(LoginForm, null)));
};
export default Login;
