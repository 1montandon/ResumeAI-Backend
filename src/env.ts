import { z } from 'zod';

const DEFAULT_PORT = 3333;

const envSchema = z.object({
  PORT: z.coerce.number().default(DEFAULT_PORT),
  DATABASE_URL: z.string(),
  GEMINI_API_KEY: z.string(),
  JWT_SECRET: z.string()
});

export const env = envSchema.parse(process.env);

