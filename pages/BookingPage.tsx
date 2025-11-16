
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Goalkeeper } from '../types';
import { getGoalkeeperById, createReservation } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [goalkeeper, setGoalkeeper] = useState<Goalkeeper | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState<'manhã' | 'tarde' | 'noite'>('noite');
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchGoalkeeper = async () => {
      if (id) {
        setLoading(true);
        const data = await getGoalkeeperById(Number(id));
        setGoalkeeper(data || null);
        setLoading(false);
      }
    };
    fetchGoalkeeper();
  }, [id]);
  
  useEffect(() => {
    if (goalkeeper) {
      setTotalPrice(goalkeeper.pricePerHour * duration);
    }
  }, [duration, goalkeeper]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalkeeper || !currentUser || !date) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    await createReservation({
        userId: currentUser.id,
        goalkeeperId: goalkeeper.id,
        date,
        time,
        duration,
        totalPrice,
    });
    setIsModalOpen(true);
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    navigate('/my-reservations');
  }
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!goalkeeper) return <div className="min-h-screen flex items-center justify-center text-2xl text-red-500">Goleiro não encontrado.</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-black tracking-tighter text-center mb-2">Reservar <span className="text-primary">{goalkeeper.name}</span></h1>
        <p className="text-center text-gray-400 mb-10">Complete os detalhes abaixo para confirmar a sua reserva.</p>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl border border-gray-700 space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Data do Jogo</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Horário</label>
              <select id="time" value={time} onChange={e => setTime(e.target.value as any)} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duração (horas)</label>
              <select id="duration" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
                <option value="3">3 horas</option>
                <option value="4">4 horas</option>
              </select>
            </div>
            <Button type="submit" className="w-full text-lg">Confirmar Reserva</Button>
          </form>
          
          <div className="bg-gray-800 p-8 rounded-xl border border-primary/30 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6">Resumo da Reserva</h2>
            <div className="flex items-center gap-4 mb-6">
              <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-20 h-20 rounded-full object-cover"/>
              <div>
                <h3 className="text-xl font-bold">{goalkeeper.name}</h3>
                <p className="text-gray-400">{goalkeeper.region}, {goalkeeper.city}</p>
              </div>
            </div>
            <div className="space-y-3 text-gray-300 border-t border-gray-700 pt-4">
              <div className="flex justify-between"><span>Preço por Hora:</span> <span className="font-semibold text-white">R${goalkeeper.pricePerHour.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Duração:</span> <span className="font-semibold text-white">{duration} hora(s)</span></div>
              <div className="flex justify-between text-xl font-bold text-white border-t border-gray-700 pt-4 mt-4"><span>Total:</span> <span className="text-primary">R${totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModalAndRedirect} title="Reserva Enviada!">
        <p className="text-gray-300">Sua solicitação de reserva foi enviada com sucesso. O goleiro irá confirmar em breve. Você pode acompanhar o status em "Minhas Reservas".</p>
        <Button onClick={closeModalAndRedirect} className="w-full mt-6">Ver Minhas Reservas</Button>
      </Modal>
    </>
  );
};

export default BookingPage;
