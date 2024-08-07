import React from "react";
import Penus from "/assets/penus.png";
const Navbar = () => {
    return (React.createElement("nav", { className: "w-screen flex flex-col justify-between bg-transparent" },
        React.createElement("div", { className: "flex justify-between border-b-2" },
            React.createElement("span", { className: "bg-white rounded-full w-14 h-14 place-self-center ml-11" },
                React.createElement("img", { src: Penus, alt: "logo penus", className: "w-full" })),
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", { className: "clippath bg-orange-500 w-[800px] h-16 " }))),
        React.createElement("div", { className: "w-full h-12 bg-orange-300 mt-3" })));
};
export default Navbar;
