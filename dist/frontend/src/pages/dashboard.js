import React from 'react';
import useSessionChecking from '../hooks/useSessionChecking.js';
import Sidebar from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
import Teacher from './teacher.js';
const Dashboard = () => {
    useSessionChecking();
    return (React.createElement("main", { className: 'flex flex-col h-screen ' },
        React.createElement(Navbar, null),
        React.createElement("div", { className: 'flex flex-1 border-b-[52px] border-red-100' },
            React.createElement(Sidebar, null),
            React.createElement("section", { className: 'flex flex-1 flex-col p-4 justify-start items-start gap-12 ml-5' },
                React.createElement("div", { className: 'h-11 w-56 bg-purple-100 rounded-lg mt-auto text-center ' }, "Class Name"),
                React.createElement("div", { className: 'my-auto' },
                    React.createElement(Teacher, null))))));
};
export default Dashboard;
