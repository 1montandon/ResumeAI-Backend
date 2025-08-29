import { GoogleGenAI, Type } from '@google/genai';
import { env } from '../env.ts';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const modelName = 'gemini-2.5-flash';

export async function geminiAnalyzeResume(
  resumeFile: Express.Multer.File,
  jobDescription: string
) {
  const prompt = `
You are an expert AI assistant specializing in job application analysis. Your primary function is to assess a candidate's resume against a specific job description and provide a precise, structured analysis.

Your task is to analyze the provided resume and job description and generate a single, valid JSON object as your response.

**JSON Schema:**
Strictly adhere to the following structure:
{
  "strong": [
    "string", // A strong point highly relevant to the job description.
    "string", // A second strong point.
    "string"  // A third strong point.
  ],
  "weaks": [
    "string", // A weak point or area for improvement relative to the job.
    "string", // A second weak point.
    "string"  // A third weak point.
  ],
  "compatibility": number, // A floating-point number between 0.0 and 1.0 representing the compatibility score.
  "summary": "string" // A concise overview (max 100 words) of the resume's alignment with the job, highlighting key strengths and gaps.
}

---

**Job Description:**
${jobDescription}

**Candidate's Resume:**
(The resume is provided in the attached file)
`;

  const resumeFileData = {
    inlineData: {
      data: resumeFile.buffer.toString('base64'),
      mimeType: resumeFile.mimetype,
    },
  };

  // 3. Construct the request payload with both text and file parts.
  const contents = [{ text: prompt }, resumeFileData];

  const result = await ai.models.generateContent({
    model: modelName,
    contents,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strong: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3,
            description:
              'An array of exactly 3 strings, each describing a strong point highly relevant to the job description.',
          },
          weaks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3,
            description:
              'An array of exactly 3 strings, each describing a weak point or area for improvement relative to the job.',
          },
          compatibility: {
            type: Type.NUMBER,
            minimum: 0.0,
            maximum: 1.0,
            description:
              'A floating-point number between 0.0 and 1.0 representing the compatibility score.',
          },
          summary: {
            type: Type.STRING,
            description:
              "A concise overview (maximum 100 words) of the resume's alignment with the job, highlighting key strengths and gaps.",
          },
        },
      },
    },
  });

  const responseText = result.text

  return responseText
}
