import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaypal,
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <h5 style={{ color: "#9ba6a5" }}>Pay With</h5>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li className="me-3">
                <FontAwesomeIcon icon={faPaypal} size="2x" />
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 style={{ color: "#9ba6a5" }}>About Us</h5>
            <p style={{ color: "#f5f9ee" }}>
              At Recharge Mobile, we are committed to providing convenient and
              hassle-free mobile recharge services. Our user-friendly platform
              allows you to recharge your mobile phone anytime, anywhere.
            </p>
          </Col>
          <Col md={4}>
            <h5 style={{ color: "#9ba6a5" }}>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-start">
              <li className="me-3">
                <a href="#" style={{ margin: "0 0.5rem" }}>
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    style={{ transform: "scale(1.8)" }}
                  />
                </a>
              </li>
              <li className="me-3">
                <a href="#" style={{ margin: "0 0.5rem" }}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ transform: "scale(1.8)" }}
                  />
                </a>
              </li>
              <li className="me-3">
                <a href="#" style={{ margin: "0 0.5rem" }}>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ transform: "scale(1.8)" }}
                  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row>
          <Col className="text-center" style={{ color: "#9ba6a5" }}>
            <p>&copy; 2023 Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
