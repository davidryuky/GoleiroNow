import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { getUsersForLogin, getGoalkeepersForLogin } from '../services/api';

type UserForLogin = { id: number, name: string };

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'goalkeeper'>('client');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [users, setUsers] = useState<UserForLogin[]>([]);
  const [goalkeepers, setGoalkeepers] = useState<UserForLogin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const clientUsers = await getUsersForLogin();
        const goalkeeperUsers = await getGoalkeepersForLogin();
        setUsers(clientUsers);
        setGoalkeepers(goalkeeperUsers);
        if (clientUsers.length > 0) {
          setSelectedUserId(String(clientUsers[0].id));
        }
      } catch (err) {
        setError('Falha ao carregar usuários.');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userType === 'client' && users.length > 0) {
        setSelectedUserId(String(users[0].id));
    } else if (userType === 'goalkeeper' && goalkeepers.length > 0) {
        setSelectedUserId(String(goalkeepers[0].id));
    } else {
        setSelectedUserId('');
    }
  }, [userType, users, goalkeepers]);

  const handleUserTypeChange = (type: 'client' | 'goalkeeper') => {
      setUserType(type);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
        setError('Por favor, selecione um usuário.');
        return;
    }
    setError('');
    setLoading(true);
    await login(parseInt(selectedUserId), userType);
    setLoading(false);
    if(userType === 'goalkeeper') {
        navigate('/goalkeeper/dashboard');
    } else {
        navigate('/');
    }
  };
  
  const currentList = userType === 'client' ? users : goalkeepers;

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 bg-cover bg-center" style={{backgroundImage: "url('https://img.freepik.com/fotos-gratis/close-up-do-goleiro_23-2147813141.jpg')"}}>
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md p-8 space-y-8 bg-gray-900/70 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white font-orbitron">
            Acessar sua Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Selecione seu perfil para continuar (simulação)
          </p>
        </div>
        <div className="flex bg-gray-800/50 p-1 rounded-full">
            <button onClick={() => handleUserTypeChange('client')} className={`w-1/2 py-2 rounded-full transition-all duration-300 ${userType === 'client' ? 'bg-primary text-white shadow-md' : 'text-gray-300'}`}>Cliente</button>
            <button onClick={() => handleUserTypeChange('goalkeeper')} className={`w-1/2 py-2 rounded-full transition-all duration-300 ${userType === 'goalkeeper' ? 'bg-primary text-white shadow-md' : 'text-gray-300'}`}>Goleiro</button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loading ? <Spinner /> : (
            <>
              <div>
                <label htmlFor="user-select" className="block text-sm font-medium text-gray-300 mb-1">Selecione o Usuário</label>
                <select 
                    id="user-select" 
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-primary focus:shadow-[0_0_15px_rgba(126,63,242,0.5)] transition-all duration-300"
                >
                    {currentList.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;