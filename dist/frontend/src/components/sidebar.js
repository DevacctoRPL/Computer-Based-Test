import React from "react";
const Sidebar = () => {
    return (React.createElement("aside", { className: "w-72 flex flex-col h-full justify-center items-center gap-12 max-w-72" },
        React.createElement("div", { className: 'flex justify-center items-center gap-5 w-full' },
            React.createElement("div", { className: 'h-16 w-16 rounded-full bg-purple-100 ' }),
            React.createElement("div", { className: 'h-11 w-1/2 rounded-lg bg-purple-100' })),
        React.createElement("ul", { className: "bg-purple-100 w-4/5 h-3/4 mx-auto flex flex-col rounded-xl p-3" },
            React.createElement("li", { className: "border-b-2 border-black p-2" }, "New Questions"),
            React.createElement("li", { className: "p-2" }, "Reports"),
            React.createElement("li", { className: "p-2" }, "Classes"),
            React.createElement("li", { className: "p-2" }, "Collections"),
            React.createElement("li", { className: "mt-auto p-2" }, "Logout"))));
};
export default Sidebar;
