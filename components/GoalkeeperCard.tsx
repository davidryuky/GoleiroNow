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
      className="block relative p-px rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group
                 bg-gradient-to-br from-primary/50 via-dark to-dark
                 hover:from-primary hover:to-primary-dark"
    >
      <div className="bg-gray-900 rounded-[11px] h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" src={goalkeeper.photoUrl} alt={goalkeeper.name} />
          <div className="absolute top-0 right-0 p-2 z-10">
              { currentUser && userType === 'client' && (
                  <button onClick={handleFavoriteClick} className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:text-red-500 transition-colors duration-200">
                      <HeartIcon className={`h-6 w-6 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} />
                  </button>
              )}
          </div>
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-4">
            <h3 className="text-white text-xl font-bold font-orbitron">{goalkeeper.name}</h3>
            <div className="flex items-center text-sm text-gray-300">
              <MapPinIcon className="w-4 h-4 mr-1"/>
              {goalkeeper.region}, {goalkeeper.city}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <Rating rating={goalkeeper.rating} />
            <div className="text-right">
              <p className="text-lg font-bold text-primary">R${goalkeeper.pricePerHour}<span className="text-sm font-normal text-gray-400">/hora</span></p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoalkeeperCard;