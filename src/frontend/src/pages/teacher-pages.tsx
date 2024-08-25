import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Guru {
  nig: number;
  nama: string;
  kode_guru: string;
}

const Teacher : React.FC = () => {
  const [guru, setGuru] = useState<Guru[]>([]);

  useEffect(() => {
    axios.get('https://49kdgk28-7774.asse.devtunnels.ms/api/guru')
      .then(response => {
        setGuru(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the guru data!', error);
      });
  }, []);

  const handleEdit = (id: number) => {
    // Logic for editing a guru
    console.log(`Edit guru with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Logic for deleting a guru
    console.log(`Delete guru with id: ${id}`);
  };
    return (

        <>
          <table>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-purple-100">
        <thead className="">
          <tr className="border border-black">
            <th className="px-12 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">NIG</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Nama Lengkap</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Kode Guru</th>
            <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
        {guru.map((g) => (
            <tr key={g.nig} className="text-center">
            <td className="px-6 py-2 border border-black text-sm font-medium text-gray-900">{g.nig}</td>
            <td className="px-6 py-2 border border-black text-sm text-black">{g.nama}</td>
            <td className="px-6 py-2 border border-black text-sm text-black">{g.kode_guru}</td>
            <td className="px-6 py-2 border border-black text-sm text-black">
            <button
                  onClick={() => handleEdit(g.nig)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.nig)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
          </table>
        </>
    )
}

export default Teacher;
