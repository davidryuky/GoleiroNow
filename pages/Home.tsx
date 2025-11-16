import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import GoalkeeperCard from '../components/GoalkeeperCard';
import Spinner from '../components/Spinner';
import { Goalkeeper } from '../types';
import { getGoalkeepers } from '../services/api';

const Home: React.FC = () => {
    const [featured, setFeatured] = useState<Goalkeeper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            const allGoalkeepers = await getGoalkeepers();
            // Feature top-rated goalkeepers
            setFeatured(allGoalkeepers.sort((a, b) => b.rating - a.rating).slice(0, 4));
            setLoading(false);
        };
        fetchFeatured();
    }, []);

  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://img.freepik.com/fotos-gratis/jogadores-de-futebol-em-acao-em-estadios-profissionais_654080-1750.jpg')"}}></div>
        <div className="absolute inset-0 bg-dark/70"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 animate-fade-in-down font-orbitron">
            Precisando de goleiro para o jogo de <span className="text-primary">hoje?</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up">
            Encontre os melhores goleiros da sua região com apenas alguns cliques. Agende e garanta a segurança do seu time.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl max-w-4xl mx-auto animate-fade-in border border-white/10">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <input type="text" placeholder="Cidade" className="bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-primary focus:shadow-[0_0_15px_rgba(126,63,242,0.5)] transition-all duration-300 col-span-1 md:col-span-3" />
                  <Link to="/goalkeepers" className="w-full">
                    <Button className="w-full">Encontrar Goleiro Agora</Button>
                  </Link>
              </form>
          </div>
        </div>
      </div>

      {/* Featured Goalkeepers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-2 font-orbitron">Goleiros em <span className="text-primary">Destaque</span></h2>
        <p className="text-center text-gray-400 mb-10">Os paredões mais bem avaliados da comunidade.</p>
        {loading ? <Spinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(goalkeeper => (
              <GoalkeeperCard key={goalkeeper.id} goalkeeper={goalkeeper} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;