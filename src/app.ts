import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv'

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

const app = express();

app.use(cors());
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

//====================UNIT TESTING==================================
//01. Testing Passed! [NEEED REVIEW]
import authRoutes from "./backend/routes/middleware/authRoutes.js";
app.use('/api/', authRoutes)

app.listen(7772, () => console.log(`Server started on port 7772`));