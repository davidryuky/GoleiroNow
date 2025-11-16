
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Goalkeeper } from '../types';
import Button from '../components/Button';
import { ShieldCheckIcon, CalendarIcon, StarIcon } from '../components/icons';

const GoalkeeperDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const goalkeeper = currentUser as Goalkeeper;

  if (!goalkeeper) {
    return null; // Or a loading/error state
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black tracking-tighter mb-2">Dashboard do Goleiro</h1>
      <p className="text-xl text-gray-400 mb-8">Bem-vindo de volta, <span className="text-primary font-bold">{goalkeeper.name}</span>!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-4xl font-bold text-primary">5</p>
          <p className="text-gray-400">Reservas Recebidas (mock)</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-4xl font-bold text-primary">2</p>
          <p className="text-gray-400">Jogos Hoje (mock)</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-4xl font-bold text-primary">{goalkeeper.rating.toFixed(1)}</p>
          <p className="text-gray-400">Sua Avaliação</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/goalkeeper/reservations">
          <div className="bg-primary/10 border-2 border-primary/30 p-8 rounded-lg text-center hover:bg-primary/20 hover:border-primary transition-all duration-300 h-full flex flex-col justify-center items-center">
            <CalendarIcon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white">Ver Reservas</h2>
            <p className="text-gray-400">Aceite ou recuse os pedidos dos times.</p>
          </div>
        </Link>
        <Link to="/goalkeeper/edit-profile">
          <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded-lg text-center hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 h-full flex flex-col justify-center items-center">
            <ShieldCheckIcon className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
            <p className="text-gray-400">Atualize suas informações e disponibilidade.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GoalkeeperDashboard;
