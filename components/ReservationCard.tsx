
import React, { useEffect, useState } from 'react';
import { Reservation, Goalkeeper, User, ReservationStatus } from '../types';
import { getGoalkeeperById, getUserById } from '../services/api';
import { CalendarIcon, ClockIcon, UserIcon, ShieldCheckIcon } from './icons';

interface ReservationCardProps {
  reservation: Reservation;
  perspective: 'client' | 'goalkeeper';
  onStatusChange?: (reservationId: number, newStatus: ReservationStatus) => void;
}

const statusStyles: { [key in ReservationStatus]: string } = {
  [ReservationStatus.Pending]: 'bg-yellow-500/20 text-yellow-400',
  [ReservationStatus.Confirmed]: 'bg-green-500/20 text-green-400',
  [ReservationStatus.Completed]: 'bg-blue-500/20 text-blue-400',
  [ReservationStatus.Canceled]: 'bg-red-500/20 text-red-400',
  [ReservationStatus.Rejected]: 'bg-red-500/20 text-red-400',
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, perspective, onStatusChange }) => {
  const [goalkeeper, setGoalkeeper] = useState<Goalkeeper | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (perspective === 'client') {
        const gkData = await getGoalkeeperById(reservation.goalkeeperId);
        if (gkData) setGoalkeeper(gkData);
      } else {
        const userData = await getUserById(reservation.userId);
        if (userData) setUser(userData);
      }
      setLoading(false);
    };
    fetchData();
  }, [reservation, perspective]);
  
  const entity = perspective === 'client' ? goalkeeper : user;
  
  if (loading || !entity) {
      return <div className="bg-gray-800 p-4 rounded-lg animate-pulse h-40"></div>;
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl shadow-lg transition-all duration-300 hover:border-primary">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           {perspective === 'client' && goalkeeper && <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-16 h-16 rounded-full object-cover"/>}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-white">
                {perspective === 'client' ? <ShieldCheckIcon className="w-6 h-6 text-primary"/> : <UserIcon className="w-6 h-6 text-primary" />}
                {entity.name}
            </div>
            <p className="text-gray-400">{perspective === 'goalkeeper' && user ? `Cidade: ${user.city}` : ''}</p>
          </div>
        </div>
        <div className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[reservation.status]}`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
        </div>
      </div>
      <div className="border-t border-gray-700 my-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
        <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary"/>
            <span>{new Date(reservation.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
        </div>
        <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary"/>
            <span>{reservation.time.charAt(0).toUpperCase() + reservation.time.slice(1)} ({reservation.duration}h)</span>
        </div>
        <div className="text-lg font-bold text-white">
            Valor Total: <span className="text-primary">R${reservation.totalPrice.toFixed(2)}</span>
        </div>
      </div>
      {perspective === 'goalkeeper' && reservation.status === ReservationStatus.Pending && onStatusChange && (
        <div className="mt-4 flex gap-4">
          <button onClick={() => onStatusChange(reservation.id, ReservationStatus.Confirmed)} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Aceitar</button>
          <button onClick={() => onStatusChange(reservation.id, ReservationStatus.Rejected)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">Recusar</button>
        </div>
      )}
       {perspective === 'client' && reservation.status === ReservationStatus.Pending && onStatusChange && (
        <div className="mt-4 flex gap-4">
          <button onClick={() => onStatusChange(reservation.id, ReservationStatus.Canceled)} className="bg-red-500/80 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
