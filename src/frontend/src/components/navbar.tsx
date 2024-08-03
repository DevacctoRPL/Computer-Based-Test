import React from "react";

import Penus from "/assets/penus.png";

const Navbar: React.FC = () => {
    return (
        <nav className="w-screen fixed flex flex-col justify-between  gap-5">
        <div className="flex justify-between border-b-[20px] my-3 border-orange-500 pb-3">
            <span className="bg-white rounded-full flex self-center ml-16 bottom-0">
                <img src={Penus} alt="logo penus" className="w-14" />
            </span>
            <div className="flex items-center justify-between relative w-screen">
                <div className="clippath bg-orange-500 w-1/2 h-16 absolute right-0 -top-3"></div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;