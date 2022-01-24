import React, { useState } from 'react';
import './App.css';
import './App.scss';
import PublicRoutes from './Routes/Public';
import ProtectedRoutes from './Routes/Protected';

function App() {
  const isAuth = !!localStorage.getItem("token");
  return (
    <div className="App">
      {!isAuth ? <PublicRoutes /> : <ProtectedRoutes />}
    </div>
  );
}

export default App;
