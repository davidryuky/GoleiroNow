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
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-900/70 backdrop-blur-lg border border-gray-700/50 rounded-full shadow-2xl z-50 overflow-hidden">
            <div className="flex justify-around h-16">
                <NavLink to="/" className={navLinkClass} end>
                    {({ isActive }) => (
                        <>
                            {isActive && <span className="absolute top-1.5 h-1 w-1 bg-primary rounded-full"></span>}
                            <StadiumIcon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Home</span>
                        </>
                    )}
                </NavLink>
                <NavLink to="/goalkeepers" className={navLinkClass}>
                     {({ isActive }) => (
                        <>
                            {isActive && <span className="absolute top-1.5 h-1 w-1 bg-primary rounded-full"></span>}
                            <SearchIcon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Buscar</span>
                        </>
                    )}
                </NavLink>

                {currentUser && userType === 'client' && (
                    <NavLink to="/my-reservations" className={navLinkClass}>
                         {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 bg-primary rounded-full"></span>}
                                <ClipboardIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">Reservas</span>
                            </>
                        )}
                    </NavLink>
                )}
                
                {currentUser && userType === 'goalkeeper' ? (
                    <NavLink to="/goalkeeper/dashboard" className={navLinkClass}>
                         {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 bg-primary rounded-full"></span>}
                                <ShieldCheckIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">Dashboard</span>
                            </>
                        )}
                    </NavLink>
                ) : (
                    <NavLink to={currentUser ? "/goalkeeper-register" : "/login"} className={navLinkClass}>
                         {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1 w-1 bg-primary rounded-full"></span>}
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