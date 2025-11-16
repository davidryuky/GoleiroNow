import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import GoalkeeperList from './pages/GoalkeeperList';
import GoalkeeperProfile from './pages/GoalkeeperProfile';
import BookingPage from './pages/BookingPage';
import MyReservations from './pages/MyReservations';
import Favorites from './pages/Favorites';
import GoalkeeperRegister from './pages/GoalkeeperRegister';
import GoalkeeperDashboard from './pages/GoalkeeperDashboard';
import GoalkeeperEditProfile from './pages/GoalkeeperEditProfile';
import GoalkeeperReceivedReservations from './pages/GoalkeeperReceivedReservations';

const ClientRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { currentUser, userType } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { state: { from: location } });
        } else if (userType !== 'client') {
            navigate('/');
        }
    }, [currentUser, userType, navigate, location]);

    return currentUser && userType === 'client' ? children : null;
};

const GoalkeeperRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { currentUser, userType } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { state: { from: location } });
        } else if (userType !== 'goalkeeper') {
            navigate('/');
        }
    }, [currentUser, userType, navigate, location]);

    return currentUser && userType === 'goalkeeper' ? children : null;
};

const NotFoundRedirect: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, [navigate]);
    return null;
}


function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/goalkeepers" element={<GoalkeeperList />} />
            <Route path="/goalkeeper/:id" element={<GoalkeeperProfile />} />
            
            <Route path="/book/:id" element={<ClientRoute><BookingPage /></ClientRoute>} />
            <Route path="/my-reservations" element={<ClientRoute><MyReservations /></ClientRoute>} />
            <Route path="/favorites" element={<ClientRoute><Favorites /></ClientRoute>} />
            
            <Route path="/goalkeeper-register" element={<GoalkeeperRegister />} />
            <Route path="/goalkeeper/dashboard" element={<GoalkeeperRoute><GoalkeeperDashboard /></GoalkeeperRoute>} />
            <Route path="/goalkeeper/edit-profile" element={<GoalkeeperRoute><GoalkeeperEditProfile /></GoalkeeperRoute>} />
            <Route path="/goalkeeper/reservations" element={<GoalkeeperRoute><GoalkeeperReceivedReservations /></GoalkeeperRoute>} />

            <Route path="*" element={<NotFoundRedirect />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;