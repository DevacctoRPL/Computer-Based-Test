import React from "react";

const Sidebar: React.FC = () => {
    return (
        <aside className="w-72 flex flex-col">
            <div className='flex justify-center items-center gap-5'>
                <div className='h-16 w-16 rounded-full bg-slate-400 '></div>
                <div className='h-11 w-1/2 rounded-xl bg-slate-600'></div>
            </div>
            <ul className="bg-pink-900 w-4/5 h-3/4 mx-auto flex flex-col my-auto">
                <li>New Questions</li>
                <li>Reports</li>
                <li>Classes</li>
                <li>Collections</li>
                <li className="mt-auto">Logout</li>
            </ul>
        </aside>
    )
}

export default Sidebar;