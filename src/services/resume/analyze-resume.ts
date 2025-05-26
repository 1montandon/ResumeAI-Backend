import { generateText } from "ai";
import { google } from "../../config/geminiai";
import fs from "fs";

export async function analyzeResume(
  resumePath: string,
  jobDescription: string
) {
  const result = await generateText({
    model: google,
    system: 'You are an AI helper used by candidates to now if the have a shot before sending a resume to a job description. Your task is to analyze how well a candidate’s resume matches a job description and inform the candidate. Be precise and give and return ONLY JSON',
    messages: [
      {
        role: "system",
        content: `Return only a valid json object without additional text.
        Follow this format:
    {
      "strong": ["points1", "points2", "points3"] - only 3 pointss, strong points realtive to the job description, 
      "weaks": ["points1", "points2", "points3" - only 3 pointss, weak realtive the job description], 
      "experience": "junior|mid|senior",
      "compatibility" : "0-1"
      "summary": "overview about the resume compatinilty with the job - max 100 words",    }
`,
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Heres the job description" },
          {
            type: "text",
            text: jobDescription,
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "text", text: "And here is the candidate's resume:" },
          {
            type: "file",
            mimeType: "application/pdf",
            data: fs.readFileSync(resumePath),
            filename: "example.pdf", // optional, not used by all providers
          },
        ],
      },
    ],
  });
  return result;
}
