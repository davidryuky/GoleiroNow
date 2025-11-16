import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { Goalkeeper } from '../types';

const GoalkeeperEditProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const goalkeeper = currentUser as Goalkeeper;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Funcionalidade de edição de perfil em demonstração.');
  };
  
  if (!goalkeeper) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-orbitron">Editar Perfil</h1>
        <p className="text-lg text-gray-light mt-2">Mantenha suas informações sempre atualizadas.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-dark/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-border space-y-6">
        <Input label="Nome Completo" id="name" type="text" defaultValue={goalkeeper.name} />
        <Input label="Preço por Hora" id="price" type="number" defaultValue={goalkeeper.pricePerHour} />
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-light mb-2">Descrição</label>
            <textarea id="description" rows={4} defaultValue={goalkeeper.description} className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300 placeholder:text-gray-light"></textarea>
        </div>
         <div>
            <h3 className="text-lg font-medium text-light mb-2">Disponibilidade</h3>
            <p className="text-gray-light text-sm">A edição de disponibilidade é uma funcionalidade simulada.</p>
        </div>
        <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-light mb-2">Alterar Foto (simulado)</label>
            <input type="file" id="photo" className="w-full text-sm text-gray-light file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark transition-colors" />
        </div>
        <Button type="submit" className="w-full text-lg">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default GoalkeeperEditProfile;