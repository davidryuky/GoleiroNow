import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Goalkeeper } from '../types';
import { getGoalkeeperById, createReservation } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import Input from '../components/Input';

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
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter">Reservar <span className="text-primary font-orbitron">{goalkeeper.name}</span></h1>
          <p className="text-gray-light mt-2">Complete os detalhes abaixo para confirmar a sua reserva.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-gray-dark/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-border space-y-6">
            <Input label="Data do Jogo" id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-light mb-2">Período</label>
              <select id="time" value={time} onChange={e => setTime(e.target.value as any)} className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300">
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-light mb-2">Duração (horas)</label>
              <select id="duration" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300">
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
                <option value="3">3 horas</option>
                <option value="4">4 horas</option>
              </select>
            </div>
            <Button type="submit" className="w-full text-lg">Confirmar Reserva</Button>
          </form>
          
          <div className="bg-gray-dark/50 backdrop-blur-lg p-8 rounded-2xl border border-primary/30 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">Resumo da Reserva</h2>
            <div className="flex items-center gap-4 mb-6">
              <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary/50"/>
              <div>
                <h3 className="text-xl font-bold font-orbitron">{goalkeeper.name}</h3>
                <p className="text-gray-light">{goalkeeper.region}, {goalkeeper.city}</p>
              </div>
            </div>
            <div className="space-y-3 text-gray-light border-t border-gray-border pt-4">
              <div className="flex justify-between"><span>Preço por Hora:</span> <span className="font-semibold text-light">R${goalkeeper.pricePerHour.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Duração:</span> <span className="font-semibold text-light">{duration} hora(s)</span></div>
              <div className="flex justify-between text-xl font-bold text-light border-t border-gray-border pt-4 mt-4"><span>Total:</span> <span className="text-primary-light font-orbitron">R${totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModalAndRedirect} title="Reserva Enviada!">
        <p className="text-gray-light">Sua solicitação de reserva foi enviada com sucesso. O goleiro irá confirmar em breve. Você pode acompanhar o status em "Minhas Reservas".</p>
        <Button onClick={closeModalAndRedirect} className="w-full mt-6">Ver Minhas Reservas</Button>
      </Modal>
    </>
  );
};

export default BookingPage;