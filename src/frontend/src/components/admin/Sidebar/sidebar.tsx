import React from "react";
import { Home, FileText, Settings, LogOut } from "lucide-react";
import theAsync from "../../../public/assets/theAsync.png";

interface SidebarProps {
  darkMode: boolean;
  setActiveComponent: (component: string) => void; // Menambahkan props untuk event handler
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, setActiveComponent }) => {
  return (
    <aside className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <div className="p-5">
        <div className="flex items-center justify-center mb-6">
          <img src={theAsync} alt="Logo" className="w-12 h-12 mr-2 rounded-full" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {["Dashboard", "Exam", "Features"].map((item, index) => (
              <li key={item}>
                <button
                  onClick={() => setActiveComponent(item.toLowerCase())} // Mengubah konten aktif
                  className={`flex items-center p-2 rounded hover:bg-purple-100 ${
                    darkMode ? "dark:hover:bg-purple-900" : "hover:bg-purple-600"
                  } dark:hover:text-white`}
                >
                  {index === 0 && <Home className="mr-2" />}
                  {index === 1 && <FileText className="mr-2" />}
                  {index === 2 && <Settings className="mr-2" />}
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto p-5">
        <button className="w-full bg-purple-600 text-white p-2 rounded flex items-center justify-center">
          <LogOut className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
