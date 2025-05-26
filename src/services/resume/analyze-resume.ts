import { generateText } from "ai";
import { google } from "../../config/geminiai";
import fs from "fs";

export async function analyzeResume(resumePath: string, jobDescription: string) {
  const result = await generateText({
    model: google,
    messages: [
      {
        role: "system",
        content:
          "You are an AI recruiter. Your task is to analyze how well a candidate’s resume matches a job description. Be precise and give reasons for your evaluation.",
      },
      {
        role: "user",
        content: [
          {type: "text", text: "Heres the job description"},
          {
            type: "text",
            text: jobDescription
          }
        ]
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
