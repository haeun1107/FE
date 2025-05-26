import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LocationAuth from './pages/LocationAuth';
import MainFeedPage from './pages/MainFeedPage';
import WritePostPage from './pages/WritePostPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  const isLocationVerified = localStorage.getItem('gps') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/gps"
          element={isAuthenticated ? <LocationAuth /> : <Navigate to="/" />}
        />
        <Route
          path="/main"
          element={
            isAuthenticated && isLocationVerified ? (
              <MainFeedPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/write" element={<WritePostPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
