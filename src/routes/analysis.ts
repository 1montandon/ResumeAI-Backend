import { Router } from "express";
import { analyzeResumeController, deleteSingleAnalysisController, getAnalysesController, getSingleAnalysisController } from "../controllers/analysis";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})
const analyzeRoutes: Router = Router()

/**
 * @openapi
 * /analysis:
 *   post:
 *     summary: Analyze a resume.
 *     description: Upload a resume file and receive an AI-generated analysis.
 *     tags:
 *       - Analysis
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Analysis result returned successfully.
 *       400:
 *         description: Bad request or invalid file upload.
 *       401:
 *         description: Unauthorized.
 */
analyzeRoutes.post('/', upload.single('resume'), analyzeResumeController)

/**
 * @openapi
 * /analysis:
 *   get:
 *     summary: Get all resume analyses for the authenticated user.
 *     tags:
 *       - Analysis
 *     responses:
 *       200:
 *         description: List of analyses retrieved.
 *       401:
 *         description: Unauthorized.
 */
analyzeRoutes.get('/', getAnalysesController)

/**
 * @openapi
 * /analysis/{id}:
 *   get:
 *     summary: Get a specific resume analysis.
 *     tags:
 *       - Analysis
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Analysis ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analysis details returned.
 *       404:
 *         description: Analysis not found.
 *       401:
 *         description: Unauthorized.
 */
analyzeRoutes.get('/:id', getSingleAnalysisController)

/**
 * @openapi
 * /analysis/{id}:
 *   delete:
 *     summary: Delete a specific resume analysis.
 *     tags:
 *       - Analysis
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Analysis ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analysis deleted.
 *       404:
 *         description: Analysis not found.
 *       401:
 *         description: Unauthorized.
 */
analyzeRoutes.delete('/:id', deleteSingleAnalysisController)


export default analyzeRoutes