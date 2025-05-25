import { Response, Request, NextFunction } from "express"
import { analyzeResume } from "../services/resume/analyze-resume";

export const analyzeResumeController = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const resumePath: string = req.file.path;
    try {        
        const analyze = await analyzeResume(resumePath)
        console.log(analyze)
        res.status(201).json(analyze)
    }
    catch (error: unknown) {
        console.log(error)
        next(error) 
    }}
