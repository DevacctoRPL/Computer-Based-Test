import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv'

import adminRoutes from "./routes/adminRoutes.js"; //Admin Routes
import detailUjianRoutes from "./routes/detail_ujianRoutes.js";
import guruRoutes from "./routes/guruRoutes.js"; 
import jawabanPertanyaanRoutes from "./routes/jawaban_pertanyaanRoutes.js";
import jawabanSiswaRoutes from "./routes/jawaban_siswaRoutes.js";
import kelasRoutes from "./routes/kelasRoutes.js";
import mapelRoutes from "./routes/mapelRoutes.js";
import nilaiSiswaRoutes from "./routes/nilai_siswaRoutes.js";
import pertanyaanRoutes from "./routes/pertanyaanRoutes.js";
import siswaRoutes from "./routes/siswaRoutes.js";
import ujianRoutes from "./routes/ujianRoutes.js";

// import relGuruKelasRoutes from "../routes/rel_guru_kelasRoutes.js";
// import relGuruMapelRoutes from "../routes/rel_guru_mapelRoutes.js";
// import relKelasMapelRoutes from "../routes/rel_kelas_mapelRoutes.js";
// import relSoalKelasRoutes from "../routes/rel_soal_kelasRoutes.js";


dotenv.config();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Jika Anda membutuhkan cookie atau header lainnya dari client
};

const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: '15mb',
    parameterLimit: 50000,
  }),
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet()) // biar keren

// app.use((req: Request, res: Response) => {
//   res.status(404).send("Maaf, tidak dapat melayani.");
// });

// Register routes
app.use('/api/', adminRoutes); // Tested Passed!
app.use('/api/', detailUjianRoutes); // Tested Passed!
app.use('/api/', guruRoutes); // Tested Passed!
app.use('/api/', jawabanPertanyaanRoutes); // Untested!
app.use('/api/', jawabanSiswaRoutes); // Untested!
app.use('/api/', kelasRoutes); // Untested!
app.use('/api/', mapelRoutes); // Tested Passed!
app.use('/api/', nilaiSiswaRoutes); // Untested!
app.use('/api/', pertanyaanRoutes); // Untested!
app.use('/api/', siswaRoutes); // Untested!
app.use('/api/', ujianRoutes); // Untested!

// app.use('/api/', relGuruKelasRoutes); // Untested!
// app.use('/api/', relGuruMapelRoutes); // Untested!
// app.use('/api/', relKelasMapelRoutes); // Untested!
// app.use('/api/', relSoalKelasRoutes); // Untested!


//====================UNIT TESTING==================================
//01. Authentication Checking Routes : Testing Passed! [NEEED REVIEW]
import authRoutes from "./routes/middleware/authRoutes.js";
app.use('/api/', authRoutes)
//02. Converter DOCX to HTML : Untested! [NEEED REVIEW]
import questionConvertRoutes from "./routes/services/questionConvertRoutes.js";
app.use('/api/', questionConvertRoutes)
//==================================================================

//Start Server
app.listen(7774, () => console.log(`Server started on port 7774 - UNIT DEVELOPMENT!`));