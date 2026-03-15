import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const agents = await prisma.agent.findMany()
  console.log('--- CURRENT AGENTS ---')
  console.log(JSON.stringify(agents, null, 2))
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
