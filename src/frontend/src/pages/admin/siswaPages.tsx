import React from "react";
import SiswaTable from "../../components/admin/siswaTable.js";
import Sidebar from "../../components/admin/sidebar.js"; // Pastikan path sesuai

const SiswaAdminPages: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={true}
        items={[
          { name: "Beranda", href: "/admin" },
          { name: "Guru", href: "/admin/guru" },
          { name: "Siswa", href: "/admin/siswa" },
          { name: "Mapel", href: "/admin/mapel" },
          { name: "Kelas", href: "/admin/kelas" },
          // Tambahkan item lain jika ada
        ]}
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Daftar Guru</h1>
        <SiswaTable />
      </div>
    </div>
  );
};

export default SiswaAdminPages;
