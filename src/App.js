import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import BuySellShares from './pages/BuySellShares';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import News from './pages/News';
import InvestmentProjects from './pages/InvestmentProjects';
import PortfolioManagement from './pages/PortfolioManagement';
import StockTrading from './pages/StockTrading';
import MarketAnalysis from './pages/MarketAnalysis';
import FinancialConsulting from './pages/FinancialConsulting';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    toast.error('يرجى تسجيل الدخول للوصول إلى هذه الصفحة');
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (e.g., check localStorage for token)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <AppContainer>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <MainContent>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProjectDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/buy-sell/:projectId" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <BuySellShares />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Portfolio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Support />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/news" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <News />
                </ProtectedRoute>
              } 
            />
            
            {/* Service Pages */}
            <Route 
              path="/investment-projects" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <InvestmentProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portfolio-management" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PortfolioManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stock-trading" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <StockTrading />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/market-analysis" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MarketAnalysis />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/financial-consulting" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FinancialConsulting />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </AuthProvider>
  );
}

export default App; 