"use client";

import { Toaster as HotToaster, toast } from "react-hot-toast";

export { toast };

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#1C1C1E",
          fontSize: "13px",
          fontWeight: "500",
          borderRadius: "14px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
          padding: "12px 16px",
          maxWidth: "360px",
        },
        success: {
          iconTheme: {
            primary: "#34C759",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF3B30",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};
