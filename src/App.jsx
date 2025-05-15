import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './App.css';

export default function PlanoSaudeOrcamento() {

  const enviarWhatsapp = () => {
  const numeroDestino = '5521976879112'; // Substitua com o seu número com DDI + DDD
  const mensagem = `Olá, gostaria de solicitar um orçamento para plano de saúde.

*Nome:* ${form.nome}
*Email:* ${form.email}
*Telefone:* ${form.telefone}
*Idade:* ${form.idade}
*Dependentes:* ${form.dependentes}
*Plano:* ${form.tipo}


Aguardo retorno.`;

  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
};


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

    if (form.tipo === 'Individual') {
      base = idade <= 30 ? 200 : idade <= 45 ? 300 : 450;
    } else if (form.tipo === 'Familiar') {
      base = (idade <= 30 ? 180 : idade <= 45 ? 280 : 400) + dep * 120;
    } else if (form.tipo === 'Empresarial') {
      base = 150 + dep * 100;
    }

    setOrcamento(base);
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Orçamento de Plano de Saúde', 20, 20);

    doc.setFontSize(12);
    doc.text(`Nome: ${form.nome}`, 20, 40);
    doc.text(`Email: ${form.email}`, 20, 50);
    doc.text(`Telefone: ${form.telefone}`, 20, 60);
    doc.text(`Idade: ${form.idade}`, 20, 70);
    doc.text(`Dependentes: ${form.dependentes}`, 20, 80);
    doc.text(`Tipo de plano: ${form.tipo}`, 20, 90);
    

    doc.save(`orcamento-${form.nome.replace(' ', '_')}.pdf`);
  };

  return (
    <div className="form-container">
      <h2 className="text-xl font-bold mb-4">Simulação de Plano de Saúde</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calcularOrcamento();
        }}
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade do titular"
          value={form.idade}
          onChange={handleChange}
          required
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
          onClick={enviarWhatsapp}
          className="Butum-zap"
          > Enviar pelo WhatsApp
          </button>
      </form>

      {orcamento !== null && (
        <div className="resultado-orcament">
         

          

        </div>
      )}
    </div>
  );
}
