// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Changed back to BrowserRouter
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
// Removed: AuthCallbackPage import as it's no longer needed for manual OTP

function App() {
  return (
    <Router> {/* Now using BrowserRouter again */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        {/* Removed: <Route path="/auth/callback" element={<AuthCallbackPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
