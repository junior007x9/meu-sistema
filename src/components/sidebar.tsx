"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3,
  Users, 
  Glasses, 
  Wrench, 
  UserCog,
  ListChecks,
  Calculator,
  Receipt,
  ShoppingCart,
  Wallet, 
  Menu 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Lista definitiva com TODOS os botões e módulos do sistema
  const menuItems = [
    { name: 'Painel Geral', icon: LayoutDashboard, href: '/' },
    { name: 'Faturamento Mensal', icon: BarChart3, href: '/faturamento/joaozinho' },
    { name: 'Fichas de Clientes', icon: Users, href: '/clientes' },
    { name: 'Estoque & Produtos', icon: Glasses, href: '/produtos' },
    { name: 'UTI dos Óculos (OS)', icon: Wrench, href: '/uti-oculos' },
    { name: 'Produção Técnicos', icon: UserCog, href: '/uti-oculos/tecnicos' },
    { name: 'Tabela de Preços', icon: ListChecks, href: '/tabela-precos' },
    { name: 'Simulador de Lentes', icon: Calculator, href: '/simulacoes' },
    { name: 'Repasses Mensais', icon: Receipt, href: '/contas' },
    { name: 'Compras Online', icon: ShoppingCart, href: '/compras' },
    { name: 'Financeiro', icon: Wallet, href: '/financeiro' },
  ];

  return (
    <>
      {/* Botão de Menu para Telemóvel / Celular */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between md:hidden z-50 relative shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-full shadow-sm">
            <Image 
              src="/logo.png" 
              alt="Logo Styllo Ótica" 
              width={36} 
              height={36} 
              className="rounded-full"
            />
          </div>
          <h1 className="font-bold text-lg tracking-wider text-yellow-500">STYLLO ÓTICA</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 focus:outline-none hover:bg-slate-800 rounded-md transition-colors">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Barra Lateral */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 p-4 flex flex-col justify-between
        transition-transform duration-300 md:translate-x-0 md:static md:h-screen shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Área da Logomarca Oficial (Versão Desktop) */}
          <div className="mb-6 px-2 hidden md:flex flex-col items-center text-center mt-4">
            <div className="bg-white p-2 rounded-full shadow-lg shadow-black/20 mb-4 border-2 border-yellow-500 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Logo Styllo Ótica" 
                width={110} 
                height={110} 
                className="rounded-full"
                priority
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sistema de Gestão</p>
          </div>

          {/* Navegação completa com rolagem suave se o ecrã for pequeno */}
          <nav className="space-y-1.5 overflow-y-auto flex-1 pr-2 pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {menuItems.map((item) => {
              // Mantém o botão ativo mesmo se estiver dentro de uma sub-página (ex: /faturamento/joaozinho/novo)
              const isActive = (pathname === '/' && item.href === '/') || 
                               (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-bold transition-all
                    ${isActive 
                      ? 'bg-yellow-500 text-slate-900 shadow-md shadow-yellow-900/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                  `}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-5 px-2 text-[10px] text-slate-500 text-center font-bold uppercase tracking-wider mt-2 flex-shrink-0">
          Sistema Digital v1.0
        </div>
      </aside>

      {/* Fundo escuro ao abrir o menu no telemóvel */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}
    </>
  );
}