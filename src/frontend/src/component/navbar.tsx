import React from "react";

import Penus from "/assets/penus.png";

const Navbar: React.FC = () => {
    return (
        <nav className="w-screen fixed flex justify-between">
        <span className="bg-white rounded-full p-auto">
            <img src={Penus} alt="logo penus" className="w-10" />
        </span>
        <div>
            <div className="clippath bg-orange-500 w-[850px] h-14"></div>
        </div>
        </nav>
    )
}

export default Navbar;