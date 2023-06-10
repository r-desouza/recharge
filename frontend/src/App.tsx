import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import NavegacionNew from "./components/NavegacionNew";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import HowToRecharge from "./components/HowToRecharge";
import SendRecharge from "./components/SendRecharge";
import Account from "./components/Account";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import useLoggedUser from "./hooks/useLoggedUser";

import "bootstrap/scss/bootstrap.scss";

import "./App.css";
function App() {
  const userLoggeado = useLoggedUser();
  console.log("EL USUARIO LOGGEADO: " + userLoggeado);
  return (
    <div className="">
      <NavegacionNew />
      <div>
        <Footer />
      </div>
      <div className="container p-4">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/LogIn" element={<LogIn />} />

            <Route path="/Account" element={<Account user={userLoggeado}/>} />

            {/* <Route path="/Account" element={<ProtectedRoute><Account /></ProtectedRoute>} /> */}
            
            <Route path="/HowToRecharge" element={<HowToRecharge />} />
            <Route
              path="/SendRecharge"
              element={
                  <SendRecharge />
              }
            />
            {/* <Route path="/LogIn" element={<LogIn />} /> */}
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/edit/:id" element={<SignUp />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
