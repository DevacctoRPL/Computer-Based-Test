import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Guru {
  nig: number;
  nama: string;
  kode_guru: string;
}

const GuruTable: React.FC = () => {
  const [guru, setGuru] = useState<Guru[]>([]);

  useEffect(() => {
    axios.get('https://49kdgk28-7772.asse.devtunnels.ms/api/guru')
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">NIG</th>
            <th className="w-1/3 px-4 py-2">Nama</th>
            <th className="w-1/3 px-4 py-2">Kode Guru</th>
            <th className="w-1/3 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guru.map((g) => (
            <tr key={g.nig} className="text-center">
              <td className="border px-4 py-2">{g.nig}</td>
              <td className="border px-4 py-2">{g.nama}</td>
              <td className="border px-4 py-2">{g.kode_guru}</td>
              <td className="border px-4 py-2">
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
  );
};

export default GuruTable;
