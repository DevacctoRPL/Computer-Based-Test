import React from "react";
import Navbar from "../components/navbar.js";
const SoalSiswa = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "min-h-screen bg-slate-800 p-4" },
            React.createElement(Navbar, null),
            React.createElement("main", { className: "flex justify-between mt-6" },
                React.createElement("div", { className: "flex flex-col w-1/4 bg-purple-100 p-4 space-y-4" },
                    React.createElement("div", { className: "bg-purple-200 h-48" }),
                    React.createElement("div", { className: "bg-purple-200 h-48" })),
                React.createElement("div", { className: "flex flex-col w-1/2 bg-white p-4 space-y-4 h-[600px]" },
                    React.createElement("div", { className: "bg-purple-100 p-4 h-80" }, "INI SOAL BLA BLA BLA"),
                    React.createElement("div", { className: "flex flex-col space-y-2" }, Array(5).fill(null).map((_, index) => (React.createElement("div", { key: index, className: "flex items-center bg-purple-100 p-2" },
                        React.createElement("input", { type: "radio", name: "answer", id: `answer${index}`, className: "h-6 w-6 mr-4" }),
                        React.createElement("label", { htmlFor: `answer${index}`, className: "flex-grow bg-white border border-blue-500 h-10 flex items-center pl-2" },
                            "Answer ",
                            index + 1)))))),
                React.createElement("div", { className: "flex flex-col w-[282px] bg-purple-100 p-4 space-y-4" },
                    React.createElement("div", { className: "bg-purple-200 text-center py-2" }, "daftar soal"),
                    React.createElement("div", { className: "grid grid-cols-3 gap-2" }, Array(30).fill(null).map((_, index) => (React.createElement("button", { key: index, className: "bg-white border border-purple-300 h-10 w-10" }, index + 1)))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("button", { className: "bg-purple-200 p-2 rounded" }, "<"),
                        React.createElement("button", { className: "bg-purple-200 p-2 rounded" }, ">")))))));
};
export default SoalSiswa;
