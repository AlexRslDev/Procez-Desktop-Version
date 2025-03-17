import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aside from './components/UI/Aside';
import Home from './components/UI/Home';
import CreateStudent from './components/UI/CreateStudent';
import ModifyStudent from './components/UI/ModifyStudent';
import UserManual from './components/UI/UserManual';
import GenerateSheet from './components/UI/GenerateSheet';
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