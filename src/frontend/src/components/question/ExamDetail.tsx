import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import jwt from "jsonwebtoken";

interface ExamDetail {
  judul_soal: string;
  jumlah_soal: number;
  durasi: string; // Durasi dalam format HH:mm:ss
  dibuat_pada: string;
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
    dibuat_pada: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
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

  const fetchMapelOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7774.asse.devtunnels.ms/api/mapel"
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
        "https://49kdgk28-7774.asse.devtunnels.ms/api/ujian"
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
        "https://49kdgk28-7774.asse.devtunnels.ms/api/kelas"
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

    if (name === "durasi") {
      // Update the state with formatted time
      setExamDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setExamDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const minutesToTime = (minutes: number) => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:00`;
  // };

  // Format durasi untuk tampilan
  // const formatDuration = (time: string) => {
  //   const [hours, minutes] = time.split(":").map(Number);
  //   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
  //     2,
  //     "0"
  //   )}`;
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://49kdgk28-7774.asse.devtunnels.ms/api/detil-ujian",
        examDetails
      );
      console.log("Data submitted successfully:", examDetails);
      setIsOpen(false);
      onComplete(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const isFormComplete = () => {
    return (
      examDetails.judul_soal &&
      examDetails.jumlah_soal > 0 &&
      examDetails.durasi !== "00:00:00" &&
      examDetails.id_mapel &&
      examDetails.id_ujian &&
      examDetails.id_kelas
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
              <label className="block mb-2">Durasi (HH:mm:ss)</label>
              <input
                type="text"
                name="durasi"
                value={examDetails.durasi}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="00:00:00"
                required
              />
              <p className="mt-2">Formatted Duration: {examDetails.durasi}</p>
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
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!isFormComplete()}
          >
            Simpan Detail Ujian
          </button>
        </form>
      )}
    </div>
  );
};

export default ExamDetails;
