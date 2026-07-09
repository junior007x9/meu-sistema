import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Ótica & UTI dos Óculos",
  description: "Plataforma completa de gestão comercial, ordens de serviço e financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-slate-50 text-slate-950 antialiased`}>
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          {/* Menu de Navegação Lateral */}
          <Sidebar />
          
          {/* Conteúdo Principal da Página (Ajustado para permitir painéis alargados) */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}