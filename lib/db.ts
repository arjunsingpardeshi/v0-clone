
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const db = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
})

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = db
}

export default db