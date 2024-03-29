import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import HowToRecharge from "./components/HowToRecharge";
import SendRecharge from "./components/SendRecharge";
import Account from "./components/Account";
import useLoggedUser from "./hooks/useLoggedUser";
import BasicNavigation from "./components/BasicNavigation";
import LoggedNavigation from "./components/LoggedNavigation";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";

import "bootstrap/scss/bootstrap.scss";

import "./App.css";
function App() {
  const { userLoggeado, loading, isAdmin } = useLoggedUser();

  if (loading) {
    return (
      <div>
        <Navbar className="sticky-top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Recharge</Navbar.Brand>
            <Nav className="me-100"></Nav>
          </Container>
        </Navbar>
      </div>
    );
  }

  return (
    <div className="">
      {userLoggeado ? <LoggedNavigation /> : <BasicNavigation />}
      <div className="container p-4">
        <PayPalScriptProvider
          options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn user={userLoggeado} />} />
            <Route
              path="/account"
              element={userLoggeado? (isAdmin ? (<AdminDashboard user={userLoggeado} />) : (<Account user={userLoggeado} />)) : (<LogIn user={userLoggeado} />)}/>
            <Route path="/howtorecharge" element={<HowToRecharge />} />
            <Route
          
              path="/sendrecharge"
              element={userLoggeado? <SendRecharge user={userLoggeado} /> : <LogIn user={userLoggeado} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </PayPalScriptProvider>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
