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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    await login(parseInt(selectedUserId), userType);
    setIsSubmitting(false);
    if(userType === 'goalkeeper') {
        navigate('/goalkeeper/dashboard');
    } else {
        navigate('/');
    }
  };
  
  const currentList = userType === 'client' ? users : goalkeepers;

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-dark/60 backdrop-blur-xl border border-gray-border rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-light font-orbitron">
            Acessar sua Conta
          </h2>
          <p className="mt-2 text-sm text-gray-light">
            Selecione seu perfil para continuar (simulação)
          </p>
        </div>
        <div className="flex bg-dark/50 p-1 rounded-full border border-gray-border">
            <button onClick={() => handleUserTypeChange('client')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${userType === 'client' ? 'bg-primary text-white shadow-md' : 'text-gray-light'}`}>Cliente</button>
            <button onClick={() => handleUserTypeChange('goalkeeper')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${userType === 'goalkeeper' ? 'bg-primary text-white shadow-md' : 'text-gray-light'}`}>Goleiro</button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loading ? <Spinner /> : (
            <>
              <div>
                <label htmlFor="user-select" className="block text-sm font-medium text-gray-light mb-2">Selecione o Usuário</label>
                <select 
                    id="user-select" 
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300"
                >
                    {currentList.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
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