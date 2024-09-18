import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { name: 'New Questions', path: '/input-question' },
    { name: 'Reports', path: '/reports' },
    { name: 'Classes', path: '/classes' },
    { name: 'Collections', path: '/collections' },
  ];

  return (
    <div className="w-64 bg-purple-100 text-purple-800 p-4 flex flex-col">
      {menuItems.map((item, index) => (
        <React.Fragment key={item.name}>
          <button
            onClick={() => navigate(item.path)}
            className={`text-left py-2 px-4 hover:bg-purple-200 transition-colors duration-200 ${
              index === 0 ? 'font-semibold border-b border-purple-300' : ''
            }`}
          >
            {item.name}
          </button>
          {index === 0 && <div className="border-b border-purple-300 my-2"></div>}
        </React.Fragment>
      ))}
      <button
        onClick={handleLogout}
        className="mt-6 py-2 px-4 bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
