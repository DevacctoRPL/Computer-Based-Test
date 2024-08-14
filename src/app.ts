import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs/promises';
import mammoth from 'mammoth'

import adminRoutes from "./backend/routes/adminRoutes.js";
import guruRoutes from "./backend/routes/guruRoutes.js";
import jawabanRoutes from "./backend/routes/jawabanRoutes.js";
import kelasRoutes from "./backend/routes/kelasRoutes.js";
import mapelRoutes from "./backend/routes/mapelRoutes.js";
import nilaiRoutes from "./backend/routes/nilaiRoutes.js";
import siswaRoutes from "./backend/routes/siswaRoutes.js";
import soalRoutes from "./backend/routes/soalRoutes.js";
import ujianRoutes from "./backend/routes/ujianRoutes.js";

import relGuruMapelRoutes from "./backend/routes/relGuruMapelRoutes.js";
import relMapelKelasRoutes from "./backend/routes/relMapelKelasRoutes.js";
import relSiswaSoalRoutes from "./backend/routes/relSiswaSoalRoutes.js";
import relSoalMapelKelasRoutes from "./backend/routes/relSoalMapelKelasRoutes.js";


dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Jika Anda membutuhkan cookie atau header lainnya dari client
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet()) // biar keren

app.use("/api/", adminRoutes); // Untested!
app.use("/api/", guruRoutes); // Testing passed
app.use("/api/", jawabanRoutes); // Testing passed
app.use("/api/", kelasRoutes); // Testing passed
app.use("/api/", mapelRoutes); // Testing passed
app.use('/api/', nilaiRoutes) //Untested!
app.use("/api/", siswaRoutes); // Testing passed
app.use('/api/', soalRoutes) //Untested!
app.use('/api/', ujianRoutes) //Untested!

app.use("/api/", relGuruMapelRoutes); // Testing passed
app.use("/api/", relMapelKelasRoutes); // Testing passed
app.use("/api/", relSiswaSoalRoutes); // Untested!
app.use("/api/", relSoalMapelKelasRoutes); // Untested!

app.get('/input', (req, res) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'nonce-randomNonce';");
  res.render('inputSoal')
})

//konfigurasi multer untuk penyimpanan sementara file yang di unggah
const upload = multer({dest: 'uploads/'})

// app.post('/submit', async (res,req) => {
//   const {answer} = req.body
// })

app.post('/convert', upload.single('file'), async (req: Request, res: Response) => {
  try {
      if (!req.file) {
          return res.status(400).send('No file uploaded');
      }

      const inputPath = req.file.path;
      const dataBuffer = await fs.readFile(inputPath);
      const { value: html } = await mammoth.convertToHtml({ buffer: dataBuffer });

      // Hapus file yang diunggah setelah konversi
      await fs.unlink(inputPath);

      res.send(html);
  } catch (error: any) {
      res.status(500).send('Error: ' + error.message);
  }
});

//====================UNIT TESTING==================================
//01. Testing Passed! [NEEED REVIEW]
import authRoutes from "./backend/routes/middleware/authRoutes.js";
app.use('/api/', authRoutes)

app.listen(7772, () => console.log(`Server started on port 7772`));