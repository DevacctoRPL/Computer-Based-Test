// components/DataSiswa.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DataSiswa {
  // Define the structure of your student data here
  // For example:
  id: number;
  name: string;
  // Add other fields as necessary
}

const DataSiswa: React.FC = () => {
  const [dataSiswa, setDataSiswa] = useState<DataSiswa | null>(null);

  useEffect(() => {
    const fetchDataSiswa = async () => {
      try {
        const response = await axios.get<DataSiswa>('https://49kdgk28-7774.asse.devtunnels.ms/api/siswa');
        setDataSiswa(response.data);
      } catch (error) {
        console.error('Error fetching data siswa:', error);
      }
    };

    fetchDataSiswa();
  }, []);

  return (
    <div id="data-siswa" className="flex flex-col w-1/5 p-4 space-y-4 fixed">
      <div className="bg-purple-100 rounded-lg h-[400px]">
        {dataSiswa && <pre>{JSON.stringify(dataSiswa, null, 2)}</pre>}
      </div>
      <div className="bg-purple-100 rounded-lg h-[220px]"></div>
    </div>
  );
};

export default DataSiswa;