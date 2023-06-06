import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import NavegacionNew from "./components/NavegacionNew";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import HowToRecharge from "./components/HowToRecharge";
import SendRecharge from "./components/SendRecharge";
import ListaUsuario from "./components/ListaUsuario";

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
        <Routes>
          <Route path="/" element={<ListaUsuario />} />
          <Route path="/HowToRecharge" element={<HowToRecharge />} />
          <Route path="/SendRecharge" element={<SendRecharge />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/edit/:id" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
