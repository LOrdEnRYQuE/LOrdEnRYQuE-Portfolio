import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  });
  
  if (!user) {
    console.log("User test@example.com not found!");
    return;
  }
  
  console.log(`User ID for test@example.com: ${user.id}`);
  
  const agents = await prisma.agent.findMany();
  console.log(`Total agents in DB: ${agents.length}`);
  
  for (const agent of agents) {
    if (agent.userId !== user.id) {
      console.log(`Re-assigning agent ${agent.name} (${agent.id}) to test user...`);
      await prisma.agent.update({
        where: { id: agent.id },
        data: { userId: user.id }
      });
    }
  }
  
  console.log("Done!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
