import { useEffect, useState } from 'react';
import axios from 'axios';

import Login from './pages/login.tsx';
import Navbar from './component/navbar.tsx';

interface User {
  _id: string;
  nama: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getData = async () => {
    try {
      const res = await axios.get<User[]>('https://49kdgk28-7772.asse.devtunnels.ms/api/siswa');
      console.log('Fetched data:', res.data); // Check the structure of the fetched data
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {users.map(u => (
        <h4 key={u._id}>userName: {u.nama}</h4>
      ))}
    </div>

    // <>
    // <Navbar />
    // <Login />
    // </>
  );
};

export default App;
