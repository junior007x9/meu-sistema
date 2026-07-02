"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Glasses, 
  Wrench, 
  Wallet, 
  ShoppingCart,
  Menu 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: 'Painel Geral', icon: LayoutDashboard, href: '/' },
    { name: 'Fichas de Clientes', icon: Users, href: '/clientes' },
    { name: 'Estoque & Produtos', icon: Glasses, href: '/produtos' },
    { name: 'UTI dos Óculos (OS)', icon: Wrench, href: '/uti-oculos' },
    { name: 'Compras Online', icon: ShoppingCart, href: '/compras' },
    { name: 'Financeiro', icon: Wallet, href: '/financeiro' },
  ];

  return (
    <>
      {/* Botão de Menu para Celular */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between md:hidden z-50 relative shadow-md">
        <h1 className="font-bold text-lg tracking-wider text-yellow-500">STYLLO ÓTICA</h1>
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
        <div>
          <div className="mb-8 px-2 hidden md:block mt-2">
            <h1 className="text-xl font-black tracking-wider text-yellow-500">STYLLO ÓTICA</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Gestão & UTI dos Óculos</p>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
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
                  <Icon className={`h-5 w-5 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-5 px-2 text-xs text-slate-500 text-center font-medium uppercase tracking-wider">
          Sistema Digital v1.0
        </div>
      </aside>

      {/* Fundo escuro ao abrir o menu no celular */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}
    </>
  );
}