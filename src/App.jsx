// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// Import other pages as you create them (e.g., SignUpPage)

function App() {
  return (
    <Router> {/* Use Router */}
      <Routes> {/* Define Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Your Landing Page */}
        {/* Add other routes here as you build your app */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;