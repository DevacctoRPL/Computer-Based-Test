import { Router } from "express";
import { login } from '../../test/controllers/siswaController.js';
const authRoutes = Router();
authRoutes.post("/auth", login);
export default authRoutes;
