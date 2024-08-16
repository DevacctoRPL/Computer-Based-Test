import React, { useEffect, useState } from 'react';
import axios from 'axios';
const SiswaTable = () => {
    const [guru, setGuru] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:7772/api/siswa')
            .then(response => {
            setGuru(response.data);
        })
            .catch(error => {
            console.error('There was an error fetching the SISWA data!', error);
        });
    }, []);
    const handleEdit = (nis) => {
        // Logic for editing a guru
        console.log(`Edit siswa with nis: ${nis}`);
    };
    const handleDelete = (nis) => {
        // Logic for deleting a siswa
        console.log(`Delete siswa with nis: ${nis}`);
    };
    return (React.createElement("div", { className: "overflow-x-auto" },
        React.createElement("table", { className: "min-w-full bg-white" },
            React.createElement("thead", { className: "bg-gray-800 text-white" },
                React.createElement("tr", null,
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "NIS"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Nama"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Sandi"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Kelas"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Aksi"))),
            React.createElement("tbody", null, guru.map((g) => (React.createElement("tr", { key: g.nis, className: "text-center" },
                React.createElement("td", { className: "border px-4 py-2" }, g.nis),
                React.createElement("td", { className: "border px-4 py-2" }, g.nama),
                React.createElement("td", { className: "border px-4 py-2" }, g.sandi),
                React.createElement("td", { className: "border px-4 py-2" }, g.id_kelas),
                React.createElement("td", { className: "border px-4 py-2" },
                    React.createElement("button", { onClick: () => handleEdit(g.nis), className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded" }, "Edit"),
                    React.createElement("button", { onClick: () => handleDelete(g.nis), className: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" }, "Delete")))))))));
};
export default SiswaTable;
