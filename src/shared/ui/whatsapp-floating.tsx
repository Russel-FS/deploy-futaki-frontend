"use client";

import React from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./whatsapp-icon";
import { COMPANY_CONFIG } from "@/core/config/company.config";

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappNumber = COMPANY_CONFIG.contact.whatsapp;
  const message = encodeURIComponent(COMPANY_CONFIG.whatsappMessages.default);
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-100 bg-[#25D366] text-white p-3 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute -top-12 right-0 bg-background border border-border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg text-foreground">
        ¡Hola! ¿En qué podemos ayudarte?
      </div>
      <WhatsAppIcon className="w-8 h-8" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
    </motion.a>
  );
};
