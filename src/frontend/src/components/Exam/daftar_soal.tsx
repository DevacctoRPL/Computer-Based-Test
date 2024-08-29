// components/DaftarSoal.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pertanyaan {
  id: number;
  nomor: number;
  // Tambahkan field lain jika diperlukan
}

const DaftarSoal: React.FC = () => {
  const [nomorSoal, setNomorSoal] = useState<number[]>([]);

  useEffect(() => {
    const fetchNomorSoal = async () => {
      try {
        const response = await axios.get<Pertanyaan[]>('https://49kdgk28-7774.asse.devtunnels.ms/api/pertanyaan');
        const nomor = response.data.map(pertanyaan => pertanyaan.nomor);
        setNomorSoal(nomor);
      } catch (error) {
        console.error('Error fetching nomor soal:', error);
      }
    };

    fetchNomorSoal();
  }, []);

  return (
    <div id="daftarSoal" className="flex flex-col w-1/6 bg-purple-100 p-4 space-y-4 my-4 fixed right-0 mr-4">
      <div className="bg-purple-200 text-center py-2">daftar soal</div>
      <div className="grid grid-cols-3 gap-2">
        {nomorSoal.map((nomor, index) => (
          <button key={index} className="bg-white border border-purple-300 h-10 w-10">
            {nomor}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button className="bg-purple-200 p-2 rounded">{"<"}</button>
        <button className="bg-purple-200 p-2 rounded">{">"}</button>
      </div>
    </div>
  );
};

export default DaftarSoal;