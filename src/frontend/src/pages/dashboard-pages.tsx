import React, { useState, useEffect } from "react";
import useSessionChecking from "../hooks/useSessionChecking.js";
import Sidebar from "../components/sidebar.js";
import Navbar from "../components/navbar.js";
import ExamSchedule from "../components/Exam/getExamSchedule.js";
import ExamResults from "../components/Teacher/ExamResults/ExamResults.js"; // Import the new ExamResults component
import SpinnerLoad from "../components/spinnerLoad.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const Dashboard: React.FC = () => {
  const [nama, setNama] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<"guru" | "siswa" | "unknown">("unknown");

  useSessionChecking();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwt.decode(token) as { niu?: number, id_kelas: string };
    
          if (decodedToken && decodedToken.niu && typeof decodedToken.niu === 'number') {
            const formatNiuToString = decodedToken.niu.toString();
            const userTypeDetected = formatNiuToString.startsWith("1020") ? "siswa" : formatNiuToString.startsWith("1214") ? "guru" : "unknown";
            setUserType(userTypeDetected);
    
            const response = await axios.get(`https://49kdgk28-7772.asse.devtunnels.ms/api/${userTypeDetected}/${decodedToken.niu}`);
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
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-purple-800">Welcome, {nama ? nama : "Unknown"}!</h1>
            <p className="text-gray-600 mt-2">
              {userType === "guru" ? "Here's the exam results for today." : "Here's your exam information for today."}
            </p>
          </div>
          {userType === "guru" ? <ExamResults /> : <ExamSchedule />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;