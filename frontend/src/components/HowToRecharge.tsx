import { Container, Row, Col } from "react-bootstrap";

const HowToRecharge = () => {
  return (
    <Container>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "60px ",
          marginBottom: "60px",
        }}
      >
        Recharge a mobile phone in 3 easy steps
      </h1>

      <Row>
        <Col md={4}>
          <h5 style={{ color: "white" }}>Recharge Details</h5>
          <h6 style={{ color: "#9ba6a5" }}>
            Choose where, to whom and how much credit you want to send.
          </h6>
        </Col>
        <Col md={4}>
          <h5 style={{ color: "white" }}>Proceed to Payment</h5>
          <h6 style={{ color: "#9ba6a5" }}>Make the payment through PayPal.</h6>
        </Col>
        <Col md={4}>
          <h5 style={{ color: "white" }}>Phone is Recharged</h5>
          <h6 style={{ color: "#9ba6a5" }}>
            Your recharge is sent almost instantly and the recipient can enjoy
            the credit.
          </h6>
        </Col>
      </Row>
      <hr className="mt-4" />
    </Container>
  );
};

export default HowToRecharge;
