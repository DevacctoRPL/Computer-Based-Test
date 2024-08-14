import React from 'react';
import useSessionChecking from '../hooks/useSessionChecking.js';
const Dashboard = () => {
    useSessionChecking();
    return (React.createElement("div", { className: 'bg-black h-screen w-screen flex justify-center items-center flex-col' },
        React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "Welcome to the Dashboard"),
        React.createElement("p", { className: 'text-slate-300' }, "You are logged in!")));
};
export default Dashboard;
