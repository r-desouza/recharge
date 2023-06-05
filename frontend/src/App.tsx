import { useState } from "react";
import SignUp from "./components/SignUp";
import Navegacion from "./components/Navegacion";
import { Routes, Route } from "react-router-dom";
import NavegacionNew from './components/NavegacionNew';
import ListaUsuario from './components/Home'
import Footer from './components/Footer'
import LogIn from './components/LogIn'


import 'bootstrap/scss/bootstrap.scss';

import './App.css';
function App() {

  return (
    <div className="">
    <NavegacionNew/>
    <div><Footer/></div>
      <div className="container p-4">
        <Routes>
          <Route path="/LogIn" element={<LogIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/edit/:id" element={<SignUp/>} />
        </Routes>
      </div>
  </div>
  );
}

export default App;
