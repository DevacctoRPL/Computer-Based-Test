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
const InputQuestion = () => {
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
                const response = yield fetch("https://49kdgk28-7771.asse.devtunnels.ms/convert", {
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
            const listAnswerDiv = document.createElement("div");
            listAnswerDiv.classList.add("list-answer");
            if (index % 6 === 0) {
                const soalText = item.innerHTML;
                item.id = `soal-${localQuestionIndex}`; // Gunakan indeks lokal
                const soalP = document.createElement("p");
                soalP.id = item.id;
                soalP.innerHTML = soalText;
                item.innerHTML = "";
                item.appendChild(soalP);
                localQuestionIndex++; // Increment indeks lokal
                answerIndex = 0;
                currentSoal = item;
            }
            else {
                const radioLabel = document.createElement("label");
                radioLabel.classList.add("radio-label");
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
            const response = yield fetch("https://49kdgk28-7771.asse.devtunnels.ms/submit", {
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
    return (React.createElement("div", null,
        React.createElement("h1", null, "Convert DOCX to HTML"),
        React.createElement("form", { onSubmit: handleFileUpload, encType: "multipart/form-data" },
            React.createElement("input", { type: "file", ref: fileInputRef, accept: ".docx", required: true }),
            React.createElement("button", { type: "submit" }, "Convert")),
        React.createElement("form", { onSubmit: handleSave },
            React.createElement("label", { htmlFor: "soal" }, "Letakkan Nama Mapel Anda"),
            React.createElement("input", { type: "text", name: "soal", id: "soal", value: soal, onChange: (e) => setSoal(e.target.value) }),
            React.createElement("div", { ref: outputRef, id: "output" }),
            React.createElement("button", { type: "submit" }, "Save"))));
};
export default InputQuestion;
