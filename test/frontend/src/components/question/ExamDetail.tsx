import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

interface ExamDetail {
  judul_soal: string;
  jumlah_soal: number;
  durasi: string; // Durasi dalam format HH:mm:ss
  tanggal_pelaksanaan: string; // Format yyyy-MM-dd
  waktu_dimulai: string; // Format yyyy-MM-ddTHH:mm:ss
  waktu_berakhir: string; // Format yyyy-MM-ddTHH:mm:ss
  id_mapel: string;
  nig_guru: string;
  id_ujian: string;
  id_kelas: string;
}

interface Option {
  value: string;
  label: string;
}

interface DecodedJWT {
  niu: string;
}

const ExamDetails: React.FC<{ onComplete: (isComplete: boolean) => void }> = ({
  onComplete,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [examDetails, setExamDetails] = useState<ExamDetail>({
    judul_soal: "",
    jumlah_soal: 0,
    durasi: "00:00:00", // Default durasi dalam format HH:mm:ss
    tanggal_pelaksanaan: new Date().toISOString().split('T')[0], // Format yyyy-MM-dd
    waktu_dimulai: new Date().toISOString().slice(0, 16), // Format yyyy-MM-ddTHH:mm
    waktu_berakhir: new Date().toISOString().slice(0, 16), // Format yyyy-MM-ddTHH:mm
    id_mapel: "",
    nig_guru: "",
    id_ujian: "",
    id_kelas: "",
  });

  const [mapelOptions, setMapelOptions] = useState<Option[]>([]);
  const [ujianOptions, setUjianOptions] = useState<Option[]>([]);
  const [kelasOptions, setKelasOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchMapelOptions();
    fetchUjianOptions();
    fetchKelasOptions();

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token) as DecodedJWT;
      setExamDetails((prev) => ({ ...prev, nig_guru: decodedToken.niu }));
    }
  }, []);

  useEffect(() => {
    // Update waktu_dimulai dan waktu_berakhir ketika tanggal_pelaksanaan berubah
    const baseDate = examDetails.tanggal_pelaksanaan;
    setExamDetails((prev) => ({
      ...prev,
      waktu_dimulai: `${baseDate}T${prev.waktu_dimulai.split('T')[1]}`,
      waktu_berakhir: `${baseDate}T${prev.waktu_berakhir.split('T')[1]}`,
    }));
  }, [examDetails.tanggal_pelaksanaan]);

  const fetchMapelOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/mapel"
      );
      const data = response.data;
      const validOptions = data.filter((item: any) => item.id);
      const idOptions: Option[] = validOptions.map((item: any) => ({
        value: item.id,
        label: `MAPEL: ${item.id}`.toUpperCase(),
      }));
      idOptions.sort((a, b) => a.label.localeCompare(b.label));
      setMapelOptions(idOptions);
    } catch (error) {
      console.error("Error fetching mapel options:", error);
    }
  };

  const fetchUjianOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/ujian"
      );
      const data = response.data;
      const validOptions = data.filter((item: any) => item.id);
      const idOptions: Option[] = validOptions.map((item: any) => ({
        value: item.id,
        label: `UJIAN ID: ${item.id}`.toUpperCase(),
      }));
      idOptions.sort((a, b) => a.label.localeCompare(b.label));
      setUjianOptions(idOptions);
    } catch (error) {
      console.error("Error fetching ujian options:", error);
    }
  };

  const fetchKelasOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/kelas"
      );
      const data = response.data;
      const validOptions = data.filter((item: any) => item.id);
      const idOptions: Option[] = validOptions.map((item: any) => ({
        value: item.id,
        label: `KELAS: ${item.id}`.toUpperCase(),
      }));
      idOptions.sort((a, b) => a.label.localeCompare(b.label));
      setKelasOptions(idOptions);
    } catch (error) {
      console.error("Error fetching kelas options:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExamDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Struktur data sesuai dengan yang diharapkan oleh backend
    const dataToSend = {
      judul_soal: examDetails.judul_soal,
      jumlah_soal: examDetails.jumlah_soal,
      durasi: examDetails.durasi,
      tanggal_pelaksanaan: examDetails.tanggal_pelaksanaan,
      waktu_mulai: examDetails.waktu_dimulai,
      waktu_berakhir: examDetails.waktu_berakhir,
      id_mapel: examDetails.id_mapel,
      nig_guru: examDetails.nig_guru,
      id_ujian: examDetails.id_ujian,
      id_kelas: examDetails.id_kelas
    };
  
    try {
      await axios.post(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/detail-ujian",
        dataToSend,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("Data submitted successfully:", dataToSend);
      setIsOpen(false);
      onComplete(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Jika kesalahan dari axios
        console.error("Axios error:", error.response?.data);
        alert(`Error: ${error.response?.data.message || 'Unknown error'}`);
      } else {
        // Jika kesalahan bukan dari axios
        console.error("Unexpected error:", error);
        alert('An unexpected error occurred.');
      }
    }
  };

  const isFormComplete = () => {
    return (
      examDetails.judul_soal &&
      examDetails.jumlah_soal > 0 &&
      examDetails.durasi !== "00:00:00" &&
      examDetails.id_mapel &&
      examDetails.id_ujian &&
      examDetails.id_kelas &&
      examDetails.waktu_dimulai &&
      examDetails.waktu_berakhir
    );
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-lg">
      <button
        className="w-full p-4 text-left font-semibold bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        Detail Ujian {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Judul Soal</label>
              <input
                type="text"
                name="judul_soal"
                value={examDetails.judul_soal}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Jumlah Soal</label>
              <input
                type="number"
                name="jumlah_soal"
                value={examDetails.jumlah_soal}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Durasi (JJ:MM:DD)</label>
              <input
                type="text"
                name="durasi"
                value={examDetails.durasi}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="00:00:00"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tanggal Pelaksanaan</label>
              <input
                type="date"
                name="tanggal_pelaksanaan"
                value={examDetails.tanggal_pelaksanaan}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Waktu Mulai</label>
              <input
                type="datetime-local"
                name="waktu_dimulai"
                value={examDetails.waktu_dimulai}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Waktu Berakhir</label>
              <input
                type="datetime-local"
                name="waktu_berakhir"
                value={examDetails.waktu_berakhir}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Mapel</label>
              <select
                name="id_mapel"
                value={examDetails.id_mapel}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Mapel</option>
                {mapelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Ujian</label>
              <select
                name="id_ujian"
                value={examDetails.id_ujian}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Ujian</option>
                {ujianOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Kelas</label>
              <select
                name="id_kelas"
                value={examDetails.id_kelas}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={(e) => {
                if (!isFormComplete()) {
                  e.preventDefault(); // Mencegah form dari pengiriman
                  alert("Formulir belum lengkap, silakan lengkapi semua bidang sebelum menyimpan.");
                }
              }}
            >
              Simpan Detail Ujian
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => {
                onComplete(true);
                setIsOpen(false);
              }}
            >
              Saya Sudah Membuat Detail Ujian
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExamDetails;
