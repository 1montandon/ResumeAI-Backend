import { Router } from "express";
import { analyzeResumeController, getAnalysesController, getSingleAnalysisController } from "../controllers/analysis";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})
const analyzeRoutes: Router = Router()

analyzeRoutes.post('/', upload.single('resume'), analyzeResumeController)
analyzeRoutes.get('/', getAnalysesController)
analyzeRoutes.get('/:id', getSingleAnalysisController)

export default analyzeRoutes