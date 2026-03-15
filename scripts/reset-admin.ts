import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();
  const email = 'hello@lordenryque.com';
  const password = 'admin_password_2026';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'System Admin'
    },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'System Admin'
    }
  });

  console.log('Admin user provisioned successfully:');
  console.log({
    email: user.email,
    name: user.name,
    role: user.role,
    password: password
  });

  await prisma.$disconnect();
}

main().catch(console.error);
