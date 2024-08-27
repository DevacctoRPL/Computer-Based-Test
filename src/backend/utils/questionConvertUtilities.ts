// services/questionConvertServices.js
import fs from 'fs/promises';
import mammoth from 'mammoth';

interface ConversionResult {
    html: string;
    error?: string;
}

export const convertDocxToHtml = async (filePath: string): Promise<ConversionResult> => {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const { value: html } = await mammoth.convertToHtml({ buffer: dataBuffer });

        // Hapus file sementara setelah konversi
        await fs.unlink(filePath);

        return { html };
    } catch (error: any) {
        // Hapus file jika terjadi kesalahan
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.error('Failed to delete file:', unlinkError);
        }
        return { html: '', error: error.message };
    }
};
