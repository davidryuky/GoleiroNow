import React from 'react';
import { Link } from 'react-router-dom';
import { Goalkeeper } from '../types';
import Rating from './Rating';
import { HeartIcon, MapPinIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface GoalkeeperCardProps {
  goalkeeper: Goalkeeper;
}

const GoalkeeperCard: React.FC<GoalkeeperCardProps> = ({ goalkeeper }) => {
    const { isFavorite, toggleFavorite, currentUser, userType } = useAuth();
    const isFav = isFavorite(goalkeeper.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentUser && userType === 'client') {
            toggleFavorite(goalkeeper.id);
        }
    };

  return (
    <Link 
      to={`/goalkeeper/${goalkeeper.id}`} 
      className="block bg-gray-dark/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 group border border-gray-border hover:border-primary/80 hover:shadow-primary-glow"
    >
      <div className="relative">
        <div className="relative overflow-hidden aspect-square">
          <img className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={goalkeeper.photoUrl} alt={goalkeeper.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="absolute top-3 right-3 z-10">
            { currentUser && userType === 'client' && (
                <button onClick={handleFavoriteClick} className="bg-dark/50 backdrop-blur-md p-2.5 rounded-full text-white hover:text-red-500 transition-colors duration-200">
                    <HeartIcon className={`h-6 w-6 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>
            )}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white text-2xl font-bold font-orbitron truncate">{goalkeeper.name}</h3>
          <div className="flex items-center text-sm text-gray-light">
            <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0"/>
            <span className="truncate">{goalkeeper.region}, {goalkeeper.city}</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-dark/30">
        <div className="flex justify-between items-center">
          <Rating rating={goalkeeper.rating} />
          <div className="text-right">
            <p className="text-xl font-bold text-primary font-orbitron">R${goalkeeper.pricePerHour}<span className="text-sm font-normal text-gray-light">/h</span></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoalkeeperCard;