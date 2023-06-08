import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import NavegacionNew from "./components/NavegacionNew";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import HowToRecharge from "./components/HowToRecharge";
import SendRecharge from "./components/SendRecharge";
import ListaUsuario from "./components/ListaUsuario";
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthContextProvider} from './context/AuthContext'

import "bootstrap/scss/bootstrap.scss";

import "./App.css";
function App() {
  return (
    <div className="">
      <NavegacionNew />
      <div>
        <Footer />
      </div>
      <div className="container p-4">
        <AuthContextProvider>
        <Routes>
          <Route path="/" element={<ListaUsuario />} />
          <Route path="/HowToRecharge" element={<HowToRecharge />} />
          <Route path="/SendRecharge" element={<ProtectedRoute><SendRecharge /></ProtectedRoute>} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/edit/:id" element={<SignUp />} />
          
        </Routes>
      </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
