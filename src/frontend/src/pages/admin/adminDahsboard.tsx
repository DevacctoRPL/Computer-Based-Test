import React,{ useState } from "react";
import Sidebar from "../../components/admin/Sidebar/sidebar.js";
import FeaturesContent from "../../components/admin/Features/features.js";
import DashboardContent from "../../components/admin/Dashboard/dashboard.js";
import ExamContent from "../../components/admin/Exam/exam.js";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [panelAdmin, setPanelAdmin] = useState({
    HiddenScore: true,
    AntiResize: true,
    AntiSwitchingTab: true,
  });

  // State to manage the active component (dashboard, features, exam)
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // const toggleFeature = (feature: keyof typeof panelAdmin) => {
  //   setPanelAdmin((prev) => {
  //     const newState = { ...prev, [feature]: !prev[feature] };
  //     console.log(`Feature "${feature}" toggled:`, newState[feature]); // Debug log
  //     return newState;
  //   });
  // };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <DashboardContent 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
      case "features":
        return (
          <FeaturesContent
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            // features={panelAdmin}
            // toggleFeature={toggleFeature}
          />
        );
      case "exam":
        return <ExamContent/>;
      default:
        return (
          <DashboardContent
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar darkMode={darkMode} setActiveComponent={setActiveComponent} />
      <main className="flex-1 p-8">{renderActiveComponent()}</main>
    </div>
  );
};

export default AdminDashboard;
