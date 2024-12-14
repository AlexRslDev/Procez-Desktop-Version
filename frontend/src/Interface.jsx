import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aside from './components/Aside';
import Home from './components/Home';
import CreateStudent from './components/CreateStudent';
import ModifyStudent from './components/ModifyStudent';
import UserManual from './components/UI/UserManual';
import GenerateSheet from './components/GenerateSheet';
import ImportExportDatabase from './components/UI/ImportExportDatabase';
import { FormDataProvider } from './components/FormDataContex';
import './styles/Interface.css';

function Interface({ user, onLogin }) {
  return (
    <FormDataProvider>
      <div className="interface-container">
        <Router>
          <Aside user={user} onLogin={onLogin} />
          <main className="routes">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/CreateStudent" element={<CreateStudent />} />
              <Route path="/ModifyStudent" element={<ModifyStudent />} />
              <Route path="/UserManual" element={<UserManual />} />
              <Route path="/GenerateSheet" element={<GenerateSheet />} />
              <Route path="/ImportExportDatabase" element={<ImportExportDatabase />} />
            </Routes>
          </main>
        </Router>
      </div>
    </FormDataProvider>
  );
}

export default Interface;