import { motion } from "motion/react"
import { useEffect, useState } from "react";
import '../styles/login.css'

function Login({ onLogin, credentials }) {
  const [session, setSession] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = session.username.trim();
    const password = session.password.trim();
  
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      setError('');
      onLogin(session.username);
      console.log('Login exitoso:', data);
    } else {
      setError('Credenciales incorrectas');
      console.log('Error:', data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="left-login">
        <div className="login-window">
          <img src="./src/assets/procez-logo.jpeg" alt="Procez Logo" className="procez-logo" />
          <h2 className="font-semibold text-2xl">¡Bienvenido!</h2>
          <p>Ingresa tus datos par empezar</p>
          <form onSubmit={handleLogin} className="form-login">
            <div className="input-container-login">
              <input
               type="text" 
               name="username"
               autoComplete='off'
               placeholder="Nombre de usuario" 
               required 
               onChange={handleChange} 
              />
              <img src="./src/assets/envelope-regular.svg" alt="Icono" className="icon" />
            </div>

            <div className="input-container-login">
              <input
               type="password" 
               name="password" 
               placeholder="Password" 
               required 
               onChange={handleChange} 
              />
              <img src="./src/assets/lock-solid.svg" alt="Icono" className="icon" />
            </div>
            
            <button type="submit">Ingresar</button>
            {error && <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500">{error}</motion.p>}
          </form>
        </div>
      </div>

      <div className="right-login">
        <img src="./src/assets/login-img.jpeg" alt="" />
      </div>
    </div>
  );
}

export default Login;