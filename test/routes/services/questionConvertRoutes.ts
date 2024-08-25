// routes/questionConvertRoutes.js
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { convertDocxToHtml } from '../../../src/backend/utils/questionConvertUtilities.js';

const questionConvertRoutes = Router();

// Konfigurasi multer untuk penyimpanan sementara file yang diunggah
const upload = multer({ dest: 'uploads/' });  // Perbaiki jalur penyimpanan jika perlu

// Route untuk menangani konversi file DOCX ke HTML
questionConvertRoutes.post('/convert', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const inputPath = req.file.path;
        const { html, error } = await convertDocxToHtml(inputPath);

        if (error) {
            return res.status(500).send('Error: ' + error);
        }

        res.send(html);
    } catch (error: any) {
        res.status(500).send('Error: ' + error.message);
    }
});

export default questionConvertRoutes;
