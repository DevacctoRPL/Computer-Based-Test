import React, { useState, useEffect, useRef, FormEvent } from "react";
import useClearNullList from "../../hooks/useClearNullList.js";
import jwt from "jsonwebtoken";
import axios from "axios";
interface Answer {
  question_id: string;
  question_text: string;
  answer_text: string;
  answer_alphabet: string;
  questionImage: string | null;
  arrayJawabanText: string | null;
  arrayAnswerImages: string | null;
}

interface SelectedOption {
  id: string;
  id_kelas: string;
  id_mapel: string;
}

type Option = {
  id: string;
  id_mapel: string;
  id_kelas: string;
};

const InputQuestion: React.FC = () => {
  useClearNullList();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([
    { id: "", id_kelas: "", id_mapel: "" },
  ]);
  const [status, setStatus] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [soal, setSoal] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  let NIUGURU = ""

  useEffect(() => {
    // Mendekode token JWT dan mengambil NIU
    const getNIUFromToken = () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (token) {
        const decodedToken = jwt.decode(token);
        console.log("Decoded token:", decodedToken);
        if (decodedToken && typeof decodedToken !== "string") {
          const NIU = (decodedToken as jwt.JwtPayload).niu;
          console.log("NIU:", NIU);
          NIUGURU = NIU
          return NIU;
        }
      }
      return null;
    };

    let id_detailUjian = ""

    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      setError(null);
      const NIU = getNIUFromToken();
      if (NIU) {
        try {
          const url = `https://49kdgk28-7774.asse.devtunnels.ms/api/detail-ujian?nig_guru=${NIU}`;
          console.log("Fetching from URL:", url);
          const response = await fetch(url);
          console.log("Response status:", response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Received data:", data);
          if (
            Array.isArray(data) &&
            data.every(
              (item) => "id" in item && "id_mapel" in item && "id_kelas" in item
            )
          ) {
            setOptions(data);
          } else {
            throw new Error("Received data is not in the expected format");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("NIU not found in token");
        setIsLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleDropdownChange = (index: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    const selectedOption = options.find((option) => option.id === value);
    if (selectedOption) {
      newSelectedOptions[index] = {
        id: value,
        id_kelas: selectedOption.id_kelas,
        id_mapel: selectedOption.id_mapel,
      };
      setSelectedOptions(newSelectedOptions);
    }
  };

  const addDropdown = () => {
    setSelectedOptions([...selectedOptions, { id: "", id_kelas: "" , id_mapel: ""}]);
  };

  const removeDropdown = (index: number) => {
    const newSelectedOptions = selectedOptions.filter((_, i) => i !== index);
    setSelectedOptions(newSelectedOptions);
  };

  // const submitData = async () => {
  //   for (const option of selectedOptions) {
  //     if (option.id) {
  //       try {
  //         await axios.post(
  //           "https://49kdgk28-7774.asse.devtunnels.ms/api/pertanyaan",
  //           {
  //             //data data yang mau dikirim
  //           }
  //         );

  //         // Kirim data ke tabel jawaban_pertanyaan
  //         await axios.post(
  //           "https://49kdgk28-7774.asse.devtunnels.ms/api/jawaban-pertanyaan",
  //           {
  //             //data data yang mau dikirim
  //           }
  //         );

  //         console.log(`Data untuk kelas ${option.id_kelas} berhasil dikirim`);
  //       } catch (error) {
  //         console.error(
  //           `Error mengirim data untuk kelas ${option.id_kelas}:`,
  //           error
  //         );
  //       }
  //     }
  //   }
  // };

  //=======================================================================================================

  const handleFileUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("Conversion is Pending...");

      try {
        const response = await fetch(
          "https://49kdgk28-7774.asse.devtunnels.ms/api/convert",
          {
            method: "POST",
            body: formData,
          }
        );

        const html = await response.text();
        processHTML(html);
        setStatus("Conversion completed successfully.");

        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading file:", error);
        setStatus("Conversion failed, Client Connection or Server Error!");
      }
    }
  };

  const processHTML = (html: string) => {
    if (!outputRef.current) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const listItems = tempDiv.querySelectorAll("ol li, ul li");
    let answerIndex = 0;
    const labels = ["A", "B", "C", "D", "E"];
    let currentSoal: HTMLElement | null = null;
    let localQuestionIndex = 1; // Inisialisasi indeks soal lokal

    listItems.forEach((item, index) => {
      const listAnswerDiv = document.createElement("div");
      listAnswerDiv.classList.add("list-answer");
      listAnswerDiv.classList.add("ml-2");

      // Check if the item is empty or contains only an image
      const hasOnlyImage =
        item.childNodes.length === 1 && item.querySelector("img");
      const isEmpty = item.textContent?.trim() === "" && !hasOnlyImage;

      if (isEmpty) {
        item.remove();
        return;
      }
      // Hapus elemen list yang kosong
      if (item.textContent?.trim() === "") {
        item.remove();
        return;
      }

      if (index % 5 === 0) {
        //5 adalah = 1 soal, 4 jawaban (a,b,c,d)
        const soalText = item.innerHTML;
        item.id = `soal-${localQuestionIndex}`; // Gunakan indeks lokal
        item.classList.add("border-b-2", "border-red-600", "mb-4");

        const soalP = document.createElement("p");
        soalP.id = item.id;
        soalP.innerHTML = soalText;

        item.innerHTML = "";
        item.appendChild(soalP);

        soalP.classList.add("mb-6");

        localQuestionIndex++; // Increment indeks lokal
        answerIndex = 0;
        currentSoal = item as HTMLElement;
      } else {
        const radioLabel = document.createElement("label");
        radioLabel.classList.add("radio-label", "flex", "mb-6");

        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `jawaban-${localQuestionIndex - 1}`; // Gunakan indeks lokal
        radioInput.classList.add("radio-input");
        radioInput.value = labels[answerIndex];

        // Cek apakah jawaban ini adalah jawaban yang benar
        const isCorrectAnswer = item.innerHTML.includes("(asTrueAnswer)");
        if (isCorrectAnswer) {
          listAnswerDiv.style.backgroundColor = "lightgreen";
          radioInput.checked = true;
          item.innerHTML = item.innerHTML.replace("(asTrueAnswer)", "").trim();
        }

        listAnswerDiv.innerHTML = item.innerHTML;
        item.innerHTML = "";
        item.appendChild(listAnswerDiv);

        radioLabel.appendChild(radioInput);
        radioLabel.appendChild(listAnswerDiv);

        if (currentSoal) currentSoal.appendChild(radioLabel);
        answerIndex += 1;
      }
    });

    outputRef.current.innerHTML = ""; // Bersihkan output sebelum menambahkan yang baru
    outputRef.current.appendChild(tempDiv);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answers: { [key: string]: Answer } = {}; // Change to an object with question_id as keys
    const allTexts: { [key: string]: { Jawaban: string }[] } = {}; // Change to an object with question_id as keys
    const allImageURIs: { [key: string]: { pilihan: string; url: string }[] } =
      {}; // Change to an object with question_id as keys

    const getImageAnswerURIs = (questionId: string) => {
      const uris: { pilihan: string; url: string }[] = [];
      const questionElement = document.querySelector(`#${questionId}`);
      if (questionElement) {
        const answerElements = questionElement.querySelectorAll("label");
        answerElements.forEach((label) => {
          const answerDiv = label.querySelector(".list-answer");
          if (answerDiv) {
            const imgTag = answerDiv.querySelector("img");
            if (imgTag) {
              uris.push({
                pilihan: answerDiv.textContent?.trim() || "",
                url: imgTag.getAttribute("src") || "",
              });
            }
          }
        });
      }
      return uris;
    };

    const getTextAnswerURIs = (questionId: string) => {
      const texts: { Jawaban: string }[] = [];
      const questionElement = document.querySelector(`#${questionId}`);
      if (questionElement) {
        const answerElements = questionElement.querySelectorAll("label");
        answerElements.forEach((label) => {
          const answerDiv = label.querySelector(".list-answer");
          if (answerDiv && !answerDiv.querySelector("img")) {
            // If there's no image
            const text = answerDiv.textContent?.trim();
            if (text) {
              texts.push({ Jawaban: answerDiv.textContent?.trim() || "" });
            }
          }
        });
      }
      return texts;
    };

    let questionCount = 1;
    while (document.querySelector(`#soal-${questionCount}`)) {
      const questionId = `soal-${questionCount}`;
      const imgURIs = getImageAnswerURIs(questionId);
      const textsSoal = getTextAnswerURIs(questionId);

      allTexts[questionCount.toString()] = textsSoal;
      allImageURIs[questionCount.toString()] = imgURIs;

      questionCount++;
    }

    const getImageQuestionURI = (element: Element): string | null => {
      const imgTag = element.querySelector("img");
      return imgTag ? imgTag.getAttribute("src") : null;
    };

    const removeImgAndBrFromP = (element: Element) => {
      Array.from(element.children).forEach((child) => {
        if (child.tagName === "IMG" || child.tagName === "BR") {
          element.removeChild(child);
        }
      });
    };

    function generateRandomText(length:number) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          result += characters[randomIndex];
      }
      return result;
    }
    
    
    for (let i = 1; i < questionCount; i++) {
      const tagP = document.querySelector(`p#soal-${i}`);
      const indexNomor = `${i}`;

      if (tagP) {
        const imgURI = getImageQuestionURI(tagP);
        removeImgAndBrFromP(tagP);

        const nilaiTagP = tagP.textContent?.trim() || "";
        const checkedRadio = document.querySelector(
          `input[name='jawaban-${i}']:checked`
        ) as HTMLInputElement | null;

        if (checkedRadio) {
          const answerText =
            checkedRadio.nextElementSibling?.textContent?.trim() || "";
          const alphabetRadio = checkedRadio.value;

          const receiveObject: Answer = {
            question_id: indexNomor,
            question_text: nilaiTagP,
            questionImage: imgURI,
            answer_text: answerText,
            answer_alphabet: alphabetRadio,
            arrayJawabanText:
              allTexts[indexNomor].length > 0
                ? JSON.stringify({ Jawaban: allTexts[indexNomor] })
                : null,
            arrayAnswerImages:
              allImageURIs[indexNomor].length > 0
                ? JSON.stringify({ data: allImageURIs[indexNomor] })
                : null,
          };

          console.log(`Soal: ${i}`); //Kirim ke tabel pertanyaan
          console.log(`Pertanyaan: ${nilaiTagP}`); //Kirim ke tabel pertanyaan
          console.log(`Gambar Soal: ${imgURI}`); //Kirim ke tabel pertanyaan
          console.log(`Jawaban yang dipilih: ${answerText}`); //Kirim ke tabel jawaban_pertanyaan
          console.log(`Jawaban alphabet: ${alphabetRadio}`); //Kirim ke tabel jawaban_pertanyaan
          console.log(
            `Jawaban Teks: ${
              allTexts[indexNomor].length > 0
                ? JSON.stringify(
                    allTexts[indexNomor].map((item) => item.Jawaban)
                  )
                : null
            }`
          ); //Kirim ke tabel jawaban_pertanyaan
          console.log(
            `Jawaban Gambar: ${
              allImageURIs[indexNomor].length > 0
                ? JSON.stringify(allImageURIs[indexNomor])
                : null
            }`
          ); //Kirim ke tabel jawaban_pertanyaan

          //CATATAN: semua data jawaban dimasukkan dalam 1 objek dan dijadikan JSON. Nah JSON itu yang dikirim. 
          //const isi_jawaban : ${isi_jawaban}

          for (const option of selectedOptions) {
            if (option.id) {
              let pertanyaanID = generateRandomText(10)
              console.log(pertanyaanID)
              try {
                const token = localStorage.getItem("token");
                console.log("Token:", token);
                if (!token) return
                const decodedToken = jwt.decode(token);
                    const NIU = (decodedToken as jwt.JwtPayload).niu;
                await axios.post(
                  "https://49kdgk28-7774.asse.devtunnels.ms/api/pertanyaan",
                  {
                    //data data yang mau dikirim
                    id:pertanyaanID,
                    nomor:i,
                    pertanyaan:nilaiTagP,
                    gambar:imgURI,
                    id_detail_ujian: `${option.id_kelas.split(" - ")[0]}-${option.id_mapel}-${NIU}`
                  }
                );
      
                // Kirim data ke tabel jawaban_pertanyaan
                await axios.post(
                  "https://49kdgk28-7774.asse.devtunnels.ms/api/jawaban-pertanyaan",
                  {
                    //data data yang mau dikirim
                    id:pertanyaanID,
                    id_pertanyaan:pertanyaanID,
                    isi_jawaban:JSON.stringify({
                      daftar_jawaban: `${
                        allTexts[indexNomor].length > 0
                          ? JSON.stringify(
                              allTexts[indexNomor].map((item) => item.Jawaban)
                            )
                          : null
                      }`,
                      daftar_jawaban_bergambar:  `${
                        allImageURIs[indexNomor].length > 0
                          ? JSON.stringify(allImageURIs[indexNomor])
                          : null
                      }`,
                      
                      jawaban_yang_di_pilih:answerText,
                      jawaban_alphabet:alphabetRadio
                    }),
                    id_detail_ujian: `${option.id_kelas.split(" - ")[0]}-${option.id_mapel}-${NIU}`
                  }
                );
      
                console.log(`Data untuk kelas ${option.id_kelas} berhasil dikirim`);
              } catch (error) {
                console.error(
                  `Error mengirim data untuk kelas: `,
                  error
                );
              }
            }
          }

          answers[indexNomor] = receiveObject;
        }
      }
    }

    console.log(answers);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Convert DOCX to HTML
      </h1>
      <form
        onSubmit={handleFileUpload}
        encType="multipart/form-data"
        className="flex flex-col items-center mb-6"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".docx"
          required
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Convert
        </button>
        {status && <p className="text-center text-blue-500">{status}</p>}
      </form>

      <form onSubmit={handleSave} className="flex flex-col space-y-4">
        <div
          ref={outputRef}
          id="output"
          className="space-y-4 bg-gray-100 border-red-600 p-4 rounded-md"
        ></div>
        <div>
          <h2 className="text-xl font-bold mb-4">Penugasan Ujian</h2>
          {selectedOptions.map((selectedOption, index) => (
            <div key={index} className="flex items-center mb-4">
              <select
                value={selectedOption.id}
                onChange={(e) => handleDropdownChange(index, e.target.value)}
                className="border border-gray-300 rounded-md p-2 mr-2"
              >
                <option value="">Pilih kelas</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id_mapel} - {option.id_kelas}
                  </option>
                ))}
              </select>
              {index > 0 && (
                <button
                  onClick={() => removeDropdown(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addDropdown}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Tambah Kelas
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Kirim Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputQuestion