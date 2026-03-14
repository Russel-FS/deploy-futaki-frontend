export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  stock: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Futeki Ultra Slim",
    description: "La elegancia hecha tecnología. Un dispositivo diseñado para los que buscan perfección en cada detalle.",
    price: "$1,299",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1511384019091-6f1b1c2b1897?q=80&w=1000&auto=format&fit=crop",
    stock: 12,
  },
  {
    id: "2",
    name: "Futeki Core X",
    description: "Potencia sin límites. El procesador más avanzado en un cuerpo de aluminio aeroespacial.",
    price: "$1,899",
    category: "Pro",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop",
    stock: 5,
  },
  {
    id: "3",
    name: "Futeki Air Watch",
    description: "Tu salud y productividad en tu muñeca. Pantalla Retina siempre activa.",
    price: "$499",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1544117518-2b462fca5631?q=80&w=1000&auto=format&fit=crop",
    stock: 20,
  },
  {
    id: "4",
    name: "Futeki Sound Max",
    description: "Sonido inmersivo con cancelación de ruido activa de última generación.",
    price: "$349",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    stock: 8,
  }
];
