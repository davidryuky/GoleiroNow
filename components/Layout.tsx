import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ShieldCheckIcon, LogOutIcon, DownloadIcon } from './icons';
import BottomNavbar from './BottomNavbar';
import Button from './Button';

const Navbar = ({ installPrompt, handleInstallClick }: { installPrompt: any, handleInstallClick: () => void }) => {
  const { currentUser, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 group ${
      isActive ? 'text-light' : 'text-gray-light hover:text-light'
    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 ${
        isActive ? 'after:w-4' : 'group-hover:after:w-4'
    }`;


  return (
    <header className="bg-dark/60 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-border">
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
             {installPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:flex items-center bg-primary/80 hover:bg-primary text-light font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm mr-4"
                aria-label="Instalar App GoleiroNow"
                title="Instalar App"
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Instalar App
              </button>
            )}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-light hidden sm:block">Olá, {currentUser.name.split(' ')[0]}</span>
                 {userType === 'goalkeeper' ? (
                    <NavLink to="/goalkeeper/dashboard" className="hidden sm:flex items-center bg-gray-dark/50 hover:bg-primary text-light font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm border border-gray-border hover:border-primary">
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        Área do Goleiro
                    </NavLink>
                 ) : (
                    <NavLink to="/goalkeeper-register" className="text-gray-light hover:text-light transition-colors duration-300 text-sm hidden sm:block">Seja um Goleiro</NavLink>
                 )}
                <button onClick={handleLogout} className="p-2 bg-gray-dark rounded-full text-gray-light hover:text-light hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-dark focus:ring-primary transition-all duration-300">
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <Button>
                  <UserIcon className="h-5 w-5 mr-2"/>
                  Entrar
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-transparent mt-auto border-t border-gray-border">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-light text-sm">
      <p>&copy; {new Date().getFullYear()} GoleiroNow. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const Layout = () => {
  // The beforeinstallprompt event is not in standard TS lib, so we use 'any' for its type.
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    // Show the install prompt
    installPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    // Optionally, send analytics about the installation outcome
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, clear it
    setInstallPrompt(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar installPrompt={installPrompt} handleInstallClick={handleInstallClick} />
      <main className="flex-grow pt-16 pb-28 md:pb-0">
        <Outlet />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomNavbar />
      {installPrompt && (
        <button
          onClick={handleInstallClick}
          className="md:hidden fixed bottom-24 right-4 bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg z-50 animate-fade-in-up"
          aria-label="Instalar GoleiroNow App"
          title="Instalar App"
        >
          <DownloadIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Layout;