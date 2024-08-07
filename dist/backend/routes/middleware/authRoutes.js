import { Router } from "express";
import { login } from '../../controllers/siswaController.js';
const authRoutes = Router();
authRoutes.post("/auth", login);
export default authRoutes;
