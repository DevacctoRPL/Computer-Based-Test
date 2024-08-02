import React from "react";
import User from "/assets/user.png";
import Padlock from "/assets/padlock.png";
const Login = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'bg-black h-screen w-screen flex justify-center items-center flex-col' },
            React.createElement("h1", { className: 'text-slate-300 text-[64px] mb-12' }, "USER LOGIN"),
            React.createElement("form", { className: 'flex flex-col gap-12 w-1/3' },
                React.createElement("div", { className: 'relative flex items-center justify-center' },
                    React.createElement("input", { type: "text", placeholder: "Username", className: 'h-14 w-[530px] p-2 rounded-full bg-[#242424] text-white text-center relative duration-700' }),
                    React.createElement("span", { className: 'absolute right-4 bg-slate-50 rounded-full' },
                        React.createElement("img", { src: User, className: 'w-12 h-12 m-2', alt: 'user' }))),
                React.createElement("div", { className: 'relative flex justify-center items-center' },
                    React.createElement("input", { type: "password", placeholder: "Password", className: 'h-14 w-[530px] p-2 rounded-full bg-[#242424] text-white text-center relative duration-700' }),
                    React.createElement("span", { className: 'absolute left-4 bg-slate-50 rounded-full' },
                        React.createElement("img", { src: Padlock, className: 'w-12 h-12 m-2 ', alt: 'padlock' }))),
                React.createElement("button", { type: "submit", className: 'w-[530px] self-center p-2 rounded-full bg-white text-center font-bold text-2xl' }, "Login")))));
};
export default Login;
