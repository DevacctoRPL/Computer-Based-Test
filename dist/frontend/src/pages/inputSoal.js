var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useRef } from 'react';
import useClearNullList from '../hooks/useClearNullList.js';
const InputQuestion = () => {
    useClearNullList();
    const [soal, setSoal] = useState('');
    const fileInputRef = useRef(null);
    const outputRef = useRef(null);
    const handleFileUpload = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        const file = (_b = (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = yield fetch("http://localhost:7772/convert", {
                    method: "POST",
                    body: formData,
                });
                const html = yield response.text();
                processHTML(html);
                if (fileInputRef.current)
                    fileInputRef.current.value = '';
            }
            catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    });
    const processHTML = (html) => {
        if (!outputRef.current)
            return;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const listItems = tempDiv.querySelectorAll("ol li, ul li");
        let answerIndex = 0;
        const labels = ["A", "B", "C", "D", "E"];
        let currentSoal = null;
        let localQuestionIndex = 1; // Inisialisasi indeks soal lokal
        listItems.forEach((item, index) => {
            var _a;
            const listAnswerDiv = document.createElement("div");
            listAnswerDiv.classList.add("list-answer");
            listAnswerDiv.classList.add("ml-2");
            // Hapus elemen list yang kosong
            if (((_a = item.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === '') {
                item.remove();
                return;
            }
            if (index % 6 === 0) {
                const soalText = item.innerHTML;
                item.id = `soal-${localQuestionIndex}`; // Gunakan indeks lokal
                item.classList.add('border-b-2', 'border-red-600', 'mb-4');
                const soalP = document.createElement("p");
                soalP.id = item.id;
                soalP.innerHTML = soalText;
                item.innerHTML = "";
                item.appendChild(soalP);
                // Tambahin border ke elemen soal
                // soalP.style.border = "2px solid #000";  // Buat Developing jarak soal ke Jawaban
                soalP.classList.add("mb-6");
                localQuestionIndex++; // Increment indeks lokal
                answerIndex = 0;
                currentSoal = item;
            }
            else {
                const radioLabel = document.createElement("label");
                radioLabel.classList.add("radio-label");
                radioLabel.classList.add("flex");
                radioLabel.classList.add("mb-6");
                const radioInput = document.createElement("input");
                radioInput.type = "radio";
                radioInput.name = `jawaban-${localQuestionIndex - 1}`; // Gunakan indeks lokal
                radioInput.classList.add("radio-input");
                radioInput.value = labels[answerIndex];
                listAnswerDiv.innerHTML = item.innerHTML;
                item.innerHTML = "";
                item.appendChild(listAnswerDiv);
                radioLabel.appendChild(radioInput);
                radioLabel.appendChild(listAnswerDiv);
                if (currentSoal)
                    currentSoal.appendChild(radioLabel);
                answerIndex += 1;
            }
        });
        outputRef.current.innerHTML = ''; // Bersihkan output sebelum menambahkan yang baru
        outputRef.current.appendChild(tempDiv);
    };
    const handleSave = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f;
        event.preventDefault();
        const answers = [];
        const allImageURIs = [];
        const getImageAnswerURIs = (questionId) => {
            const uris = [];
            const questionElement = document.querySelector(`#${questionId}`);
            if (questionElement) {
                const answerElements = questionElement.querySelectorAll("label");
                answerElements.forEach((label) => {
                    const answerDiv = label.querySelector(".list-answer");
                    if (answerDiv) {
                        const imgTag = answerDiv.querySelector("img");
                        if (imgTag) {
                            uris.push({
                                pilihan: answerDiv.textContent || '',
                                url: imgTag.getAttribute("src") || ''
                            });
                        }
                    }
                });
            }
            return uris;
        };
        let questionCount = 1;
        while (document.querySelector(`#soal-${questionCount}`)) {
            const questionId = `soal-${questionCount}`;
            const imgURIs = getImageAnswerURIs(questionId);
            if (imgURIs.length > 0) {
                allImageURIs.push(...imgURIs);
            }
            else {
                console.log(`No image found in list-answer for question ${questionId}`);
            }
            questionCount++;
        }
        const getImageQuestionURI = (element) => {
            const imgTag = element.querySelector("img");
            return imgTag ? imgTag.getAttribute("src") : null;
        };
        const removeImgAndBrFromP = (element) => {
            Array.from(element.children).forEach((child) => {
                if (child.tagName === "IMG" || child.tagName === "BR") {
                    element.removeChild(child);
                }
            });
        };
        for (let i = 1; i < questionCount; i++) {
            const tagP = document.querySelector(`p#soal-${i}`);
            if (tagP) {
                let listJawaban = [];
                console.log(tagP);
                (_c = document.querySelector(`#soal-${i}`)) === null || _c === void 0 ? void 0 : _c.querySelectorAll("label").forEach(res => {
                    const listAnswer = res.querySelector(".list-answer");
                    if (listAnswer)
                        listJawaban.push(listAnswer.textContent || '');
                });
                const imgURI = getImageQuestionURI(tagP);
                removeImgAndBrFromP(tagP);
                const nilaiTagP = ((_d = tagP.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                const checkedRadio = document.querySelector(`input[name='jawaban-${i}']:checked`);
                if (checkedRadio) {
                    const answerText = ((_f = (_e = checkedRadio.nextElementSibling) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || '';
                    const alphabetRadio = checkedRadio.value;
                    const receiveObject = {
                        mapel: soal,
                        question_id: tagP.id,
                        question_text: nilaiTagP,
                        answer_text: answerText,
                        answer_alphabet: alphabetRadio,
                        questionImage: imgURI,
                        arrayJawabanText: JSON.stringify(listJawaban),
                        arrayAnswerImages: imgURI === null ? null : JSON.stringify({ data: allImageURIs })
                    };
                    console.log(`ID Tag <p>: ${tagP.id}`);
                    console.log(`Nilai dari Tag <p>: ${nilaiTagP}`);
                    console.log(`Value Radio Checked: ${answerText}`);
                    console.log(`Alphabet Radio Checked: ${alphabetRadio}`);
                    console.log(`URL GAMBAR SOAL-${i}: ${imgURI}`);
                    console.log(`ARRAY URL GAMBAR JAWABAN: `, imgURI === null ? null : allImageURIs);
                    answers.push(receiveObject);
                }
            }
        }
        try {
            const response = yield fetch("https://49kdgk28-7772.asse.devtunnels.ms/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answers }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = yield response.text();
            alert(result);
            setSoal('');
            const radioInputs = document.querySelectorAll(".radio-input");
            radioInputs.forEach((input) => {
                input.checked = false;
            });
        }
        catch (error) {
            console.error("Error submitting form:", error);
        }
    });
    return (React.createElement("div", { className: "max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg" },
        React.createElement("h1", { className: "text-2xl font-bold mb-6 text-center text-gray-800" }, "Convert DOCX to HTML"),
        React.createElement("form", { onSubmit: handleFileUpload, encType: "multipart/form-data", className: "flex flex-col items-center mb-6" },
            React.createElement("input", { type: "file", ref: fileInputRef, accept: ".docx", required: true, className: "border border-gray-300 rounded-md p-2 mb-4" }),
            React.createElement("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" }, "Convert")),
        React.createElement("form", { onSubmit: handleSave, className: "flex flex-col space-y-4" },
            React.createElement("label", { htmlFor: "soal", className: "block text-sm font-medium text-gray-700" }, "Letakkan Nama Mapel Anda"),
            React.createElement("input", { type: "text", name: "soal", id: "soal", value: soal, onChange: (e) => setSoal(e.target.value), className: "border border-red-600 rounded-md p-2 mb-4" }),
            React.createElement("div", { ref: outputRef, id: "output", className: "space-y-4 bg-gray-100 border-red-600 p-4 rounded-md" }),
            React.createElement("button", { type: "submit", className: "px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" }, "Save"))));
};
export default InputQuestion;
