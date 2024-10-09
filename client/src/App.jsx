import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import AlunoDashboard from './pages/AlunoDashboard';
import Transacao from './pages/Transacao';
import TeacherDashboard from './pages/TeacherDashboard';
import DeletarUsers from './pages/DeletarUsers';




const App = () => {

  

  const { isAuthenticated, userData } = useAuth();

 


  return (
    <Router>
      <Routes>
        {userData && userData.role === 'aluno' && (
          <Route path='/dashboard' element={<AlunoDashboard />} />
        )}
        {userData && userData.role === 'teacher' && (
          <Route path='/dashboard' element={<TeacherDashboard />} />
        )}

        <Route path='/' element={ !isAuthenticated ? <Login /> : <Navigate to='/dashboard' /> } />

        {userData && userData.role === 'adm' && (
        <Route path='/register' element={<Register />} />
       )}
        
        {userData && userData.role === 'adm' && (
          <Route path='/transacao' element={<Transacao />} />
        )}
        {userData && userData.role === 'adm' && (
          <Route path='/deleteusers' element={<DeletarUsers />} />
        )}
        {userData && userData.role === 'teacher' && (
          <Route path='/transacao' element={<Transacao />} />
        )}
        
        <Route path='/login' element={ !isAuthenticated ? <Login /> : <Navigate to='/dashboard'/> } />
        <Route path='/dashboard' element={ isAuthenticated ? <Dashboard /> : <Login />} />       
      </Routes>
    </Router>
  )
}

export default App;
