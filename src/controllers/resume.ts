import { Response, Request, NextFunction } from "express"
import { analyzeResume } from "../services/resume/analyze-resume";
import { AuthRequest } from "../middlewares/auth";


export const analyzeResumeController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const resumePath: string = req.file.path;
    const jobDescription: string = req.body.description
    try {        
        const analyze = await analyzeResume(resumePath, jobDescription, req.userID.id)
        console.log(analyze)
        res.status(201).json(analyze)
    }
    catch (error: unknown) {
        console.log(error)
        next(error) 
    }}
