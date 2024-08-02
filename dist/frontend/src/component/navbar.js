import React from "react";
import Penus from "/assets/penus.png";
const Navbar = () => {
    return (React.createElement("nav", { className: "w-screen fixed flex justify-between" },
        React.createElement("span", { className: "bg-white rounded-full p-auto" },
            React.createElement("img", { src: Penus, alt: "logo penus", className: "w-10" })),
        React.createElement("div", null,
            React.createElement("div", { className: "clippath bg-orange-500 w-[850px] h-14" }))));
};
export default Navbar;
