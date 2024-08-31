import React, { useState, useEffect } from "react";
import useSessionChecking from "../hooks/useSessionChecking.js";
import Sidebar from "../components/sidebar.js";
import Navbar from "../components/navbar.js";
import ExamSchedule from "../components/Exam/getExamSchedule.js"
import axios from "axios";
import jwt from "jsonwebtoken";

const Dashboard: React.FC = () => {
  const [nama, setNama] = useState<string | null>(null); // State to store 'nama'

  useSessionChecking();

  useEffect(() => {
    const token = localStorage.getItem("token");  
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { niu?: number, id_kelas: string };
  
        if (decodedToken && decodedToken.niu && typeof decodedToken.niu === 'number') {
          const formatNiuToString = decodedToken.niu.toString();
          const userType = formatNiuToString.startsWith("1020") ? "siswa" : formatNiuToString.startsWith("1214") ? "guru" : "unknown";
  
          axios.get(`https://49kdgk28-7774.asse.devtunnels.ms/api/${userType}/${decodedToken.niu}`)
            .then((res) => {
              setNama(res.data.nama);
            })
            .catch((error) => {
              console.error("Error fetching data", error);
            });
        } else {
          console.error("Invalid token format or missing 'niu' field");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  
   // Empty array to run effect once on mount

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
