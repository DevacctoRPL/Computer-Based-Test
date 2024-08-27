import React from "react";
import Teacher from "../components/admin/siswaTable";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const pageTeacher : React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className="flex">
    <Sidebar/>
    <Teacher/>
    </div>
    </>
  )
}

export default pageTeacher