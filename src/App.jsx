import React, { useState } from 'react';
import './App.css';

export default function PlanoSaudeOrcamento() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    idade: '',
    dependentes: 0,
    tipo: 'Individual',
  });

  const [orcamento, setOrcamento] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calcularOrcamento = () => {
    let base = 0;

    const idade = parseInt(form.idade);
    const dep = parseInt(form.dependentes);

    // Simples lógica de preço baseada na idade e tipo de plano
    if (form.tipo === 'Individual') {
      base = idade <= 30 ? 200 : idade <= 45 ? 300 : 450;
    } else if (form.tipo === 'Familiar') {
      base = (idade <= 30 ? 180 : idade <= 45 ? 280 : 400) + dep * 120;
    } else if (form.tipo === 'Empresarial') {
      base = 150 + dep * 100;
    }

    setOrcamento(base);
  };

  return (
    <div className="form-container">
      <h2 className="text-xl font-bold mb-4">Simulação de Plano de Saúde</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      />
      <input
        type="number"
        name="idade"
        placeholder="Idade do titular"
        value={form.idade}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      />
      <input
        type="number"
        name="dependentes"
        placeholder="Número de dependentes"
        value={form.dependentes}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      />
      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="mb-2 w-full border p-2 rounded"
      >
        <option value="Individual">Individual</option>
        <option value="Familiar">Familiar</option>
        <option value="Empresarial">Empresarial</option>
      </select>
      <button
        onClick={calcularOrcamento}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Calcular Orçamento
      </button>

      {orcamento !== null && (
        <div className="mt-4 bg-green-100 p-3 text-green-800 rounded">
          <strong>Valor estimado: R$ {orcamento.toLocaleString('pt-BR')},00</strong>
        </div>
      )}
    </div>
  );
}
