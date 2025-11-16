
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const GoalkeeperRegister: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Funcionalidade de cadastro de goleiro em demonstração.');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black tracking-tighter text-center mb-10">Seja um Goleiro <span className="text-primary">Now</span></h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl border border-gray-700 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <Input label="Nome Completo" id="name" type="text" placeholder="Seu Nome" required />
            <Input label="Idade" id="age" type="number" placeholder="Sua Idade" required />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <Input label="Cidade" id="city" type="text" placeholder="Sua Cidade" required />
            <Input label="Região de Atuação" id="region" type="text" placeholder="Ex: Zona Sul" required />
        </div>
        <Input label="Preço por Hora" id="price" type="number" placeholder="R$ 50" required />
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descrição Curta</label>
            <textarea id="description" rows={4} placeholder="Fale sobre suas habilidades e experiência..." className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"></textarea>
        </div>
        <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-300 mb-1">Foto de Perfil (simulado)</label>
            <input type="file" id="photo" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
        </div>
        <Button type="submit" className="w-full text-lg">Finalizar Cadastro</Button>
      </form>
    </div>
  );
};

export default GoalkeeperRegister;
