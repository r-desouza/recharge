import { Component, CSSProperties } from "react";
import { Container, Row, Col } from "react-bootstrap";

const stickyFooterStyle: CSSProperties = {
  fontSize: "13px",
  color: "black",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "30px",
  width: "100%",
};


export default class Footer extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col style={stickyFooterStyle} sm={12}>
            &copy; 2023 Recharge 
          </Col>
        </Row>
      </Container>
    );
  }
}
