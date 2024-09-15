import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface studentDetails {
  nis: string;
  nama: string;
  panggilan: string;
  sandi: string;
  is_lulus: number;
  is_switch_tab: null | boolean;
  id_kelas: string;
}

const studentDetails: React.FC = () => {
  const [dataSiswa, setDataSiswa] = useState<studentDetails | null>(null);

  useEffect(() => {
    const fetchDataSiswa = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken: any = jwt.decode(token);
          const niu = decodedToken?.niu;
          if (niu) {
            const response = await axios.get<studentDetails>(`https://49kdgk28-7772.asse.devtunnels.ms/api/siswa/${niu}`);
            setDataSiswa(response.data);
          } else {
            console.error('NIU tidak ditemukan dalam token.');
          }
        } else {
          console.error('Token tidak ditemukan di localStorage.');
        }
      } catch (error) {
        console.error('Error fetching data siswa:', error);
      }
    };

    fetchDataSiswa();
  }, []);

  return (
    <div id="data-siswa" className="w-1/5 p-4 space-y-4 fixed left-0 top-16 bottom-0 overflow-y-auto bg-purple-50">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Data Siswa</h2>
        {dataSiswa ? (
          <div className="space-y-3">
            <InfoItem label="NIS" value={dataSiswa.nis} />
            <InfoItem label="Nama" value={dataSiswa.nama} />
            <InfoItem label="Panggilan" value={dataSiswa.panggilan} />
            <InfoItem label="Kelas" value={dataSiswa.id_kelas} />
            <InfoItem label="Status Kelulusan" value={dataSiswa.is_lulus ? 'Lulus' : 'Belum Lulus'} />
          </div>
        ) : (
          <p className="text-gray-500">Memuat data siswa...</p>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 h-[220px]">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">Informasi Tambahan</h3>
        <p className="text-gray-600">Tempat untuk informasi tambahan atau petunjuk ujian.</p>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-purple-100 py-2">
    <span className="font-medium text-purple-700">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default studentDetails;