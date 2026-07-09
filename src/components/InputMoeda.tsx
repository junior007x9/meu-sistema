"use client";

import React, { useState, useEffect } from 'react';

interface InputMoedaProps {
  name: string;
  defaultValue?: number;
  required?: boolean;
  className?: string;
  onChange?: (valor: number) => void;
}

export default function InputMoeda({ 
  name, 
  defaultValue = 0, 
  required = false, 
  className = "",
  onChange
}: InputMoedaProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [rawValue, setRawValue] = useState(defaultValue);

  // Formata o valor inicial que vem do banco de dados (se for página de edição)
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      const stringSemPonto = defaultValue.toFixed(2).replace('.', '');
      formatar(stringSemPonto);
    }
  }, [defaultValue]);

  const formatar = (valorString: string) => {
    // Remove todas as letras, vírgulas e pontos (deixa só números puros)
    const apenasNumeros = valorString.replace(/\D/g, "");
    
    if (!apenasNumeros) {
      setDisplayValue("");
      setRawValue(0);
      if (onChange) onChange(0);
      return;
    }

    // Divide por 100 para criar as casas decimais (ex: 1500 vira 15.00)
    const valorFloat = parseInt(apenasNumeros, 10) / 100;
    setRawValue(valorFloat);
    if (onChange) onChange(valorFloat);

    // Formata lindamente para o padrão Brasileiro: 1.500,00
    const formatado = valorFloat.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    setDisplayValue(formatado);
  };

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-black text-sm">R$</span>
      <input
        type="text"
        value={displayValue}
        onChange={(e) => formatar(e.target.value)}
        required={required}
        className={`pl-10 w-full ${className}`}
        placeholder="0,00"
      />
      {/* Input invisível: É ele que envia o número verdadeiro para a nossa Base de Dados */}
      <input type="hidden" name={name} value={rawValue} />
    </div>
  );
}