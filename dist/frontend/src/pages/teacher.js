import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Teacher = () => {
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
    return (React.createElement(React.Fragment, null,
        React.createElement("table", null,
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "min-w-full bg-purple-100" },
                    React.createElement("thead", { className: "" },
                        React.createElement("tr", { className: "border border-black" },
                            React.createElement("th", { className: "px-12 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "NIG"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Nama Lengkap"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Kode Guru"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Action"))),
                    React.createElement("tbody", null, guru.map((g) => (React.createElement("tr", { key: g.nig, className: "text-center" },
                        React.createElement("td", { className: "px-6 py-2 border border-black text-sm font-medium text-gray-900" }, g.nig),
                        React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" }, g.nama),
                        React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" }, g.kode_guru),
                        React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" },
                            React.createElement("button", { onClick: () => handleEdit(g.nig), className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded" }, "Edit"),
                            React.createElement("button", { onClick: () => handleDelete(g.nig), className: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" }, "Delete")))))))))));
};
export default Teacher;
