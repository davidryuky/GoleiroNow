
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

  const handleUserTypeChange = (type: 'client' | 'goalkeeper') => {
      setUserType(type);
      if (type === 'client' && users.length > 0) {
          setSelectedUserId(String(users[0].id));
      } else if (type === 'goalkeeper' && goalkeepers.length > 0) {
          setSelectedUserId(String(goalkeepers[0].id));
      } else {
          setSelectedUserId('');
      }
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
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Acessar sua Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Selecione seu perfil para continuar (simulação)
          </p>
        </div>
        <div className="flex bg-gray-800 p-1 rounded-lg">
            <button onClick={() => handleUserTypeChange('client')} className={`w-1/2 py-2 rounded-md transition-colors ${userType === 'client' ? 'bg-primary text-white' : 'text-gray-300'}`}>Cliente</button>
            <button onClick={() => handleUserTypeChange('goalkeeper')} className={`w-1/2 py-2 rounded-md transition-colors ${userType === 'goalkeeper' ? 'bg-primary text-white' : 'text-gray-300'}`}>Goleiro</button>
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
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
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
