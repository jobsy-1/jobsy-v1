// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
// Import other pages as you create them (e.g., SignUpPage)

function App() {
  return (
    <Router> {/* Use Router */}
      <Routes> {/* Define Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Your Landing Page */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Your Sign Up Page */}
          {/* Add other routes here as you build your app */}
          {/* <Route path="/auth/login" element={<LoginPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          {/* <Route path="/check-email" element={<CheckEmailPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;