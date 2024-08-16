import React from "react";

const Sidebar: React.FC = () => {
    return (
        <aside className="w-72 flex flex-col h-full justify-center items-center gap-12 max-w-72">
            <div className='flex justify-center items-center gap-5 w-full'>
                <div className='h-16 w-16 rounded-full bg-purple-100 '></div>
                <div className='h-11 w-1/2 rounded-lg bg-purple-100'></div>
            </div>
            <ul className="bg-purple-100 w-4/5 h-3/4 mx-auto flex flex-col rounded-xl p-3">
                <li className="border-b-2 border-black p-2">New Questions</li>
                <li className="p-2">Reports</li>
                <li className="p-2">Classes</li>
                <li className="p-2">Collections</li>
                <li className="mt-auto p-2">Logout</li>
            </ul>
        </aside>
    )
}

export default Sidebar;