import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import authServiceInstance from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";

const LoggedNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authServiceInstance.logout();
      navigate("/");
    } catch (e: any) {
      console.log(e.message);
    }
  };
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
    <>
      <Navbar className="sticky-top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Recharge</Navbar.Brand>
          <Nav className="me-100">
            <Nav.Link href="/SendRecharge">Send Recharge</Nav.Link>
            <Nav.Link href="/HowToRecharge">How to Recharge</Nav.Link>
            {isAdmin ? (
              <Nav.Link href="/AdminDashboard">Dashboard</Nav.Link>
            ) : (
              <Nav.Link href="/Account">Account</Nav.Link>
            )}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default LoggedNavigation;
