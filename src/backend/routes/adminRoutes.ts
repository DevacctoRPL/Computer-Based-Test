import { Router } from 'express';
import AdminController from '../controllers/adminController.js';

const adminRoutes = Router();

adminRoutes.get('/admin', AdminController.getAllAdmin);
adminRoutes.get('/admin/:id', AdminController.getAdminById);
adminRoutes.post('/admin', AdminController.addAdmin);
adminRoutes.put('/admin/:id', AdminController.updateAdmin);
adminRoutes.delete('/admin/:id', AdminController.deleteAdmin);

export default adminRoutes;
