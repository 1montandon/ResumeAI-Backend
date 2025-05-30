import { Response, Request, NextFunction } from "express"
import { analyzeResume } from "../services/analysis/analyze-resume";
import { AuthRequest } from "../middlewares/auth";
import HttpError from "../error/error";
import { getAnalyses } from "../services/analysis/get-analyses";
import { getSingleAnalysis } from "../services/analysis/get-single-analysis";
import { Analysis } from "../types/analysis";
import { deleteSingleAnalysis } from "../services/analysis/delete-resume";


export const analyzeResumeController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    }
    if (!req.file || !req.file.path) {
        throw new HttpError(400, "No file Uploaded!")
    }
    const userID: string = req.userID.id
    const resumePath: string = req.file.path;
    const jobDescription: string = req.body.description;
    try {        
        const analysis = await analyzeResume(resumePath, jobDescription, userID)
        res.status(200).json(analysis)
    }
    catch (error: unknown) {
        next(error) 
    }}

export const getAnalysesController = async(req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    }
    const userID =req.userID.id
    try{
        const analyses = await getAnalyses(userID)
        res.status(200).json(analyses)
    }catch(error: unknown){
        next(error)
    }

}

export const getSingleAnalysisController = async(req: AuthRequest, res:Response, next: NextFunction)=>{
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    }
    
    const userID = req.userID.id;
    const analysisId = req.params.id ;
    try{
        const analysis = await getSingleAnalysis(userID, analysisId)
        res.status(200).json(analysis)
    }
    catch(error){
        next(error)
    }
}

export const deleteSingleAnalysisController = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    if(!req.userID){
        throw new HttpError(401, "Unauthorized!")
    } ;
    if(!req.params.id){
        throw new HttpError(401, "No id!")
    }
    const userID = req.userID.id
    const analysisId = req.params.id ;
    try{
        const deletedAnalysis = await deleteSingleAnalysis(userID, analysisId)
        console.log(deletedAnalysis)
        res.status(200).json(`Analyses ${deletedAnalysis.id} deleted!`)
    }catch(error){
        next(error)
    }
}