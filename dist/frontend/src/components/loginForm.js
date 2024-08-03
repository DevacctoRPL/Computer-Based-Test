var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
// Import assets
import User from "/assets/user.png";
import Padlock from "/assets/padlock.png";
const LoginForm = () => {
    const [nis, setNis] = useState('');
    const [sandi, setSandi] = useState('');
    const { isAuthenticated, loading, error, login } = useAuth();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log('button clicked!');
        yield login(Number(nis), sandi);
    });
    return (React.createElement("form", { className: 'flex flex-col gap-12 w-1/3', onSubmit: handleSubmit },
        React.createElement("div", { className: 'relative flex items-center justify-center' },
            React.createElement("input", { type: "number", placeholder: "NIS", value: nis, onChange: (e) => setNis(e.target.value), className: 'h-14 p-2 rounded-full bg-[#242424] text-white text-center relative duration-700 w-full', required: true }),
            React.createElement("span", { className: 'absolute -right-1 bg-slate-50 rounded-full' },
                React.createElement("img", { src: User, className: 'w-12 h-12 m-2', alt: 'user' }))),
        React.createElement("div", { className: 'relative flex justify-center items-center' },
            React.createElement("input", { type: "password", placeholder: "Password", value: sandi, onChange: (e) => setSandi(e.target.value), className: 'h-14 p-2 rounded-full bg-[#242424] text-white text-center relative duration-700 w-full', required: true }),
            React.createElement("span", { className: 'absolute -left-1 bg-slate-50 rounded-full' },
                React.createElement("img", { src: Padlock, className: 'w-12 h-12 m-2 ', alt: 'padlock' }))),
        React.createElement("button", { type: "submit", className: 'w-full self-center p-2 rounded-full bg-white text-center font-bold text-2xl', disabled: loading }, loading ? 'Logging in...' : 'Login'),
        error && React.createElement("p", { style: { color: 'red' } }, error),
        isAuthenticated && React.createElement("p", null, "Login successful!")));
};
export default LoginForm;
