import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Users from './pages/Users';
import ProtectedRoutes from './utils/ProtecteRoutes';
import Pacientes from './pages/Pacientes';
import Calendario from './pages/Calendario';
import Consultas from './pages/Consultas';
import HistorialPacientes from './pages/HistorialPacientes';
import Reportes from './pages/Reportes';

function App() {
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);

  console.log(userData);
  return (
    <>
      {userData ? <Header /> : null}
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route
            path="/historial/:id"
            element={<HistorialPacientes />}
          />
        </Route>
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </>
  );
}

export default App;
