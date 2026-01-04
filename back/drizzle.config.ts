import { defineConfig } from 'drizzle-kit'
import { env } from './server/env.ts'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './server/db/schema/**.ts',
  out: './server/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
