import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const tables = [
    'user',
    'project',
    'agent',
    'agentConversation',
    'agentMessage',
    'agentKnowledgeDocument',
    'stage',
    'document'
  ];

  console.log("--- DATABASE ROW COUNTS ---");
  for (const table of tables) {
    try {
      const count = await (prisma as any)[table].count();
      console.log(`${table}: ${count}`);
    } catch (e) {
      console.log(`${table}: (error or table doesn't exist)`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
