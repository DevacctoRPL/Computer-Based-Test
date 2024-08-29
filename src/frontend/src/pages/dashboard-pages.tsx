import React, { useState, useEffect } from "react";
import useSessionChecking from "../hooks/useSessionChecking.js";
import Sidebar from "../components/sidebar.js";
import Navbar from "../components/navbar.js";
// import Teacher from "./teacher-pages.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import Teacher from "../components/admin/siswaTable.js";

const Dashboard: React.FC = () => {
  const [nama, setNama] = useState<string | null>(null); // State to store 'nama'

  useSessionChecking();

  useEffect(() => {
    const token = localStorage.getItem("token");  
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { niu?: number };
  
        if (decodedToken && decodedToken.niu && typeof decodedToken.niu === 'number') {
          const formatNiuToString = decodedToken.niu.toString();

          let userType: string;
          if (formatNiuToString.startsWith("1020")) {
            userType = "siswa";
          } else if (formatNiuToString.startsWith("1214")) {
            userType = "guru";
          } else {
            userType = "unknown";
          }
  
          axios
            .get(
              `https://49kdgk28-7774.asse.devtunnels.ms/api/${userType}/${decodedToken.niu}`
            )
            .then((res) => {
              setNama(res.data.nama); // Store 'nama' in state
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
    <main className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 border-b-[52px] border-red-100">
        <Sidebar />
        <section className="flex flex-1 flex-col p-4 justify-start items-start gap-12 ml-5">
          <div className="h-11 w-56 bg-purple-100 rounded-lg mt-auto text-center absolute py-14">
            {nama ? nama : "Loading..."} {/* Display 'nama' */}
          </div>
          {/* <div className="my-auto">
        <Teacher/>
          </div> */}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
