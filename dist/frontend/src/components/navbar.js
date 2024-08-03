import React from "react";
import Penus from "/assets/penus.png";
const Navbar = () => {
    return (React.createElement("nav", { className: "w-screen fixed flex flex-col justify-between  gap-5" },
        React.createElement("div", { className: "flex justify-between border-b-[20px] my-3 border-orange-500 pb-3" },
            React.createElement("span", { className: "bg-white rounded-full flex self-center ml-16 bottom-0" },
                React.createElement("img", { src: Penus, alt: "logo penus", className: "w-14" })),
            React.createElement("div", { className: "flex items-center justify-between relative w-screen" },
                React.createElement("div", { className: "clippath bg-orange-500 w-1/2 h-16 absolute right-0 -top-3" })))));
};
export default Navbar;
