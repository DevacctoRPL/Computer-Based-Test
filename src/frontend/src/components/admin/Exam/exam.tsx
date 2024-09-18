import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, PlusCircle } from "lucide-react";

interface ExamDetail {
  judul_soal: string;
  jumlah_soal: number;
  durasi: string;
  tanggal_pelaksanaan: string;
  waktu_mulai: string;
  waktu_berakhir: string;
  id_mapel: string;
  nig_guru: string;
  id_ujian: string;
  id_kelas: string;
}

interface Option {
  value: string;
  label: string;
}

const   ExamDetails: React.FC = ({
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [examDetails, setExamDetails] = useState<ExamDetail>({
    judul_soal: "",
    jumlah_soal: 0,
    durasi: "00:00:00",
    tanggal_pelaksanaan: new Date().toISOString().split("T")[0],
    waktu_mulai: new Date().toISOString().slice(0, 16),
    waktu_berakhir: new Date().toISOString().slice(0, 16),
    id_mapel: "",
    nig_guru: "",
    id_ujian: "",
    id_kelas: "",
  });

  const [mapelOptions, setMapelOptions] = useState<Option[]>([]);
  const [ujianOptions, setUjianOptions] = useState<Option[]>([]);
  const [kelasOptions, setKelasOptions] = useState<Option[]>([]);
  const [guruOptions, setGuruOptions] = useState<Option[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([""]);

  useEffect(() => {
    fetchMapelOptions();
    fetchUjianOptions();
    fetchKelasOptions();
    fetchGuruOptions();
  }, []);

  useEffect(() => {
    const baseDate = examDetails.tanggal_pelaksanaan;
    setExamDetails((prev) => ({
      ...prev,
      waktu_mulai: `${baseDate}T${prev.waktu_mulai.split("T")[1]}`,
      waktu_berakhir: `${baseDate}T${prev.waktu_berakhir.split("T")[1]}`,
    }));
  }, [examDetails.tanggal_pelaksanaan]);

  const fetchGuruOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/guru"
      );
      const data = response.data;
      const validOptions = data.filter((item: any) => item.nig);
      const nigOptions: Option[] = validOptions.map((item: any) => ({
        value: item.nig,
        label: `${item.nama}`.toUpperCase(),
      }));
      nigOptions.sort((a, b) => a.label.localeCompare(b.label));
      setGuruOptions(nigOptions);
    } catch (error) {
      console.error("Error fetching guru options:", error);
    }
  };

  const fetchMapelOptions = async () => {
    try {
      const response = await axios.get(
        "https://49kdgk28-7772.asse.devtunnels.ms/api/mapel"
      );
      const data = response.data;
      const validOptions = data.filter((item: any) => item.id);
      const idOptions: Option[] = validOptions.map((item: any) => ({
        value: item.id,
        label: `${item.id}`.toUpperCase(),
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
        label: `${item.id}`.toUpperCase(),
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
        label: `${item.id}`.toUpperCase(),
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

  const handleClassChange = (index: number, value: string) => {
    const updatedClasses = [...selectedClasses];
    updatedClasses[index] = value; // Store the id_kelas here
    setSelectedClasses(updatedClasses);
  };

  // Add a new class selection
  const addClass = () => {
    setSelectedClasses([...selectedClasses, ""]); // Add a new empty value for id_kelas
  };

  // Remove a class selection at a specific index
  const removeClass = (index: number) => {
    const updatedClasses = selectedClasses.filter((_, i) => i !== index);
    setSelectedClasses(updatedClasses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const id_kelas of selectedClasses) {
      if (!id_kelas) continue; // Skip empty class selections

      const dataToSend = {
        ...examDetails,
        id_kelas,
      };

      console.log(dataToSend)

      try {
        await axios.post(
          "https://49kdgk28-7772.asse.devtunnels.ms/api/detail-ujian",
          dataToSend,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Data submitted successfully for class:", id_kelas);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Axios error for class",
            id_kelas,
            ":",
            error.response?.data
          )
          console.error("Woi ini data sending: ", dataToSend);
          alert(
            `Error for class ${id_kelas}: ${
              error.response?.data.message || "Unknown error"
            }`
          );
        } else {
          console.error("Unexpected error for class", id_kelas, ":", error);
          alert(`An unexpected error occurred for class ${id_kelas}.`);
        }
      }
    }

    setIsOpen(false);   
  };

  const isFormComplete = () => {
    return (
      examDetails.judul_soal &&
      examDetails.jumlah_soal > 0 &&
      examDetails.durasi !== "00:00:00" &&
      examDetails.id_mapel &&
      examDetails.id_ujian &&
      examDetails.nig_guru &&
      selectedClasses.some((kelas) => kelas !== "") &&
      examDetails.waktu_mulai &&
      examDetails.waktu_berakhir
    );
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-lg bg-white">
      <button
        className="w-full p-4 text-left font-semibold bg-white hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        Detail Ujian {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Kode Ujian</label>
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
              <label className="block mb-2">Mata Pelajaran</label>
              <input
                type="text"
                name="judul_soal"
                placeholder="Cth: Pemrograman Berorientasi Objek"
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
                name="waktu_mulai"
                value={examDetails.waktu_mulai}
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
              <label className="block mb-2">Kode Mapel</label>
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
              <label className="block mb-2">Kelas</label>
              {selectedClasses.map((kelas, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    name="id_kelas"
                    value={kelas} // This will be the id_kelas
                    onChange={(e) => handleClassChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Pilih Kelas</option>
                    {kelasOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {/* option.value is id_kelas */}
                        {option.label} {/* option.label is the class name */}
                      </option>
                    ))}
                  </select>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeClass(index)}
                      className="ml-2 text-red-500"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addClass}
                className="mt-2 flex items-center text-blue-500"
              >
                <PlusCircle size={20} className="mr-1" />
                Tambah Kelas
              </button>
            </div>
            <div>
              <label className="block mb-2">Guru</label>
              <select
                name="nig_guru"
                value={examDetails.nig_guru}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Guru</option>
                {guruOptions.map((option) => (
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
                  alert(
                    "Formulir belum lengkap, silakan lengkapi semua bidang sebelum menyimpan."
                  );
                }
              }}
            >
              Simpan Detail Ujian
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExamDetails;
