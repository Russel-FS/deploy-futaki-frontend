import React from "react";
import { Container } from "@/shared/ui/container";

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-border/50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Futeki</h2>
            <p className="text-secondary max-w-sm">
              Trascendiendo los límites de la tecnología funcional para crear experiencias extraordinarias. Elegancia en cada código, minimalismo en cada píxel.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Enlaces</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><a href="#catalog" className="hover:text-primary transition-colors">Catálogo</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Soporte</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20 text-xs text-secondary/60">
          <p>© 2026 Futeki Corporation. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Perú</span>
            <span>Global</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
