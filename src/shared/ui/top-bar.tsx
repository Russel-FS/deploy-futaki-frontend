import React from "react";
import { Container } from "./container";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
import { COMPANY_CONFIG } from "@/core/config/company.config";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-accent/50 text-[11px] font-medium py-2 border-b border-border/30 hidden md:block">
      <Container className="flex justify-between items-center text-secondary">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-primary" />
            <span>{COMPANY_CONFIG.contact.phoneDisplay}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-primary" />
            <span>{COMPANY_CONFIG.contact.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 border-r border-border pr-6">
            <a href={COMPANY_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-3.5 h-3.5 hover:text-foreground cursor-pointer transition-colors" />
            </a>
            <a href={COMPANY_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="w-3.5 h-3.5 hover:text-foreground cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
