import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StadiumIcon, SearchIcon, ClipboardIcon, ShieldCheckIcon } from './icons';

const BottomNavbar = () => {
    const { currentUser, userType } = useAuth();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
        }`;
    
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700/50 shadow-lg z-50">
            <div className="flex justify-around h-16">
                <NavLink to="/" className={navLinkClass} end>
                    <StadiumIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Home</span>
                </NavLink>
                <NavLink to="/goalkeepers" className={navLinkClass}>
                    <SearchIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Buscar</span>
                </NavLink>

                {currentUser && userType === 'client' && (
                    <NavLink to="/my-reservations" className={navLinkClass}>
                        <ClipboardIcon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">Reservas</span>
                    </NavLink>
                )}
                
                {currentUser && userType === 'goalkeeper' ? (
                    <NavLink to="/goalkeeper/dashboard" className={navLinkClass}>
                        <ShieldCheckIcon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">Dashboard</span>
                    </NavLink>
                ) : (
                    <NavLink to={currentUser ? "/goalkeeper-register" : "/login"} className={navLinkClass}>
                        <ShieldCheckIcon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">Goleiro</span>
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default BottomNavbar;
