import { PrismaClient } from '@prisma/client';

declare global {
  // избегаем ошибок типов при hot-reload
  var prisma: PrismaClient;
}

export const prisma =
  global.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
