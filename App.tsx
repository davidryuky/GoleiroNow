
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const GoalkeeperRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, userType } = useAuth();
    return currentUser && userType === 'goalkeeper' ? <>{children}</> : <Navigate to="/" />;
};

const ClientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, userType } = useAuth();
    return currentUser && userType === 'client' ? <>{children}</> : <Navigate to="/" />;
};

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

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
