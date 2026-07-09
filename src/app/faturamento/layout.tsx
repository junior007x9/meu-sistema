"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FaturamentoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lista de TODAS as páginas financeiras que vão virar "Abas"
  const abas = [
    { nome: 'Caixa Diário', href: '/faturamento/diario' },
    { nome: 'Conta Styllo', href: '/faturamento/conta-styllo' },
    { nome: 'Conta UTI', href: '/faturamento/conta-uti' },
    { nome: 'Carnês', href: '/faturamento/carne' },
    { nome: 'Funcionários', href: '/faturamento/funcionarios' },
    { nome: 'Serv. Joãozinho', href: '/faturamento/joaozinho' },
    { nome: 'Devedores UTI', href: '/faturamento/devedores-uti' },
    { nome: 'Comissões', href: '/faturamento/servicos-indicados' },
    { nome: 'Bal. Diário (Styllo)', href: '/faturamento/balanco-diario' },
    { nome: 'Bal. Diário (UTI)', href: '/faturamento/balanco-uti' },
    { nome: 'Bal. Anual', href: '/faturamento/balanco' },
  ];

  // Esconde as abas se o utilizador estiver a criar ou a editar (para ter a tela limpa)
  const isFormulario = pathname.includes('/novo') || pathname.includes('/editar');

  return (
    <div className="w-full flex flex-col">
      {!isFormulario && (
        <div className="mb-6 w-full animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
            Central de Faturamento
          </h1>
          {/* Menu de navegação que faz scroll no telemóvel */}
          <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-indigo-200">
            <div className="flex gap-2 min-w-max">
              {abas.map((aba) => {
                const ativo = pathname.startsWith(aba.href);
                return (
                  <Link 
                    key={aba.href} 
                    href={aba.href} 
                    className={`
                      px-4 py-3 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest transition-all
                      ${ativo 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'}
                    `}
                  >
                    {aba.nome}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Aqui é onde a tabela atual é carregada sem sair do ecrã! */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}