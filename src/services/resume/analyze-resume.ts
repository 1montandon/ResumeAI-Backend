import { generateText } from "ai";
import { google } from "../../config/geminiai";
import fs from "fs";

export async function analyzeResume(resumePath: string) {
  const result = await generateText({
    model: google,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is the file about?" },
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
