
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkUser() {
  const email = 'hello@lordenryque.com';
  const password = 'admin_password_2026';

  console.log('--- Database Check ---');
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log(`User with email ${email} NOT found.`);
    
    // Let's see what users DO exist
    const allUsers = await prisma.user.findMany({
      select: { email: true, role: true }
    });
    console.log('Existing users:', allUsers);
  } else {
    console.log('User found:', { email: user.email, role: user.role, hasPassword: !!user.password });
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
  }

  await prisma.$disconnect();
}

checkUser().catch(err => {
  console.error(err);
  process.exit(1);
});
