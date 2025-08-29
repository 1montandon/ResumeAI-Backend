import type { NextFunction, Response } from 'express';
import HttpError from '../error/error.ts';
import type { AuthRequest } from '../middlewares/auth.ts';
import { analyzeResume } from '../services/analysis/analyze-resume.ts';
import { deleteSingleAnalysis } from '../services/analysis/delete-resume.ts';
import { getAnalyses } from '../services/analysis/get-analyses.ts';
import { getSingleAnalysis } from '../services/analysis/get-single-analysis.ts';

export const analyzeResumeController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new HttpError(401, 'Unauthorized!');
  }
  if (!req?.file) {
    throw new HttpError(400, 'No file Uploaded!');
  }
  const userID: string = req.userID;
  const resumeFile: Express.Multer.File = req.file;
  const jobDescription: string = req.body.description;
  try {
    const analysis = await analyzeResume(resumeFile, jobDescription, userID);
    res.status(200).json(analysis);
  } catch (error: unknown) {
    next(error);
  }
};

export const getAnalysesController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new HttpError(401, 'Unauthorized!');
  }
  const userID = req.userID;
  try {
    const analyses = await getAnalyses(userID);
    res.status(200).json(analyses);
  } catch (error: unknown) {
    next(error);
  }
};

export const getSingleAnalysisController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new HttpError(401, 'Unauthorized!');
  }

  const userID = req.userID;
  const analysisId = req.params.id;
  try {
    const analysis = await getSingleAnalysis(userID, analysisId);
    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
};

export const deleteSingleAnalysisController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new HttpError(401, 'Unauthorized!');
  }
  if (!req.params.id) {
    throw new HttpError(401, 'No id!');
  }
  const userID = req.userID;
  const analysisId = req.params.id;
  try {
    const deletedAnalysis = await deleteSingleAnalysis(userID, analysisId);
    res.status(200).json(`Analyses ${deletedAnalysis.id} deleted!`);
  } catch (error) {
    next(error);
  }
};
