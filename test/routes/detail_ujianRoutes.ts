import { Router } from 'express';
import UjianController from '../controllers/detail_ujianController.js';

const detailUjianRoutes = Router();

// Route to get detail ujian by ID
detailUjianRoutes.get('/detail-ujian/:id', UjianController.getDetailUjianById);

// Route to add a new detail ujian
detailUjianRoutes.post('/detail-ujian', UjianController.addDetailUjian);

// Route to update an existing detail ujian by ID
detailUjianRoutes.put('/detail-ujian/:id', UjianController.updateDetailUjian);

// Route to delete a detail ujian by ID
detailUjianRoutes.delete('/detail-ujian/:id', UjianController.deleteDetailUjian);

// Route to get all detail ujian or filter by query parameters
detailUjianRoutes.get('/detail-ujian', UjianController.getAllDetailUjian);

//GetExamForStudents
detailUjianRoutes.get('/today-exam', UjianController.getExamsForToday);

export default detailUjianRoutes;
