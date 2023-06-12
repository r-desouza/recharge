import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <h5>Pay With</h5>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              
              <li className="me-3">
                <FontAwesomeIcon icon={faPaypal} size="2x" />
              </li>
             
            </ul>
          </Col>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              cursus justo id ligula tristique, at bibendum magna tempor.
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-start">
              <li className="me-3">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li className="me-3">
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="me-3">
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row>
          <Col className="text-center">
            <p>&copy; 2023 Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;