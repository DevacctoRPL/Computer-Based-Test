// SoalSiswa.tsx (main component)
import React from "react";
import Navbar from "../components/navbar.js";
import DetailSiswa from "../components/Exam/detail_siswa.js";
import Soal from "../components/Exam/soal.js";
import DaftarSoal from "../components/Exam/daftar_soal.js";

const SoalSiswa: React.FC = () => {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <main className="flex justify-between mt-6 h-[85%]">
          <DetailSiswa />
          <Soal />
          <DaftarSoal />
        </main>
      </div>
    </>
  );
};

export default SoalSiswa;