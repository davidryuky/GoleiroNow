import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import GoalkeeperCard from '../components/GoalkeeperCard';
import Spinner from '../components/Spinner';
import { Goalkeeper } from '../types';
import { getGoalkeepers } from '../services/api';
import { SearchIcon } from '../components/icons';

const Home: React.FC = () => {
    const [featured, setFeatured] = useState<Goalkeeper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            const allGoalkeepers = await getGoalkeepers();
            setFeatured(allGoalkeepers.sort((a, b) => b.rating - a.rating).slice(0, 4));
            setLoading(false);
        };
        fetchFeatured();
    }, []);

  return (
    <div className="text-light">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://img.freepik.com/fotos-gratis/jogadores-de-futebol-em-acao-em-estadios-profissionais_654080-1750.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 animate-fade-in-down font-orbitron">
            Seu time precisa de um <span className="text-primary">Paredão?</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-light mb-8 animate-fade-in-up">
            Encontre e alugue os melhores goleiros da sua região. Rápido, fácil e seguro.
          </p>
          <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-full max-w-2xl mx-auto animate-fade-in border border-gray-border">
              <form className="flex gap-2 items-center">
                  <div className="relative flex-grow">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-light" />
                    <input type="text" placeholder="Qual a sua cidade?" className="w-full bg-transparent text-light rounded-full pl-11 pr-4 py-2.5 focus:outline-none placeholder:text-gray-light" />
                  </div>
                  <Link to="/goalkeepers" className="flex-shrink-0">
                    <Button className="!py-2.5 !px-5">Buscar Goleiro</Button>
                  </Link>
              </form>
          </div>
        </div>
      </div>

      {/* Featured Goalkeepers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron">Goleiros em <span className="text-primary">Destaque</span></h2>
            <p className="text-lg text-gray-light mt-2">Os paredões mais bem avaliados pela comunidade.</p>
        </div>
        {loading ? <Spinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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