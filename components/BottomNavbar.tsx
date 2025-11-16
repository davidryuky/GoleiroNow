import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StadiumIcon, SearchIcon, ClipboardIcon, ShieldCheckIcon, UserIcon, HeartIcon } from './icons';

const BottomNavbar = () => {
    const { currentUser, userType } = useAuth();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `relative flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-300 group ${
            isActive ? 'text-primary' : 'text-gray-light hover:text-light'
        }`;
    
    const navItems = [
      { to: "/", icon: StadiumIcon, label: "Home", requiresAuth: false, userType: 'any', end: true },
      { to: "/goalkeepers", icon: SearchIcon, label: "Buscar", requiresAuth: false, userType: 'any' },
      { to: "/my-reservations", icon: ClipboardIcon, label: "Reservas", requiresAuth: true, userType: 'client' },
      { to: "/favorites", icon: HeartIcon, label: "Favoritos", requiresAuth: true, userType: 'client' },
      { to: "/goalkeeper/dashboard", icon: ShieldCheckIcon, label: "Dashboard", requiresAuth: true, userType: 'goalkeeper' },
      { to: currentUser ? "/goalkeeper-register" : "/login", icon: ShieldCheckIcon, label: "Goleiro", requiresAuth: 'unauthenticated-or-client', userType: 'any' },
      { to: "/login", icon: UserIcon, label: "Entrar", requiresAuth: 'unauthenticated', userType: 'any' },
    ];
    
    let filteredNavItems;
    if (currentUser) {
        if(userType === 'client') {
            filteredNavItems = navItems.filter(item => item.userType === 'any' || item.userType === 'client');
            filteredNavItems = filteredNavItems.filter(item => item.requiresAuth !== 'unauthenticated' && item.requiresAuth !== 'unauthenticated-or-client');
        } else { // goalkeeper
            filteredNavItems = navItems.filter(item => item.userType === 'any' || item.userType === 'goalkeeper');
            filteredNavItems = filteredNavItems.filter(item => item.to !== '/goalkeeper-register');
        }
    } else { // not logged in
        filteredNavItems = navItems.filter(item => !item.requiresAuth || item.requiresAuth === 'unauthenticated');
    }
    
    // Quick fix to show a coherent 4-item bar for clients
    if(userType === 'client') {
        filteredNavItems = navItems.filter(i => ["Home", "Buscar", "Reservas", "Favoritos"].includes(i.label));
    }


    return (
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-sm bg-gray-dark/60 backdrop-blur-xl border border-gray-border rounded-full shadow-2xl z-50 overflow-hidden">
            <div className="flex justify-around h-16">
                {filteredNavItems.map(item => (
                    <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.end}>
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute top-1.5 h-1.5 w-1.5 bg-primary rounded-full shadow-primary-glow"></span>}
                                <item.icon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavbar;