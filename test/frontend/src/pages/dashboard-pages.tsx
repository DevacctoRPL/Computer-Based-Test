import React, { useState, useEffect } from "react";
import useSessionChecking from "../hooks/useSessionChecking.js";
import Sidebar from "../components/sidebar.js";
import Navbar from "../components/navbar.js";
import ExamSchedule from "../components/Exam/getExamSchedule.js";
import SpinnerLoad from "../components/spinnerLoad.js"; // Import the loading component
import axios from "axios";
import jwt from "jsonwebtoken";

const Dashboard: React.FC = () => {
  const [nama, setNama] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useSessionChecking();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwt.decode(token) as { niu?: number, id_kelas: string };
    
          if (decodedToken && decodedToken.niu && typeof decodedToken.niu === 'number') {
            const formatNiuToString = decodedToken.niu.toString();
            const userType = formatNiuToString.startsWith("1020") ? "siswa" : formatNiuToString.startsWith("1214") ? "guru" : "unknown";
    
            const response = await axios.get(`https://49kdgk28-7772.asse.devtunnels.ms/api/${userType}/${decodedToken.niu}`);
            setNama(response.data.nama);
          } else {
            console.error("Invalid token format or missing 'niu' field");
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoad />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-purple-800">Welcome, {nama ? nama : "Student"}!</h1>
            <p className="text-gray-600 mt-2">Here's your exam information for today.</p>
          </div>
          <ExamSchedule />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;