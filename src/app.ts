import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import adminRoutes from "../src/backend/routes/adminRoutes.js"; //Admin Routes
import detailUjianRoutes from "../src/backend/routes/detail_ujianRoutes.js";
import guruRoutes from "../src/backend/routes/guruRoutes.js";
import jawabanPertanyaanRoutes from "../src/backend/routes/jawaban_pertanyaanRoutes.js";
import jawabanSiswaRoutes from "../src/backend/routes/jawaban_siswaRoutes.js";
import kelasRoutes from "../src/backend/routes/kelasRoutes.js";
import mapelRoutes from "../src/backend/routes/mapelRoutes.js";
import nilaiSiswaRoutes from "../src/backend/routes/nilai_siswaRoutes.js";
import pertanyaanRoutes from "../src/backend/routes/pertanyaanRoutes.js";
import siswaRoutes from "../src/backend/routes/siswaRoutes.js";
import ujianRoutes from "../src/backend/routes/ujianRoutes.js";

// import relGuruKelasRoutes from "./backend/routes/rel_guru_kelasRoutes.js";
// import relGuruMapelRoutes from "./backend/routes/rel_guru_mapelRoutes.js";
// import relKelasMapelRoutes from "./backend/routes/rel_kelas_mapelRoutes.js";
// import relSoalKelasRoutes from "./backend/routes/rel_soal_kelasRoutes.js";

dotenv.config();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Jika Anda membutuhkan cookie atau header lainnya dari client
};

const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet()); // biar keren

// Register routes
app.use("/api/", adminRoutes); // Tested Passed!
app.use("/api/", detailUjianRoutes); // Tested Passed!
app.use("/api/", guruRoutes); // Tested Passed!
app.use("/api/", jawabanPertanyaanRoutes); // Untested!
app.use("/api/", jawabanSiswaRoutes); // Untested!
app.use("/api/", kelasRoutes); // Untested!
app.use("/api/", mapelRoutes); // Tested Passed!
app.use("/api/", nilaiSiswaRoutes); // Untested!
app.use("/api/", pertanyaanRoutes); // Untested!
app.use("/api/", siswaRoutes); // Untested!
app.use("/api/", ujianRoutes); // Untested!

// app.use('/api/', relGuruKelasRoutes); // Untested!
// app.use('/api/', relGuruMapelRoutes); // Untested!
// app.use('/api/', relKelasMapelRoutes); // Untested!
// app.use('/api/', relSoalKelasRoutes); // Untested!

//====================UNIT TESTING==================================
//01. Authentication Checking Routes : Testing Passed! [NEEED REVIEW]
import authRoutes from "../src/backend/routes/middleware/authRoutes.js";
app.use("/api/", authRoutes);
//02. Converter DOCX to HTML : Untested! [NEEED REVIEW]
import questionConvertRoutes from "../src/backend/routes/services/questionConvertRoutes.js";
app.use("/api/", questionConvertRoutes);
//==================================================================

//Start Server
app.listen(7772, () =>
  console.log(`Server started on port 7772 - UNIT PRODUCTION`)
);
