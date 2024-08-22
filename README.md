
## Update on 1 August 2024

- Mengatasi masalah konflik dependensi
- melakukan perombakan frontend, tidak menggunakan vite dan di setup manual
- memperbaiki masalah tsconfig.json

## Update on 3 August 2024

- Membuat metode login dengan JWT sebagai token session
- Memperbarui Frontend dengan  menggunakan Vite
- Memberi batasan percobaan login

## Update on 22 August 2024

- Menambahkan folder test dan unit test untuk pengembangan fitur
- Menyediakan 2 lingkungan (production dan development)
- Menghapus package yang tidak dipakai

## Tech
Menggunakan MERN Stack (MySQL, Express, ReactJS, NodeJS)

## Installation

perlu [Node.js](https://nodejs.org/) v16+ untuk menjalankan.

```sh
cd computer-based-test
npm install
```

penginstallan package dan dependensi untuk frontend

```sh
cd computer-based-test/src/frontend
npm install
```

## Running on Development Environtment

Menjalankan server app.ts dalam lingkungan development (port 7774)

```sh
cd computer-based-test
npm run start-dev
```

## Running on Production Environtment

Menjalankan server app.ts dalam lingkungan development (port 7772)

```sh
cd computer-based-test
npm run start-prod
```

## Running on React

menjalankan ReactJS di frontend (def port 5173)

```sh
cd src/frontend
npm run dev
```

## Important

Sejujurnya ini agak goblok ya, gw bingung merge nya gmn, jadi lu kudu buka 2 tab terminal di vscode nya, yang 1 buat run frontend nya, yang 1 buat run backendnya, nanti kalo gw ketemu cara yang lebih ok, gw fix secepatnya ya kawan
