export const COMPANY_CONFIG = {
  name: "Futeki",
  fullName: "Futeki Technology",
  tagline: "Tecnología Inspirada",
  description: "Landing page profesional de Futeki con catálogo de productos y blog informativo.",
  contact: {
    phone: "+51 900 000 000",
    phoneDisplay: "+51 900 000 000",
    whatsapp: "51900000000",
    email: "contacto@futeki.com",
    address: "Lima, Perú",
  },
  socials: {
    instagram: "https://instagram.com/futeki",
    facebook: "https://facebook.com/futeki",
    twitter: "https://twitter.com/futeki",
  },
  whatsappMessages: {
    default: "Hola Futeki, deseo consultar sobre sus productos.",
    productQuery: (productName: string, price: string) => 
      `Hola Futeki, estoy interesado en el producto: ${productName} (Precio: ${price}). ¿Podrían darme más información?`,
  }
};
