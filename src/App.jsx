// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
// Import other pages as you create them (e.g., SignUpPage)

function App() {
  return (
    <Router> {/* Use Router */}
      <Routes> {/* Define Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Your Landing Page */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Your Sign Up Page */}
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;