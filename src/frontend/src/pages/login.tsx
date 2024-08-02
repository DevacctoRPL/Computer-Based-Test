import React from "react";

import User from "/assets/user.png";
import Padlock from "/assets/padlock.png";

const Login: React.FC = () => {

    return (
      <>
        <div className='bg-black h-screen w-screen flex justify-center items-center flex-col'>
        <h1 className='text-slate-300 text-[64px] mb-12'>USER LOGIN</h1>
        <form className='flex flex-col gap-12 w-1/3'>
          <div className='relative flex items-center justify-center'>
            <input type="text" placeholder="Username" className='h-14 p-2 rounded-full bg-[#242424] text-white text-center relative duration-700 w-full' />
            <span className='absolute -right-1 bg-slate-50 rounded-full'>
              <img src={User} className='w-12 h-12 m-2' alt='user' />
            </span>
          </div>
          <div className='relative flex justify-center items-center'>
            <input type="password" placeholder="Password" className='h-14 p-2 rounded-full bg-[#242424] text-white text-center relative duration-700 w-full' />
            <span className='absolute -left-1 bg-slate-50 rounded-full'>
              <img src={Padlock} className='w-12 h-12 m-2 ' alt='padlock' />
            </span>
          </div>
          <button type="submit" className='w-full self-center p-2 rounded-full bg-white text-center font-bold text-2xl'>Login</button>
        </form>
      </div>
      </>
    )
}

export default Login;