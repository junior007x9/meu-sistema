"use client";

import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react';

interface PassoTutorial {
  elemento: string; // Seletor CSS (ex: '.aba-diario')
  titulo: string;
  texto: string;
}

interface TutorialSistemaProps {
  passos: PassoTutorial[];
  idContexto: string; // Identificador único da página
}

export default function TutorialSistema({ passos, idContexto }: TutorialSistemaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Fecha o tutorial com a tecla ESC, navega com as setas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight' && currentStep < passos.length - 1) setCurrentStep(prev => prev + 1);
      if (e.key === 'ArrowLeft' && currentStep > 0) setCurrentStep(prev => prev - 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, passos.length]);

  if (!isOpen) {
    return (
      <button
        onClick={() => { setCurrentStep(0); setIsOpen(true); }}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl border border-slate-700/50 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
        aria-label="Abrir guia de ajuda deste ecrã"
      >
        <HelpCircle className="h-6 w-6 animate-pulse group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  const passoAtual = passos[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl p-6 relative overflow-hidden transition-all duration-300 scale-100">
        
        {/* Detalhe Decorativo Superior */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Botão de Fechar */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Fechar tutorial"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Conteúdo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <Sparkles className="h-5 w-5 animate-spin-slow" />
            <span className="text-xs font-black tracking-widest uppercase">Passo {currentStep + 1} de {passos.length}</span>
          </div>

          <h3 className="text-lg font-black text-slate-900 tracking-tight">{passoAtual.titulo}</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">{passoAtual.texto}</p>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>

          <div className="flex gap-1">
            {passos.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-5 bg-indigo-600' : 'w-1.5 bg-slate-200'}`} />
            ))}
          </div>

          {currentStep < passos.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-black rounded-lg shadow-sm transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Próximo <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-xs font-black rounded-lg shadow-sm transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Entendido!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}