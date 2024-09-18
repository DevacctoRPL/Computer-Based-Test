import React from "react";
import {Sun, Moon} from "lucide-react"

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  darkMode,
  setDarkMode,
 }) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Welcome, Admin Panel!
      </h2>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full bg-gray-100 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export default Dashboard;
