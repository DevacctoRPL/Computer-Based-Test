import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = ({ isOpen, items }) => {
    const location = useLocation();
    return (React.createElement("div", { className: `${isOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 lg:block` },
        React.createElement("div", { className: "flex items-center justify-center mt-8" },
            React.createElement("div", { className: "flex items-center" },
                React.createElement("span", { className: "mx-2 text-2xl font-semibold text-white" }, "Admin Dashboard"))),
        React.createElement("nav", { className: "mt-10" }, items.map((item) => (React.createElement(Link, { key: item.name, to: item.href, className: `flex items-center px-6 py-2 mt-4 text-gray-100 ${location.pathname === item.href ? 'bg-gray-700 bg-opacity-25' : 'hover:bg-gray-700 hover:bg-opacity-25'}` },
            React.createElement("span", { className: "mx-3" }, item.name)))))));
};
export default Sidebar;
