
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ShieldCheckIcon, LogOutIcon } from './icons';

const Navbar = () => {
  const { currentUser, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-dark/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-bold text-2xl tracking-tighter">
              Goleiro<span className="text-primary">Now</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/goalkeepers" className={navLinkClass}>Buscar</NavLink>
              {userType === 'client' && (
                <>
                  <NavLink to="/my-reservations" className={navLinkClass}>Minhas Reservas</NavLink>
                  <NavLink to="/favorites" className={navLinkClass}>Favoritos</NavLink>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-white hidden sm:block">Olá, {currentUser.name.split(' ')[0]}</span>
                 {userType === 'goalkeeper' ? (
                    <NavLink to="/goalkeeper/dashboard" className="flex items-center bg-gray-700 hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition-all duration-300">
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        Área do Goleiro
                    </NavLink>
                 ) : (
                    <NavLink to="/goalkeeper-register" className="text-gray-300 hover:text-white transition-colors duration-300">Seja um Goleiro</NavLink>
                 )}
                <button onClick={handleLogout} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-300">
                  <LogOutIcon className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300">
                <UserIcon className="h-5 w-5 mr-2"/>
                Entrar
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-dark border-t border-gray-800 mt-auto">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} GoleiroNow. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
