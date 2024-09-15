import { Router } from "express";
// import { login } from '../../test/controllers/siswaController.js';
import { login } from "../../controllers/loginController.js";

const authRoutes = Router();

authRoutes.post("/auth", login);

export default authRoutes
