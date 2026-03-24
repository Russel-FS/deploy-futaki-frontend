import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const category = await prisma.category.create({
    data: {
      name: "Smartphones",
      description: "Los mejores dispositivos móviles del mercado.",
    },
  });

  console.log("categoria creada:", category.name);

  const product = await prisma.product.create({
    data: {
      name: "Futeki Phone 1",
      description: "Un smartphone elegante con diseño minimalista.",
      price: 999.0,
      stock: 15,
      categoryId: category.id,
    },
  });

  console.log("producto creado:", product.name);
  console.log("El seed se ejecuto correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
