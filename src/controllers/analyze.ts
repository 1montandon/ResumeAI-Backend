import { Response, Request, NextFunction } from "express"
import { analyzeResume } from "../services/analyze/analyze-resume";
import { AuthRequest } from "../middlewares/auth";
import HttpError from "../error/error";
import { getAnalyzes } from "../services/analyze/get-analyze";
import { getSingleAnalyzes } from "../services/analyze/get-single-analyze";


export const analyzeResumeController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const resumePath: string = req.file.path;
    const jobDescription: string = req.body.description;
    try {        
        const analyze = await analyzeResume(resumePath, jobDescription, req.userID.id)
        res.status(200).json(analyze)
    }
    catch (error: unknown) {
        console.log(error)
        next(error) 
    }}

export const getAnalyzesController = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const userID =req.userID.id
    try{
        const analyses = await getAnalyzes(userID)
        res.status(200).json(analyses)
    }catch(error: unknown){
        next(error)
    }

}

export const getSingleAnalyzesController = async(req: AuthRequest, res:Response, next: NextFunction)=>{
    const userId = req.userID.id;
    const analyzeId = req.params.id ;
    try{
        const analyze = await getSingleAnalyzes(userId, analyzeId)
        res.status(200).json(analyze)
    }
    catch(error){
        next(error)
    }
}