export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  stock: number;
  specs?: {
    label: string;
    value: string;
  }[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "MacBook Pro M3 Max",
    description: "La potencia definitiva para profesionales. Pantalla Liquid Retina XDR de 16 pulgadas.",
    price: "S/ 14,999",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    stock: 3,
    specs: [
      { label: "Chip", value: "M3 Max" },
      { label: "RAM", value: "32GB" },
      { label: "SSD", value: "1TB" }
    ]
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    description: "Titanio Aeroespacial. El sistema de cámaras más avanzado en un iPhone.",
    price: "S/ 5,899",
    category: "Móviles",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop",
    stock: 8,
    specs: [
      { label: "Pantalla", value: "6.7\"" },
      { label: "Cámara", value: "48MP" },
      { label: "Chip", value: "A17 Pro" }
    ]
  },
  {
    id: "3",
    name: "iPad Pro M2",
    description: "Experiencia iPad definitiva. Compatible con Apple Pencil y Magic Keyboard.",
    price: "S/ 4,299",
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    stock: 5,
    specs: [
      { label: "Pantalla", value: "12.9\"" },
      { label: "Almacen.", value: "256GB" },
      { label: "Chip", value: "M2" }
    ]
  },
  {
    id: "4",
    name: "AirPods Max",
    description: "Audio de alta fidelidad. Cancelación activa de ruido y sonido espacial.",
    price: "S/ 2,499",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop",
    stock: 12,
    specs: [
      { label: "Audio", value: "Spatial" },
      { label: "Batería", value: "20h" }
    ]
  },
  {
    id: "5",
    name: "Dell XPS 15",
    description: "La mejor laptop Windows del mercado. Pantalla OLED 4K infinityEdge.",
    price: "S/ 8,599",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
    stock: 4,
    specs: [
      { label: "CPU", value: "i9 13th" },
      { label: "RAM", value: "32GB" },
      { label: "GPU", value: "RTX 4070" }
    ]
  }
];
