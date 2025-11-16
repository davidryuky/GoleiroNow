import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Goalkeeper } from '../types';
import { ShieldCheckIcon, CalendarIcon, UserIcon } from '../components/icons';

const DashboardStatCard: React.FC<{ value: string | number, label: string }> = ({ value, label }) => (
    <div className="bg-gray-dark/50 backdrop-blur-lg border border-gray-border p-6 rounded-2xl text-center">
        <p className="text-5xl font-bold text-primary-light font-orbitron">{value}</p>
        <p className="text-gray-light mt-1">{label}</p>
    </div>
);

const DashboardActionCard: React.FC<{ to: string, icon: React.ElementType, title: string, description: string, isPrimary?: boolean }> = ({ to, icon: Icon, title, description, isPrimary = false }) => (
    <Link to={to} className={`block p-8 rounded-2xl text-center transition-all duration-300 group ${isPrimary ? 'bg-primary/10 border-2 border-primary/30 hover:bg-primary/20 hover:border-primary' : 'bg-gray-dark/50 border-2 border-gray-border hover:bg-gray-dark/80 hover:border-gray-light/50'}`}>
        <div className="flex justify-center mb-4">
            <Icon className={`w-12 h-12 transition-colors duration-300 ${isPrimary ? 'text-primary' : 'text-gray-light group-hover:text-primary-light'}`} />
        </div>
        <h2 className="text-2xl font-bold text-light font-orbitron">{title}</h2>
        <p className="text-gray-light mt-1">{description}</p>
    </Link>
);


const GoalkeeperDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const goalkeeper = currentUser as Goalkeeper;

  if (!goalkeeper) {
    return null; // Or a loading/error state
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-orbitron">Dashboard</h1>
        <p className="text-xl text-gray-light mt-2">Bem-vindo de volta, <span className="text-primary font-bold">{goalkeeper.name}</span>!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <DashboardStatCard value={5} label="Reservas Recebidas" />
        <DashboardStatCard value={2} label="Jogos Hoje" />
        <DashboardStatCard value={goalkeeper.rating.toFixed(1)} label="Sua Avaliação" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardActionCard 
            to="/goalkeeper/reservations" 
            icon={CalendarIcon}
            title="Ver Reservas"
            description="Aceite ou recuse os pedidos dos times."
            isPrimary
        />
        <DashboardActionCard 
            to="/goalkeeper/edit-profile" 
            icon={UserIcon}
            title="Editar Perfil"
            description="Atualize suas informações e disponibilidade."
        />
        <div className="md:col-span-2">
            <DashboardActionCard 
                to={`/goalkeeper/${goalkeeper.id}`} 
                icon={ShieldCheckIcon}
                title="Ver Perfil Público"
                description="Veja como os clientes veem o seu perfil."
            />
        </div>
      </div>
    </div>
  );
};

export default GoalkeeperDashboard;