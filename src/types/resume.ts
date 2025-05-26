export interface ResumeAnalysis {
  strong: string[];
  weaks: string[];
  experience: "junior" | "mid" | "senior";
  compatibility: number; // 0-1
  summary: string;
}
