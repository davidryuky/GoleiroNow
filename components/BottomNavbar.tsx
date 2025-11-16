import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StadiumIcon, SearchIcon, ClipboardIcon, ShieldCheckIcon } from './icons';

const BottomNavbar = () => {
    const { currentUser, userType } = useAuth();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `relative flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-300 group ${
            isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
        }`;
    
    return (
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-sm 
                       bg-black/40 backdrop-blur-lg rounded-2xl z-50 border border-white/10 overflow-hidden">
            <div className="flex justify-around h-16">
                <NavLink to="/" className={navLinkClass} end>
                    {({isActive}) => (
                        <>
                            {isActive && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary shadow-glow-primary"></span>}
                            <StadiumIcon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Home</span>
                        </>
                    )}
                </NavLink>
                <NavLink to="/goalkeepers" className={navLinkClass}>
                     {({isActive}) => (
                        <>
                            {isActive && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary shadow-glow-primary"></span>}
                            <SearchIcon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Buscar</span>
                        </>
                    )}
                </NavLink>

                {currentUser && userType === 'client' && (
                    <NavLink to="/my-reservations" className={navLinkClass}>
                         {({isActive}) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary shadow-glow-primary"></span>}
                                <ClipboardIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">Reservas</span>
                            </>
                        )}
                    </NavLink>
                )}
                
                {currentUser && userType === 'goalkeeper' ? (
                    <NavLink to="/goalkeeper/dashboard" className={navLinkClass}>
                         {({isActive}) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary shadow-glow-primary"></span>}
                                <ShieldCheckIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">Dashboard</span>
                            </>
                        )}
                    </NavLink>
                ) : (
                    <NavLink to={currentUser ? "/goalkeeper-register" : "/login"} className={navLinkClass}>
                         {({isActive}) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary shadow-glow-primary"></span>}
                                <ShieldCheckIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">Goleiro</span>
                            </>
                        )}
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default BottomNavbar;