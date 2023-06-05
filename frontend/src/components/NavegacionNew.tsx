import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavegacionNew = () =>{
    return(
<>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Recharge</Navbar.Brand>
          <Nav className="me-100">
            <Nav.Link href="/">Send Recharge</Nav.Link>
            <Nav.Link href="/">How to Recharge</Nav.Link>
            <Nav.Link href="/SignUp">Sign Up</Nav.Link>
            <Nav.Link href="/">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>

    )
}

export default NavegacionNew;