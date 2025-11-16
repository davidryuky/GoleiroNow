
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGoalkeeperById } from '../services/api';
import { Goalkeeper } from '../types';
import Spinner from '../components/Spinner';
import Rating from '../components/Rating';
import Button from '../components/Button';
import { MapPinIcon, ShieldCheckIcon, CalendarIcon, HeartIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

const StatCard: React.FC<{label: string; value: string | number}> = ({ label, value }) => (
    <div className="bg-dark/50 border border-gray-border p-4 rounded-lg text-center">
        <span className="block text-3xl font-bold text-primary-light font-orbitron">{value}</span>
        <span className="text-sm text-gray-light">{label}</span>
    </div>
);

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
      <div className="bg-gray-dark/50 backdrop-blur-xl border border-gray-border rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="relative">
            <div className="h-64 md:h-80 w-full overflow-hidden">
                <img src={goalkeeper.photoUrl} alt={goalkeeper.name} className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-dark via-gray-dark/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:left-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white font-orbitron">{goalkeeper.name}</h1>
                <p className="flex items-center text-lg text-gray-light mt-1">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {goalkeeper.region}, {goalkeeper.city}
                </p>
            </div>
             <div className="absolute top-4 right-4 z-10">
              { currentUser && userType === 'client' && (
                  <button onClick={handleFavoriteClick} className="bg-dark/50 backdrop-blur-md p-3 rounded-full text-white hover:text-red-500 transition-colors duration-200">
                      <HeartIcon className={`h-7 w-7 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} />
                  </button>
              )}
            </div>
             <div className="absolute bottom-6 right-6 md:right-8 hidden md:block">
                <Rating rating={goalkeeper.rating} />
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Anos" value={goalkeeper.age} />
                <StatCard label="/ hora" value={`R$${goalkeeper.pricePerHour}`} />
                <StatCard label="Avaliação" value={goalkeeper.rating.toFixed(1)} />
            </div>

            <p className="text-gray-light mb-8 text-center md:text-left">{goalkeeper.description}</p>
            
            <div className="bg-dark/40 border border-gray-border p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center font-orbitron"><CalendarIcon className="w-6 h-6 mr-3 text-primary"/> Disponibilidade</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(goalkeeper.availability).length > 0 ? (
                    Object.entries(goalkeeper.availability).map(([day, times]) => (
                        <div key={day} className="bg-gray-dark/50 border border-gray-border rounded-full px-4 py-2 text-sm text-gray-light">
                        {/* FIX: Cast `times` to `string[]` to resolve TypeScript error with Object.entries */}
                        <strong className="text-light">{day}</strong>: {(times as string[]).join(', ')}
                        </div>
                    ))
                  ) : (
                    <p className="text-gray-light">Nenhuma disponibilidade informada.</p>
                  )}
                </div>
            </div>
            
            {currentUser?.id !== goalkeeper.id && userType !== 'goalkeeper' && (
                 <Link to={`/book/${goalkeeper.id}`}>
                    <Button className="w-full text-lg">
                    <ShieldCheckIcon className="w-6 h-6 mr-2" />
                    Reservar {goalkeeper.name.split(' ')[0]}
                    </Button>
                </Link>
            )}
          </div>
      </div>
    </div>
  );
};

export default GoalkeeperProfile;
