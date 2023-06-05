import { useState } from "react";
import SignUp from "./components/SignUp";
import Navegacion from "./components/Navegacion";
import { Routes, Route } from "react-router-dom";
import NavegacionNew from './components/NavegacionNew';
import ListaUsuario from './components/Home'
import './App.css';
import Footer from './components/Footer'

import 'bootstrap/scss/bootstrap.scss';

function App() {

  return (
    <div className="">
    <NavegacionNew/>
    <div className="footer"><Footer/></div>
    
      <div className="container p-4">
        <Routes>
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/edit/:id" element={<SignUp/>} />
        </Routes>
      </div>
  </div>
  );
}

export default App;
