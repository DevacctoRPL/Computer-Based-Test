import React from "react";
import SiswaTable from "../../components/admin/siswaTable.js";
import Sidebar from "../../components/admin/sidebar.js"; // Pastikan path sesuai
import useSessionChecking from "../../hooks/useSessionChecking.js";
const SiswaAdminPages = () => {
    useSessionChecking();
    return (React.createElement("div", { className: "flex h-screen bg-gray-100" },
        React.createElement(Sidebar, { isOpen: true, items: [
                { name: "Beranda", href: "/admin" },
                { name: "Guru", href: "/admin/guru" },
                { name: "Siswa", href: "/admin/siswa" },
                { name: "Mapel", href: "/admin/mapel" },
                { name: "Kelas", href: "/admin/kelas" },
                // Tambahkan item lain jika ada
            ] }),
        React.createElement("div", { className: "p-6" },
            React.createElement("h1", { className: "text-2xl font-bold mb-6" }, "Daftar Guru"),
            React.createElement(SiswaTable, null))));
};
export default SiswaAdminPages;