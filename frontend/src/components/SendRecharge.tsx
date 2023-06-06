import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { all } from "mcc-mnc-list";

const list = all();

const SendRecharge = () => {
  const uniqueCountries = [
    ...new Set(list.map((option) => option.countryName)),
  ];

  return (
    <div>
      <div>
        <Card className="col-md-4 offset-md-4">
          <Card.Title className="text-center mb-3 mt-4">
            Recharge Mobiles Online
          </Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Select aria-label="Default select example">
                  {uniqueCountries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit">
                Recharge Now
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SendRecharge;
