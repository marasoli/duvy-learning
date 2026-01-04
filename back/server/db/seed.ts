import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { seedSchema } from './schema/seed-schema.ts'

await reset(db, seedSchema)

await seed(db, seedSchema).refine((f) => ({
  rooms: {
    count: 5,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum(),
    },
  },
  questions: {
    count: 20,
  },
}))

await sql.end()

console.log('\n > Database Seeded')
