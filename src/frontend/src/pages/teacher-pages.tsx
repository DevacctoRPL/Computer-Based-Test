import React from "react";
import Teacher from "../components/admin/siswaTable.js";
import Navbar from "../components/navbar.js";
import Sidebar from "../components/sidebar.js";

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