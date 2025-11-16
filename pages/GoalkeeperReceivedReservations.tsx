
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
      <h1 className="text-4xl font-black tracking-tighter text-center mb-10">Reservas <span className="text-primary">Recebidas</span></h1>
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
          <p className="text-center text-gray-400 text-lg">Você ainda não recebeu nenhuma reserva.</p>
        )
      )}
    </div>
  );
};

export default GoalkeeperReceivedReservations;
