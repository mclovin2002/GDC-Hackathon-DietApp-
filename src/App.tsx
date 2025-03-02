import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import AppLayout from './components/AppLayout';
import { PipelinePage } from './pages/PipelinePage';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';
import PaymentPage from './pages/PaymentPage';
import DeliveryPage from './pages/DeliveryPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import Survey from './pages/Survey';
import './App.css';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

// Root route wrapper
function RootRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <HomePage user={user} />;
}

// Dashboard home wrapper
function DashboardHome() {
  const { user } = useAuth();
  return <HomePage user={user} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<DashboardHome />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="meal-plan" element={<MealPlan />} />
            <Route path="survey" element={<Survey />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
