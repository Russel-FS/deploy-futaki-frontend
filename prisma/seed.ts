import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(
    "Seeding database con usuario admin por defecto (Idempotente)...",
  );

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@futeki.com" },
    update: {},
    create: {
      email: "admin@futeki.com",
      password: hashedPassword,
      name: "Super Admin",
      role: "ADMIN",
    },
  });

  console.log(`Admin creado: ${admin.email}`);
  console.log("El seed se ejecutó correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
