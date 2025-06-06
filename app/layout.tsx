import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fuentePrincipal = Geist({
  variable: "--fuente-principal",
  subsets: ["latin"],
});

const fuenteCodigo = Geist_Mono({
  variable: "--fuente-codigo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aplicación Inicial",
  description: "Interfaz construida con Next.js",
};

export default function EstructuraRaiz({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${fuentePrincipal.variable} ${fuenteCodigo.variable}`}>
        {children}
      </body>
    </html>
  );
}
