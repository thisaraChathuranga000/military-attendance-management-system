import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import Soldiar from './pages/Soldiar';
import Udc from './pages/Udc';
import Uuo from './pages/Uuo';
import DutyOfficer from './pages/DutyOfficer';
import { UseSelector, useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <div className="App">
      {isAuthenticated ?
      <Routes>
        <Route path="/sign-in" element={<SignUp />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/soldiar" element={<Soldiar />} />
        <Route path="/udc" element={<Udc />} />
        <Route path="/uuo" element={<Uuo />} />
        <Route path="/duty-officer" element={<DutyOfficer />} />
      </Routes>
      : <SignIn />
      }

      

      
    </div>
  );
}

export default App;
