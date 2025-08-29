import { handleUpload } from '../../config/cloudinary.ts';
import { geminiAnalyzeResume } from '../../config/geminiai.ts';
import prisma from '../../prisma/client.ts';
import type { Analysis } from '../../types/analysis.ts';

export async function analyzeResume(
  resumeFile: Express.Multer.File,
  jobDescription: string,
  userId: string
): Promise<Analysis> {
  const resumeBuffer = resumeFile.buffer;

  const aiAnalysis = await geminiAnalyzeResume(resumeFile, jobDescription);
  const parsedResult = JSON.parse(aiAnalysis);
  const b64 = resumeBuffer.toString('base64');
  const dataURI = `data:${resumeFile.mimetype};base64,${b64}`;
  const cldRes = await handleUpload(dataURI);

  const analysis = await prisma.analyses.create({
    data: {
      jobDescription,
      resumeUrl: cldRes.url,
      score: parsedResult.compatibility, // Usa o compatibility do parsedResult
      strengths: JSON.stringify(parsedResult.strong), // Converte array para string JSON
      weaknesses: JSON.stringify(parsedResult.weaks), // Converte array para string JSON
      overview: parsedResult.summary, // Usa o summary do parsedResult
      user: {
        connect: { id: userId },
      },
    },
  });
  return analysis; // Retorna o objeto de análise criado no Prisma
}
