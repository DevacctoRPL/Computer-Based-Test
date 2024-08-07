import React from "react";
const Sidebar = () => {
    return (React.createElement("aside", { className: "w-72 flex flex-col" },
        React.createElement("div", { className: 'flex justify-center items-center gap-5' },
            React.createElement("div", { className: 'h-16 w-16 rounded-full bg-slate-400 ' }),
            React.createElement("div", { className: 'h-11 w-1/2 rounded-xl bg-slate-600' })),
        React.createElement("ul", { className: "bg-pink-900 w-4/5 h-3/4 mx-auto flex flex-col my-auto" },
            React.createElement("li", null, "New Questions"),
            React.createElement("li", null, "Reports"),
            React.createElement("li", null, "Classes"),
            React.createElement("li", null, "Collections"),
            React.createElement("li", { className: "mt-auto" }, "Logout"))));
};
export default Sidebar;
