import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ShieldCheckIcon, LogOutIcon } from './icons';
import BottomNavbar from './BottomNavbar';

const Navbar = () => {
  const { currentUser, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    } ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-0.5 after:bg-primary after:rounded-full after:shadow-glow-primary' : ''}`;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-black/30 backdrop-blur-lg rounded-xl z-50 border border-white/10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-orbitron font-bold text-2xl tracking-tighter">
              Goleiro<span className="text-primary">Now</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
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
                    <NavLink to="/goalkeeper/dashboard" className="flex items-center bg-white/5 hover:bg-white/10 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 border border-white/10">
                        <ShieldCheckIcon className="h-5 w-5 mr-2 text-primary" />
                        Área do Goleiro
                    </NavLink>
                 ) : (
                    <NavLink to="/goalkeeper-register" className="text-gray-300 hover:text-white transition-colors duration-300">Seja um Goleiro</NavLink>
                 )}
                <button onClick={handleLogout} className="p-2 bg-black/20 rounded-full text-gray-400 hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-300">
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
  <footer className="w-full mt-auto py-6 px-4 text-center text-gray-500 text-sm">
    <p>&copy; {new Date().getFullYear()} GoleiroNow. Todos os direitos reservados.</p>
  </footer>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Navbar />
      <main className="flex-grow pt-24 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Layout;