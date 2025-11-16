
import React, { useEffect, ReactElement } from 'react';
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

// FIX: Refactored to take an `element` prop instead of `children` to avoid type inference issues.
const ClientRoute = ({ element }: { element: ReactElement }): ReactElement | null => {
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

    return currentUser && userType === 'client' ? element : null;
};

// FIX: Refactored to take an `element` prop instead of `children` to avoid type inference issues.
const GoalkeeperRoute = ({ element }: { element: ReactElement }): ReactElement | null => {
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

    return currentUser && userType === 'goalkeeper' ? element : null;
};

// FIX: Refactored from React.FC to a standard functional component for clearer type inference.
const NotFoundRedirect = (): null => {
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
          {/* FIX: Add 'path="/"' to the main layout Route for clarity and to resolve potential routing ambiguity. */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/goalkeepers" element={<GoalkeeperList />} />
            <Route path="/goalkeeper/:id" element={<GoalkeeperProfile />} />
            
            {/* FIX: Updated protected routes to use the `element` prop. */}
            <Route path="/book/:id" element={<ClientRoute element={<BookingPage />} />} />
            <Route path="/my-reservations" element={<ClientRoute element={<MyReservations />} />} />
            <Route path="/favorites" element={<ClientRoute element={<Favorites />} />} />
            
            <Route path="/goalkeeper-register" element={<GoalkeeperRegister />} />
            {/* FIX: Updated protected routes to use the `element` prop. */}
            <Route path="/goalkeeper/dashboard" element={<GoalkeeperRoute element={<GoalkeeperDashboard />} />} />
            <Route path="/goalkeeper/edit-profile" element={<GoalkeeperRoute element={<GoalkeeperEditProfile />} />} />
            <Route path="/goalkeeper/reservations" element={<GoalkeeperRoute element={<GoalkeeperReceivedReservations />} />} />

            <Route path="*" element={<NotFoundRedirect />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;