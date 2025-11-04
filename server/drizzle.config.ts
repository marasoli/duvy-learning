import { defineConfig } from 'drizzle-kit'
import { env } from './env.ts'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './database/schema/**.ts',
  out: './database/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
