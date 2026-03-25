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
  console.log("Limpiando base de datos...");
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Seeding database con datos enriquecidos...");

  // Categorías
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Laptops",
        description: "Potencia y portabilidad para profesionales.",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200",
      },
    }),
    prisma.category.create({
      data: {
        name: "Gaming",
        description: "Equipos de alto rendimiento para jugadores.",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200",
      },
    }),
    prisma.category.create({
      data: {
        name: "Móviles",
        description: "La última tecnología en la palma de tu mano.",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
      },
    }),
    prisma.category.create({
      data: {
        name: "Accesorios",
        description: "Complementos esenciales para tu ecosistema.",
        imageUrl: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1200",
      },
    }),
  ]);

  console.log("Categorías creadas:", categories.length);

  // Productos
  const products = [
    {
      name: "MacBook Pro M3 Max",
      description: "El portátil más potente de Apple para flujos de trabajo extremos.",
      price: 3499.0,
      stock: 5,
      categoryId: categories[0].id,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200",
      specs: [
        { label: "Chip", value: "Apple M3 Max" },
        { label: "Memoria", value: "36GB RAM Unificada" },
        { label: "Almacenamiento", value: "1TB SSD" },
        { label: "Pantalla", value: "Liquid Retina XDR 14\"" },
      ],
    },
    {
      name: "iPhone 15 Pro",
      description: "Forjado en titanio. El iPhone más potente hasta la fecha.",
      price: 1199.0,
      stock: 12,
      categoryId: categories[2].id,
      imageUrl: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1200",
      specs: [
        { label: "Chip", value: "A17 Pro Bionic" },
        { label: "Cámara", value: "Sistema Pro 48MP" },
        { label: "Material", value: "Titanio Aeroespacial" },
        { label: "Puerto", value: "USB-C con USB 3" },
      ],
    },
    {
        name: "RTX 4090 Gaming OC",
        description: "La tarjeta gráfica definitiva para gaming en 4K.",
        price: 1899.0,
        stock: 3,
        categoryId: categories[1].id,
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1200",
        specs: [
          { label: "VRAM", value: "24GB GDDR6X" },
          { label: "Bus", value: "384-bit" },
          { label: "Núcleos CUDA", value: "16384" },
          { label: "Refrigeración", value: "Windforce 3X" },
        ],
      },
  ];

  for (const p of products) {
    const created = await prisma.product.create({ data: p });
    console.log("Producto creado:", created.name);
  }

  console.log("El seed se ejecutó correctamente con datos enriquecidos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
