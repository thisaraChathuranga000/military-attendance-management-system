import React, { useEffect } from 'react';
import './App.css';
import SignUp from './pages/SignUp'; 
import SignIn from './pages/SignIn';
import Soldier from './pages/Soldier';
import Udc from './pages/Udc';
import Uuo from './pages/Uuo';
import DutyOfficer from './pages/DutyOfficer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userType = useSelector((state: RootState) => state.auth.userType);  
  useEffect(() => {
    if (isAuthenticated) {
      switch (userType) {
        case 'soldier':
          navigate('/soldier');
          break;
        case 'udc':
          navigate('/udc');
          break;
        case 'uuo':
          navigate('/uuo');
          break;
        case 'duty-officer':
          navigate('/duty-officer');
          break;
        default:
          navigate('/sign-in');
      }
    } else {
      navigate('/sign-in');
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/soldier" element={<Soldier />} />
        <Route path="/udc" element={<Udc />} />
        <Route path="/uuo" element={<Uuo />} />
        <Route path="/duty-officer" element={<DutyOfficer />} />
      </Routes>
    </div>
  );
}

export default App;

