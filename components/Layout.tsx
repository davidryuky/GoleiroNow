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
    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
        isActive ? 'after:w-4' : 'group-hover:after:w-4'
    }`;


  return (
    <header className="bg-dark/70 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <NavLink to="/goalkeeper/dashboard" className="flex items-center bg-gray-700/50 hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm">
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        Área do Goleiro
                    </NavLink>
                 ) : (
                    <NavLink to="/goalkeeper-register" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">Seja um Goleiro</NavLink>
                 )}
                <button onClick={handleLogout} className="p-2 bg-gray-800/50 rounded-full text-gray-400 hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300">
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(126,63,242,0.5)] hover:shadow-[0_0_25px_rgba(126,63,242,0.8)]">
                <UserIcon className="h-5 w-5 mr-2"/>
                Entrar
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-transparent mt-auto">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} GoleiroNow. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Layout;