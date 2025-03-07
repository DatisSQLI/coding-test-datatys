import React from 'react';
import './App.css';
import { useLocation, Navigate } from 'react-router-dom';
import ProfilePage from './pages/profile';

function App() {
  const location = useLocation();

  if (!location?.state?.user) {
    return <Navigate to="/" replace />;
  }

  const { user } = location.state;

  return (
    <div className="root">
      <header>
        <h1>BlueTrust Monitoring</h1>
      </header>
      <ProfilePage user={user} />
    </div>
  );
}

export default App;
