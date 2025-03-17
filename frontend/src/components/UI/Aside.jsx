import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormData } from '../FormDataContex';
import '../../styles/aside.css';

function Aside({user, onLogin}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFormData } = useFormData();
  
  const handleResetFormData = (event) => {
    event.preventDefault();
    resetFormData();
    navigate('/CreateStudent');
  }

  return (
    <aside className="sidebar-container">
      <img src="./src/assets/procez-logo-removeb.png" alt="Procez Logo" className='procez-logo-aside' />

      <main>
        <Link to="/" className={location.pathname === '/' ? 'route-active' : ''}>
          <img src="./src/assets/home-icon.svg" alt="Home" />
          <p>Inicio</p>
        </Link>

        <Link onClick={handleResetFormData} className={location.pathname === '/CreateStudent' ? 'route-active' : ''}>
          <img src="./src/assets/graduation-cap-icon.svg" alt="Create Student" />
          <p>Crear Estudiante</p>
        </Link>

        <Link to="/ModifyStudent" className={location.pathname === '/ModifyStudent' ? 'route-active' : ''}>
          <img src="./src/assets/gear-icon.svg" alt="Modify Students" />
          <p>Modificar Estudiantes</p>
        </Link>

        <Link to="/UserManual" className={location.pathname === '/UserManual' ? 'route-active' : ''}>
          <img src="./src/assets/file-lines-regular.svg" alt="Database" />
          <p>Manual de Usuario</p>
        </Link>

        <Link to="/GenerateSheet" className={location.pathname === '/GenerateSheet' ? 'route-active' : ''}>
          <img src="./src/assets/stats-icon.svg" alt="Generate Sheet" />
          <p>Generar Sabana</p>
        </Link>

        <Link to="/ImportExportDatabase" className={location.pathname === '/ImportExportDatabase' ? 'route-active' : ''}>
          <img src="./src/assets/institution-icon.svg" alt="Database" />
          <p>Base de Datos</p>
        </Link>
      </main>

      <footer>
        <div className="user-info">
          <img src="./src/assets/logo-ciudad_valera.png" alt="User Icon" />
          <p>{user}</p>
        </div>
        <div className="logout-aside" onClick={onLogin}>
          <img src="./src/assets/arrow-right-from-bracket-solid.svg" />
          <p>Cerrar Sesión</p>
        </div>
      </footer>
    </aside>
  );
}

export default Aside;