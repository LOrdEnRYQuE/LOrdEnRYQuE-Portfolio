import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Ensure a user exists
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test Admin',
      }
    })
    console.log('Created test user:', user.id)
  }

  // 2. Create a test agent
  const agent = await prisma.agent.create({
    data: {
      name: 'LOrdEnRYQuE Luxury Concierge',
      description: 'A premium AI assistant for the elite.',
      personality: 'Sophisticated, articulate, and highly proactive. Speaks with a refined tone.',
      userId: user.id,
      config: JSON.stringify({
        name: 'LOrdEnRYQuE Luxury Concierge',
        personality: 'Sophisticated, articulate, and highly proactive. Speaks with a refined tone.',
        branding: {
          primaryColor: '#D4AF37',
          icon: 'bot',
          theme: 'dark'
        },
        knowledgeBase: [
          'We specialize in high-end design and AI implementation.',
          'Our portfolio includes the AI Agent Generator, the LOrdEnRYQuE Website, and high-performance React applications.'
        ]
      }),
      status: 'ACTIVE'
    }
  })
  console.log('--- CREATED TEST AGENT ---')
  console.log('ID:', agent.id)
  console.log('CONFIG:', agent.config)
  
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
