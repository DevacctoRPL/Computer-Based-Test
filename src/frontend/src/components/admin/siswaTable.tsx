import React, { useState, useEffect } from "react";

interface Teacher {
  id: number;
  nama: string;
  panggilan: string;
  kelas: string;
}

const Teacher: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetch("http://localhost:7772/api/siswa")
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
        <div className="flex justify-center py-36">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-purple-100">
              <thead>
                <tr className="border border-black">
                  <th className="px-12 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">NO</th>
                  <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Nama Lengkap</th>
                  <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Jenis Kelamin</th>
                  <th className="px-9 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-1 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
                  <button className="absolute mx-6 px-6 border border-black">ADD</button>
                </tr>
              </thead>
              <br/>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td className="px-6 py-2 text-center border border-black text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-2 text-center border border-black text-sm text-black">{teacher.nama}</td>
                    <td className="px-6 py-2 text-center border border-black text-sm text-black">{teacher.panggilan}</td>
                    <td className="px-6 py-2 text-center border border-black text-sm text-black">{teacher.kelas}</td>
                    <td className="px-6 py-2 text-center border border-black text-sm text-black">
                      <button className="bg-purple-400 hover:bg-purple-500 px-4 py-0 rounded-md ">
                        Ubah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
};

export default Teacher;
