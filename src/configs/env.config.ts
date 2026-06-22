import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(4001),
  
  // database
  DB_TYPE: z.enum(['better-sqlite3', 'postgres']).default('better-sqlite3'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default('postgres'),
  DB_PASS: z.string().default('postgres'),
  DB_NAME: z.string().default('database.sqlite'),
  // DB_TYPE: z.enum(['better-sqlite3', 'postgres']).default('better-sqlite3'),
  // DB_HOST: z.string().default('localhost'),
  // DB_PORT: z.coerce.number().default(5432),
  // DB_USER: z.string().default('postgres'),
  // DB_PASS: z.string().default('postgres'),
  // DB_NAME: z.string().default('database.sqlite'),

  // auth
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z
    .string()
    .transform(val => parseInt(val))
    .default(36000),

  ALLOWED_HOSTS: z.string().optional(),

  // OpenAI
  OPENAI_API_KEY: z.string(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  GROQ_API_KEY: z.string(),
  GROQ_MODEL: z.string().default('openai/gpt-oss-20b'), // groq/compound (free - 250 req/day)
  GEMINI_API_KEY: z.string(),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}
const env = parsed.data;

// Export the parsed environment variables for use in your applicatio
export default env;
