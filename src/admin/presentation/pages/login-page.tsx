"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import FutakiLogo from "@/shared/ui/futaki-logo";

export const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-system-gray-6 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-4xl p-8 border border-border/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <FutakiLogo className="h-10 w-auto text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Futeki Admin</h1>
          <p className="text-sm font-medium text-secondary/60 mt-2">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-xs font-bold px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-system-gray-6 border border-transparent focus:bg-white focus:border-primary/30 h-12 px-5 rounded-xl text-sm font-medium transition-all outline-none"
              placeholder="admin@futeki.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-system-gray-6 border border-transparent focus:bg-white focus:border-primary/30 h-12 px-5 rounded-xl text-sm font-medium transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full mt-4"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Ingresar al Panel"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
