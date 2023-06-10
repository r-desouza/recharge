import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const LoggedNavigation = () =>{
    return(
<>
      <Navbar className='sticky-top' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Recharge</Navbar.Brand>
          <Nav className="me-100">
            <Nav.Link href="/SendRecharge">Send Recharge</Nav.Link>
            <Nav.Link href="/HowToRecharge">How to Recharge</Nav.Link>
            <Nav.Link href="/SignUp">Signup</Nav.Link>
            <Nav.Link href="/LogIn">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>

    )
}

export default LoggedNavigation;