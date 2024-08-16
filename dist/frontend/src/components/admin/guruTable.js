import React, { useEffect, useState } from 'react';
import axios from 'axios';
const GuruTable = () => {
    const [guru, setGuru] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:7772/api/guru')
            .then(response => {
            setGuru(response.data);
        })
            .catch(error => {
            console.error('There was an error fetching the guru data!', error);
        });
    }, []);
    const handleEdit = (id) => {
        // Logic for editing a guru
        console.log(`Edit guru with id: ${id}`);
    };
    const handleDelete = (id) => {
        // Logic for deleting a guru
        console.log(`Delete guru with id: ${id}`);
    };
    return (React.createElement("div", { className: "overflow-x-auto" },
        React.createElement("table", { className: "min-w-full bg-white" },
            React.createElement("thead", { className: "bg-gray-800 text-white" },
                React.createElement("tr", null,
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "NIG"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Nama"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Kode Guru"),
                    React.createElement("th", { className: "w-1/3 px-4 py-2" }, "Aksi"))),
            React.createElement("tbody", null, guru.map((g) => (React.createElement("tr", { key: g.nig, className: "text-center" },
                React.createElement("td", { className: "border px-4 py-2" }, g.nig),
                React.createElement("td", { className: "border px-4 py-2" }, g.nama),
                React.createElement("td", { className: "border px-4 py-2" }, g.kode_guru),
                React.createElement("td", { className: "border px-4 py-2" },
                    React.createElement("button", { onClick: () => handleEdit(g.nig), className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded" }, "Edit"),
                    React.createElement("button", { onClick: () => handleDelete(g.nig), className: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" }, "Delete")))))))));
};
export default GuruTable;
