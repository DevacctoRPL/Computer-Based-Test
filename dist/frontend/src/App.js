var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/login';
import Navbar from './component/navbar';
const App = () => {
    const [users, setUsers] = useState([]);
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios.get('https://49kdgk28-7772.asse.devtunnels.ms/api/siswa');
            console.log('Fetched data:', res.data); // Check the structure of the fetched data
            setUsers(res.data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    useEffect(() => {
        getData();
    }, []);
    return (
    // <div>
    //   {users.map(u => (
    //     <h4 key={u._id}>userName: {u.nama}</h4>
    //   ))}
    // </div>
    React.createElement(React.Fragment, null,
        React.createElement(Navbar, null),
        React.createElement(Login, null)));
};
export default App;
