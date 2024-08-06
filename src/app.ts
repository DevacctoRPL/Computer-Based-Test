import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config.js";
import * as BackendRouter from "./backend/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/", BackendRouter.siswaRoutes); // Testing passed
app.use("/api/", BackendRouter.mapelRoutes); // Testing passed
app.use("/api/", BackendRouter.kelasRoutes); // Testing passed
app.use("/api/", BackendRouter.guruRoutes); // Testing passed
app.use("/api/", BackendRouter.relGuruMapelRoutes); // Testing passed
app.use("/api/", BackendRouter.relMapelKelasRoutes); // Testing passed
app.use("/api/", BackendRouter.soalRoutes); // Untested!
app.use("/api/", BackendRouter.ujianRoutes); // Untested!


// ====================UNIT TESTING==================================
// 01. Testing Passed! [NEEED REVIEW]
app.use("/api/", BackendRouter.authRoutes);

app.listen(7772, () => console.log("Server started on port 7772"));
