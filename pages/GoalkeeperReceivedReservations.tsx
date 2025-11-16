import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getReservationsByGoalkeeperId, updateReservationStatus } from '../services/api';
import { Reservation, ReservationStatus } from '../types';
import Spinner from '../components/Spinner';
import ReservationCard from '../components/ReservationCard';

const GoalkeeperReceivedReservations: React.FC = () => {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    if (currentUser) {
      setLoading(true);
      const data = await getReservationsByGoalkeeperId(currentUser.id);
      setReservations(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleStatusChange = async (reservationId: number, status: ReservationStatus) => {
    await updateReservationStatus(reservationId, status);
    fetchReservations(); // Refetch to update the list
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-orbitron">Reservas <span className="text-primary">Recebidas</span></h1>
        <p className="text-lg text-gray-light mt-2">Gerencie os pedidos de jogos dos clientes.</p>
      </div>
      {loading ? <Spinner /> : (
        reservations.length > 0 ? (
          <div className="space-y-6">
            {reservations.map(res => (
              <ReservationCard 
                key={res.id} 
                reservation={res} 
                perspective="goalkeeper"
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-light">Você ainda não recebeu nenhuma reserva.</p>
            <p className="text-gray-light/70 mt-2">Divulgue seu perfil para começar a jogar!</p>
          </div>
        )
      )}
    </div>
  );
};

export default GoalkeeperReceivedReservations;