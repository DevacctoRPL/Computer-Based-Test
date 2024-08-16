import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Siswa {
  nis: number;
  nama: string;
  sandi: string;
  id_kelas: string;
}

const SiswaTable: React.FC = () => {
  const [guru, setGuru] = useState<Siswa[]>([]);

  useEffect(() => {
    axios.get('http://localhost:7772/api/siswa')
      .then(response => {
        setGuru(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the SISWA data!', error);
      });
  }, []);

  const handleEdit = (nis: number) => {
    // Logic for editing a guru
    console.log(`Edit siswa with nis: ${nis}`);
  };

  const handleDelete = (nis: number) => {
    // Logic for deleting a siswa
    console.log(`Delete siswa with nis: ${nis}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">NIS</th>
            <th className="w-1/3 px-4 py-2">Nama</th>
            <th className="w-1/3 px-4 py-2">Sandi</th>
            <th className="w-1/3 px-4 py-2">Kelas</th>
            <th className="w-1/3 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guru.map((g) => (
            <tr key={g.nis} className="text-center">
              <td className="border px-4 py-2">{g.nis}</td>
              <td className="border px-4 py-2">{g.nama}</td>
              <td className="border px-4 py-2">{g.sandi}</td>
              <td className="border px-4 py-2">{g.id_kelas}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(g.nis)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.nis)}
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

export default SiswaTable;
