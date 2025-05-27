import { Router } from "express";
import { analyzeResumeController, getAnalyzesController } from "../controllers/resume";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})
const resumeRoutes: Router = Router()

resumeRoutes.post('/', upload.single('resume'), analyzeResumeController)
resumeRoutes.get('/', getAnalyzesController)

export default resumeRoutes