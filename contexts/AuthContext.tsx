
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Goalkeeper } from '../types';
import { getUserById, getGoalkeeperById, toggleFavoriteApi } from '../services/api';

type UserType = 'client' | 'goalkeeper';

interface AuthContextType {
  currentUser: User | Goalkeeper | null;
  userType: UserType | null;
  loading: boolean;
  login: (id: number, type: UserType) => Promise<void>;
  logout: () => void;
  toggleFavorite: (goalkeeperId: number) => Promise<void>;
  isFavorite: (goalkeeperId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | Goalkeeper | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic persistence simulation
    try {
      const storedUser = localStorage.getItem('goleiroNowUser');
      const storedType = localStorage.getItem('goleiroNowUserType') as UserType;
      if (storedUser && storedType) {
        setCurrentUser(JSON.parse(storedUser));
        setUserType(storedType);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (id: number, type: UserType) => {
    setLoading(true);
    let user = null;
    if (type === 'client') {
      user = await getUserById(id);
    } else {
      user = await getGoalkeeperById(id);
    }
    
    if (user) {
      setCurrentUser(user);
      setUserType(type);
      localStorage.setItem('goleiroNowUser', JSON.stringify(user));
      localStorage.setItem('goleiroNowUserType', type);
    }
    setLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('goleiroNowUser');
    localStorage.removeItem('goleiroNowUserType');
  };
  
  const toggleFavorite = async (goalkeeperId: number) => {
      if (userType === 'client' && currentUser) {
          const updatedUser = await toggleFavoriteApi(currentUser.id, goalkeeperId);
          if (updatedUser) {
              setCurrentUser(updatedUser);
              localStorage.setItem('goleiroNowUser', JSON.stringify(updatedUser));
          }
      }
  };

  const isFavorite = (goalkeeperId: number): boolean => {
      if (userType === 'client' && currentUser) {
          return (currentUser as User).favorites?.includes(goalkeeperId) || false;
      }
      return false;
  };

  const value = { currentUser, userType, loading, login, logout, toggleFavorite, isFavorite };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
