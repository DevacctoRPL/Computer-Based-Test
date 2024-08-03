import React from 'react';
const Dashboard = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return React.createElement("div", null, "You need to login first.");
    }
    return (React.createElement("div", { className: 'bg-black h-screen w-screen flex justify-center items-center flex-col' },
        React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "Welcome to the Dashboard"),
        React.createElement("p", { className: 'text-slate-300' }, "You are logged in!")));
};
export default Dashboard;
