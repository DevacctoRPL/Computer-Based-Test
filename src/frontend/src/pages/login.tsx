import React from 'react';
import LoginForm from '../components/loginForm.js';
import forceDirect from '../utils/directLogin.js';

const Login: React.FC = () => {
    forceDirect()
    return (
        <div className='bg-gradient-to-t from-[#280A46] from-25% via-[#3D1367] via-80% to-[#511C86] h-screen w-screen flex justify-center items-center flex-col relative'>
            {/* <div className="flex items-center justify-between w-screen absolute top-0">
                <div className="clippath bg-orange-500 w-1/2 h-16 transform scale-y-100 -scale-x-100"></div>
            </div> */}
            <h1 className='text-slate-300 text-[64px] mb-12'>USER LOGIN</h1>
            <LoginForm />
            {/* <div className="flex items-center justify-between w-screen absolute bottom-8">
                <div className="clippath bg-orange-500 w-1/2 h-16 transform -scale-y-100 absolute right-0"></div>
            </div> */}  
        </div>
    );
}

export default Login;
