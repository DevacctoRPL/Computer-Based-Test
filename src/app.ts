import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv'

import userRoutes from "./backend/routes/siswaRoutes.js";
import mapelRoutes from "./backend/routes/mapelRoutes.js";
import kelasRoutes from "./backend/routes/kelasRoutes.js";
import guruRoutes from "./backend/routes/guruRoutes.js";
import relGuruMapelRoutes from "./backend/routes/relGuruMapelRoutes.js";
import relMapelKelasRoutes from "./backend/routes/relMapelKelasRoutes.js";
// import routerbejir from "./backend/test/bejircog.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet()) // biar keren

app.use("/api/", userRoutes); // Testing passed
app.use("/api/", mapelRoutes); // Testing passed
app.use("/api/", kelasRoutes); // Testing passed
app.use("/api/", guruRoutes); // Testing passed
app.use("/api/", relGuruMapelRoutes); // Testing passed
app.use("/api/", relMapelKelasRoutes); // Testing passed


//====================UNIT TESTING==================================
//01. Testing Passed! [NEEED REVIEW]
import authRoutes from "./backend/routes/middleware/authRoutes.js";
app.use('/api/', authRoutes)

app.listen(7772, () => console.log(`Server started on port 7772`));