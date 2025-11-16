import React, { useEffect, useState } from 'react';
import { Reservation, Goalkeeper, User, ReservationStatus } from '../types';
import { getGoalkeeperById, getUserById } from '../services/api';
import { CalendarIcon, ClockIcon, UserIcon, ShieldCheckIcon } from './icons';
import Button from './Button';

interface ReservationCardProps {
  reservation: Reservation;
  perspective: 'client' | 'goalkeeper';
  onStatusChange?: (reservationId: number, newStatus: ReservationStatus) => void;
}

const statusStyles: { [key in ReservationStatus]: { base: string, dot: string } } = {
  [ReservationStatus.Pending]: { base: 'text-yellow-400', dot: 'bg-yellow-400' },
  [ReservationStatus.Confirmed]: { base: 'text-green-400', dot: 'bg-green-400' },
  [ReservationStatus.Completed]: { base: 'text-blue-400', dot: 'bg-blue-400' },
  [ReservationStatus.Canceled]: { base: 'text-red-400', dot: 'bg-red-400' },
  [ReservationStatus.Rejected]: { base: 'text-red-400', dot: 'bg-red-400' },
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
      return <div className="bg-gray-dark/50 p-4 rounded-2xl animate-pulse h-48 border border-gray-border"></div>;
  }

  return (
    <div className="bg-gray-dark/40 backdrop-blur-lg border border-gray-border p-5 rounded-2xl shadow-lg transition-all duration-300 hover:border-primary/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           {perspective === 'client' && goalkeeper && <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"/>}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-light font-orbitron">
                {perspective === 'client' ? <ShieldCheckIcon className="w-6 h-6 text-primary"/> : <UserIcon className="w-6 h-6 text-primary" />}
                {entity.name}
            </div>
            <p className="text-gray-light">{perspective === 'goalkeeper' && user ? `Cidade: ${user.city}` : ''}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full bg-black/20 ${statusStyles[reservation.status].base}`}>
            <span className={`w-2 h-2 rounded-full ${statusStyles[reservation.status].dot}`}></span>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
        </div>
      </div>
      <div className="border-t border-gray-border my-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-light">
        <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary/80"/>
            <span>{new Date(reservation.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
        </div>
        <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary/80"/>
            <span>{reservation.time.charAt(0).toUpperCase() + reservation.time.slice(1)} ({reservation.duration}h)</span>
        </div>
        <div className="text-lg font-bold text-light sm:text-right">
            Total: <span className="text-primary-light">R${reservation.totalPrice.toFixed(2)}</span>
        </div>
      </div>
      {perspective === 'goalkeeper' && reservation.status === ReservationStatus.Pending && onStatusChange && (
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Button onClick={() => onStatusChange(reservation.id, ReservationStatus.Confirmed)} className="w-full sm:w-auto !py-2 !px-5 bg-gradient-to-r from-green-700 to-green-500">Aceitar</Button>
          <Button onClick={() => onStatusChange(reservation.id, ReservationStatus.Rejected)} variant="danger" className="w-full sm:w-auto !py-2 !px-5">Recusar</Button>
        </div>
      )}
       {perspective === 'client' && reservation.status === ReservationStatus.Pending && onStatusChange && (
        <div className="mt-4 flex gap-4">
          <Button onClick={() => onStatusChange(reservation.id, ReservationStatus.Canceled)} variant="danger" className="w-full sm:w-auto !py-2 !px-5">Cancelar Reserva</Button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;