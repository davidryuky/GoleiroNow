import React, { useState, useEffect, useMemo } from 'react';
import GoalkeeperCard from '../components/GoalkeeperCard';
import Spinner from '../components/Spinner';
import { getGoalkeepers } from '../services/api';
import { Goalkeeper } from '../types';

const GoalkeeperList: React.FC = () => {
  const [goalkeepers, setGoalkeepers] = useState<Goalkeeper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: 100,
    rating: 0,
    region: 'all',
  });

  useEffect(() => {
    const loadGoalkeepers = async () => {
      setLoading(true);
      const data = await getGoalkeepers();
      setGoalkeepers(data);
      setLoading(false);
    };
    loadGoalkeepers();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'price' || name === 'rating' ? Number(value) : value }));
  };
  
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(goalkeepers.map(g => g.region))];
    return uniqueRegions.sort();
  }, [goalkeepers]);

  const filteredGoalkeepers = useMemo(() => {
    return goalkeepers.filter(g => {
      return g.pricePerHour <= filters.price &&
             g.rating >= filters.rating &&
             (filters.region === 'all' || g.region === filters.region);
    });
  }, [goalkeepers, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-orbitron">Encontre o Goleiro <span className="text-primary">Perfeito</span></h1>
        <p className="text-lg text-gray-light mt-2">Filtre pelos melhores para a sua partida.</p>
      </div>
      
      <div className="bg-gray-dark/50 backdrop-blur-lg p-6 rounded-2xl mb-10 border border-gray-border grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-light mb-2">Preço Máximo: <span className="font-bold text-primary-light">R${filters.price}</span></label>
          <input type="range" id="price" name="price" min="0" max="100" step="10" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-light mb-2">Avaliação Mínima: <span className="font-bold text-primary-light">{filters.rating.toFixed(1)}</span></label>
          <input type="range" id="rating" name="rating" min="0" max="5" step="0.1" value={filters.rating} onChange={handleFilterChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-light mb-2">Região</label>
          <select id="region" name="region" value={filters.region} onChange={handleFilterChange} className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300">
            <option value="all">Todas as Regiões</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      
      {loading ? <Spinner /> : (
        filteredGoalkeepers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredGoalkeepers.map(goalkeeper => (
              <GoalkeeperCard key={goalkeeper.id} goalkeeper={goalkeeper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-light">Nenhum goleiro encontrado.</p>
            <p className="text-gray-light/70 mt-2">Tente ajustar os filtros para ver mais resultados.</p>
          </div>
        )
      )}
    </div>
  );
};

export default GoalkeeperList;