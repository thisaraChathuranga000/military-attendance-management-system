import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import Soldiar from './pages/Soldiar';
import Udc from './pages/Udc';
import Uuo from './pages/Uuo';
import DutyOfficer from './pages/DutyOfficer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/soldiar" element={<Soldiar />} />
        <Route path="/udc" element={<Udc />} />
        <Route path="/uuo" element={<Uuo />} />
        <Route path="/duty-officer" element={<DutyOfficer />} />
      </Routes>
    </div>
  );
}

export default App;
