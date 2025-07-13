import { Router } from 'express';
import multer from 'multer';
import {
    analyzeResumeController,
    deleteSingleAnalysisController,
    getAnalysesController,
    getSingleAnalysisController,
} from '../controllers/analysis.ts';

const upload = multer({ dest: 'uploads/' });
const analyzeRoutes: Router = Router();

analyzeRoutes.post('/', upload.single('resume'), analyzeResumeController);
analyzeRoutes.get('/', getAnalysesController);
analyzeRoutes.get('/:id', getSingleAnalysisController);
analyzeRoutes.delete('/:id', deleteSingleAnalysisController);

export default analyzeRoutes;
