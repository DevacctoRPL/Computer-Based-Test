import React from "react";
// import Navbar from "../components/navbar";
// import Table from "../components/table";
const Teacher = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("table", null,
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "min-w-full bg-purple-100" },
                    React.createElement("thead", { className: "" },
                        React.createElement("tr", { className: "border border-black" },
                            React.createElement("th", { className: "px-12 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "NO"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Nama Lengkap"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Jenis Kelamin"),
                            React.createElement("th", { className: "px-9 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Kelas"),
                            React.createElement("th", { className: "px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider" }, "Action"))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "px-6 py-2 border border-black text-sm font-medium text-gray-900" }, "1"),
                            React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" }),
                            React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" }),
                            React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" }),
                            React.createElement("td", { className: "px-6 py-2 border border-black text-sm text-black" },
                                React.createElement("button", { className: "bg-" }, "EDIT")))))))));
};
export default Teacher;
