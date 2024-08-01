import express from "express";
import cors from "cors";
import userRoutes from "./backend/routes/siswaRoutes.js";
import mapelRoutes from "./backend/routes/mapelRoutes.js";
import kelasRoutes from "./backend/routes/kelasRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", userRoutes); //Testing passed
app.use("/api/", mapelRoutes); // Testing passed
app.use("/api/", kelasRoutes); // Testing passed
app.listen(7772, () => console.log(`Server started on port 7772`));
