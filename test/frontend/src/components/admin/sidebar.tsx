import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  items: { name: string; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, items }) => {
  const location = useLocation();

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 lg:block`}>
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <span className="mx-2 text-2xl font-semibold text-white">Admin Dashboard</span>
        </div>
      </div>

      <nav className="mt-10">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-6 py-2 mt-4 text-gray-100 ${
              location.pathname === item.href ? 'bg-gray-700 bg-opacity-25' : 'hover:bg-gray-700 hover:bg-opacity-25'
            }`}
          >
            <span className="mx-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
