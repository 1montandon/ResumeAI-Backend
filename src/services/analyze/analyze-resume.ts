import fs from "fs";
import { generateText } from "ai";
import { google } from "../../config/geminiai";
import prisma from "../../prisma/client";

/**
 * Extracts a JSON string from a Markdown code block.
 * @param markdownString The string potentially containing a Markdown code block with JSON.
 * @returns The extracted JSON string, or null if not found.
 */
function extractJsonFromMarkdown(markdownString: string): string | null {
  const jsonBlockRegex = /```json\n([\s\S]*?)\n```/;
  const match = markdownString.match(jsonBlockRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export async function analyzeResume(
  resumePath: string,
  jobDescription: string,
  userId: string
) {
  const resumeBuffer = fs.readFileSync(resumePath);

  const result = await generateText({
    model: google,
    system: `You are an expert AI assistant designed to analyze job applications. Your goal is to provide candidates with a precise assessment of how well their resume aligns with a given job description.`,
    messages: [
      {
        role: "user",
        content: `Analyze the provided resume against the job description and generate a JSON object.

          Your output MUST be a valid JSON object. DO NOT include any additional text or Markdown code blocks outside or inside of the JSON object itself.

          Follow this exact schema:
          {
            "strong": ["point1", "point2", "point3"], // Exactly 3 strong points highly relevant to the job description.
            "weaks": ["point1", "point2", "point3"],  // Exactly 3 weak points relative to the job description (areas for improvement or missing skills).
            "experience": "junior" | "mid" | "senior", // Categorize the overall experience level as junior, mid, or senior.
            "compatibility": number, // A floating-point number between 0.0 and 1.0 (e.g., 0.75), indicating the compatibility score.
            "summary": string // A concise overview (maximum 100 words) of the resume's compatibility with the job, highlighting key alignments and gaps.
          }`,
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Here is the job description:" },
          { type: "text", text: jobDescription },
          { type: "text", text: "And here is the candidate's resume:" },
          {
            type: "file",
            mimeType: "application/pdf",
            data: resumeBuffer,
          },
        ],
      },
    ],
  });

  // Attempt to extract JSON from markdown if present
  const jsonString = extractJsonFromMarkdown(result.text);
  let parsedResult: any = null; // Inicializa parsedResult

  if (jsonString) {
    parsedResult = JSON.parse(jsonString);
  } else {
    try {
      parsedResult = JSON.parse(result.text);
    } catch (error) {
      console.error("Failed to parse JSON directly from result.text:", error);
      throw new Error("Failed to parse analysis result from AI.");
    }
  }
  console.log(userId)
  if (parsedResult) {
    const analysis = await prisma.analyses.create({
      data: {
        jobDescription,
        resumeUrl: resumePath,
        score: parsedResult.compatibility, // Usa o compatibility do parsedResult
        strengths: JSON.stringify(parsedResult.strong), // Converte array para string JSON
        weaknesses: JSON.stringify(parsedResult.weaks), // Converte array para string JSON
        overview: parsedResult.summary, // Usa o summary do parsedResult
        user: {
          connect: {id: userId}
        }
      },
    });
    return analysis; // Retorna o objeto de análise criado no Prisma
  } else {
    // Caso parsedResult seja nulo (nenhum JSON foi extraído/parseado)
    throw new Error("Analysis data could not be parsed from AI response.");
  }
}