import express from "express";
import userRoutes from "./backend/routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// redirect all http request to https
// app.use((req:express.Request, res:express.Response, next:()=> void) => req.secure ? next() : res.redirect(`https://${req.hostname}${req.url}`));
app.use("/api/", userRoutes);

app.listen(7772, () => console.log(`Server started on port 7772`));
