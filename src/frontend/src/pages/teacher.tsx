import React from "react";
// import Navbar from "../components/navbar";
// import Table from "../components/table";

const Teacher : React.FC = () => {
    return (

        <>
          <table>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-purple-100">
        <thead className="">
          <tr className="border border-black">
            <th className="px-12 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">NO</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Nama Lengkap</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Jenis Kelamin</th>
            <th className="px-9 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Kelas</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-2 border border-black text-sm font-medium text-gray-900">1</td>
            <td className="px-6 py-2 border border-black text-sm text-black"></td>
            <td className="px-6 py-2 border border-black text-sm text-black"></td>
            <td className="px-6 py-2 border border-black text-sm text-black"></td>
            <td className="px-6 py-2 border border-black text-sm text-black">
              <button className="bg-">
                EDIT
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
          </table>
        </>
    )
}

export default Teacher;