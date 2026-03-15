const { PrismaClient } = require("@prisma/client");
const { projects } = require("../src/content/projects");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting portfolio migration...");

  for (const project of projects) {
    try {
      const existing = await prisma.portfolioProject.findUnique({
        where: { slug: project.slug },
      });

      if (existing) {
        console.log(`Project with slug ${project.slug} already exists. Skipping.`);
        continue;
      }

      await prisma.portfolioProject.create({
        data: {
          slug: project.slug,
          title: project.title,
          summary: project.summary,
          description: project.description,
          status: project.status,
          stack: JSON.stringify(project.stack),
          cover: project.cover,
          featured: project.featured,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          challenge: project.challenge,
          solution: project.solution,
          brief: project.brief,
        },
      });
      console.log(`Created project: ${project.title}`);
    } catch (error) {
      console.error(`Failed to migrate ${project.title}:`, error);
    }
  }

  console.log("Migration complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
