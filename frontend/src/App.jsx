import { useState, useEffect } from 'react';
import Login from './components/Login';
import Interface from './Interface';
import './styles/App.css';

function App() {
  const [credentials, setCredentials] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setCredentials(data));
  },[])

  const handleLogin = (user) => {
    setIsAuthenticated(!isAuthenticated);
    setUser(user);
  };

  return (
    <div className='app-container'>
      {isAuthenticated ? (
        <Interface user={user} onLogin={handleLogin} />
      ) : (
        <Login onLogin={handleLogin} credentials={credentials} />
      )}
    </div>
  );
}

export default App;
