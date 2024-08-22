import { Router } from 'express';
import {
  getAllRelGuruMapel,
  getRelGuruMapelById,
  addRelGuruMapel,
  updateRelGuruMapel,
  deleteRelGuruMapel
} from '../test/controllers/rel_guru_mapelController.js';

const relGuruMapelRoutes = Router();

relGuruMapelRoutes.get('/rel_guru_mapel', getAllRelGuruMapel);
relGuruMapelRoutes.get('/rel_guru_mapel/:id', getRelGuruMapelById);
relGuruMapelRoutes.post('/rel_guru_mapel', addRelGuruMapel);
relGuruMapelRoutes.put('/rel_guru_mapel/:id', updateRelGuruMapel);
relGuruMapelRoutes.delete('/rel_guru_mapel/:id', deleteRelGuruMapel);

export default relGuruMapelRoutes;
