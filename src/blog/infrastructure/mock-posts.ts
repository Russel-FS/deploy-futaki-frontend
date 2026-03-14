export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "La visión detrás de Futeki",
    excerpt: "Descubre cómo nuestra filosofía de diseño minimalista está cambiando la industria tecnológica.",
    date: "14 Marzo, 2026",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Innovación en cada componente",
    excerpt: "Analizamos los materiales sostenibles utilizados en nuestros últimos productos.",
    date: "10 Marzo, 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  }
];
