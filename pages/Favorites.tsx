import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getGoalkeepers } from '../services/api';
import { Goalkeeper, User } from '../types';
import Spinner from '../components/Spinner';
import GoalkeeperCard from '../components/GoalkeeperCard';

const Favorites: React.FC = () => {
  const { currentUser } = useAuth();
  const [favoriteGoalkeepers, setFavoriteGoalkeepers] = useState<Goalkeeper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser && 'favorites' in currentUser) {
        setLoading(true);
        const user = currentUser as User;
        const allGoalkeepers = await getGoalkeepers();
        const favs = allGoalkeepers.filter(g => user.favorites.includes(g.id));
        setFavoriteGoalkeepers(favs);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-orbitron">Meus Goleiros <span className="text-primary">Favoritos</span></h1>
        <p className="text-lg text-gray-light mt-2">Seus paredões preferidos, sempre à mão.</p>
      </div>
      {loading ? <Spinner /> : (
        favoriteGoalkeepers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {favoriteGoalkeepers.map(goalkeeper => (
              <GoalkeeperCard key={goalkeeper.id} goalkeeper={goalkeeper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-light">Você ainda não tem goleiros favoritos.</p>
            <p className="text-gray-light/70 mt-2">Clique no coração nos perfis para adicioná-los aqui.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Favorites;