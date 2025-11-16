
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGoalkeeperById } from '../services/api';
import { Goalkeeper } from '../types';
import Spinner from '../components/Spinner';
import Rating from '../components/Rating';
import Button from '../components/Button';
import { MapPinIcon, ShieldCheckIcon, CalendarIcon, HeartIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

const GoalkeeperProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [goalkeeper, setGoalkeeper] = useState<Goalkeeper | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite, currentUser, userType } = useAuth();
  
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
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!goalkeeper) return <div className="min-h-screen flex items-center justify-center text-2xl text-red-500">Goleiro não encontrado.</div>;
  
  const isFav = isFavorite(goalkeeper.id);

  const handleFavoriteClick = () => {
    if (currentUser && userType === 'client') {
      toggleFavorite(goalkeeper.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden md:flex">
        <div className="md:w-1/3 relative">
          <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            { currentUser && userType === 'client' && (
                <button onClick={handleFavoriteClick} className="bg-dark/50 p-3 rounded-full text-white hover:text-red-500 transition-colors duration-200">
                    <HeartIcon className={`h-7 w-7 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>
            )}
          </div>
        </div>
        <div className="md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white">{goalkeeper.name}</h1>
                <p className="flex items-center text-lg text-gray-400 mt-1">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  {goalkeeper.region}, {goalkeeper.city}
                </p>
              </div>
              <Rating rating={goalkeeper.rating} />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 text-center">
                <div className="bg-gray-800 p-3 rounded-lg"><span className="block text-2xl font-bold text-primary">{goalkeeper.age}</span><span className="text-sm text-gray-400">Anos</span></div>
                <div className="bg-gray-800 p-3 rounded-lg"><span className="block text-2xl font-bold text-primary">R${goalkeeper.pricePerHour}</span><span className="text-sm text-gray-400">/ hora</span></div>
                <div className="bg-gray-800 p-3 rounded-lg col-span-2 sm:col-span-1"><span className="block text-2xl font-bold text-primary">{goalkeeper.rating}</span><span className="text-sm text-gray-400">Avaliação</span></div>
            </div>

            <p className="text-gray-300 mb-6">{goalkeeper.description}</p>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center"><CalendarIcon className="w-6 h-6 mr-2 text-primary"/> Disponibilidade</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(goalkeeper.availability).map(([day, times]) => (
                  <div key={day} className="bg-gray-800 rounded-full px-3 py-1 text-sm text-gray-300">
                    <strong>{day}</strong>: {times.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link to={`/book/${goalkeeper.id}`}>
              <Button className="w-full flex items-center justify-center text-lg">
                <ShieldCheckIcon className="w-6 h-6 mr-2" />
                Reservar Goleiro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalkeeperProfile;
