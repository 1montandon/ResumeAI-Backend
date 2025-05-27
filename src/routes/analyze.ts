import { Router } from "express";
import { analyzeResumeController, getAnalyzesController, getSingleAnalyzesController } from "../controllers/analyze";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})
const analyzeRoutes: Router = Router()

analyzeRoutes.post('/', upload.single('resume'), analyzeResumeController)
analyzeRoutes.get('/', getAnalyzesController)
analyzeRoutes.get('/:id', getSingleAnalyzesController)

export default analyzeRoutes