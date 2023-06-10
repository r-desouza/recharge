import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import HowToRecharge from "./components/HowToRecharge";
import SendRecharge from "./components/SendRecharge";
import Account from "./components/Account";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import useLoggedUser from "./hooks/useLoggedUser";
import BasicNavigation from "./components/BasicNavigation";
import LoggedNavigation from "./components/LoggedNavigation";

import "bootstrap/scss/bootstrap.scss";

import "./App.css";
function App() {
  const userLoggeado = useLoggedUser();
  console.log("EL USUARIO LOGGEADO: " + userLoggeado);
  return (
    <div className="">
      {userLoggeado ? <LoggedNavigation /> : <BasicNavigation />}
      <div>
        <Footer />
      </div>
      <div className="container p-4">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Account" element={<Account user={userLoggeado} />} />
            <Route path="/HowToRecharge" element={<HowToRecharge />} />
            <Route path="/SendRecharge" element={<SendRecharge />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/edit/:id" element={<SignUp />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
