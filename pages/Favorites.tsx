
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
      <h1 className="text-4xl font-black tracking-tighter text-center mb-10">Meus Goleiros <span className="text-primary">Favoritos</span></h1>
      {loading ? <Spinner /> : (
        favoriteGoalkeepers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteGoalkeepers.map(goalkeeper => (
              <GoalkeeperCard key={goalkeeper.id} goalkeeper={goalkeeper} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">Você ainda não adicionou nenhum goleiro aos favoritos.</p>
        )
      )}
    </div>
  );
};

export default Favorites;
