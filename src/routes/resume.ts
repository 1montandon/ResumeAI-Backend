import { Router } from "express";
import { analyzeResumeController } from "../controllers/resume";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})
const resumeRoutes: Router = Router()

resumeRoutes.post('/', upload.single('resume'), analyzeResumeController)

export default resumeRoutes