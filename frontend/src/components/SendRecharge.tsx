import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { all, filter } from "mcc-mnc-list";
import { useState, useEffect } from "react";
import prefixData from "../prefix-phone.json"
import { collection, addDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from "../context/AuthContext";

//PENDIENTE: MANEJAS LOS NULL DE ALGUNA FORMA

const SendRecharge = (props) => {
  const list = all();
  const uniqueCountries2 = new Map(list.map(pais => [pais.countryName ,pais.countryCode]))
  const uniqueCountries = [...uniqueCountries2];
  const user = props.user;
  console.log(user)
  let coCode = ' ';
  uniqueCountries.sort();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [phone, setPhone] = useState(""); 
  const [amount, setAmount] = useState("");
  const [uniqueOps, setUniqueOps] = useState([]);

  const setSelectedCountryHandler = (e) => {
    const [key, value] = e.target.value.split(',')
    setSelectedCountry({ [key]: value });
  };

  const setSelectedBrandHandler = (e) => {
    setSelectedBrand(e.target.value);
  };

  useEffect(() => {
    coCode = Object.values(selectedCountry)[0];
    setSelectedPrefix(prefixData[coCode])
    const ops = filter({
      statusCode: "Operational",
      countryCode: Object.values(selectedCountry)[0],
    });
    if(Object.values(selectedCountry)[0] !== undefined){
    const uniqueOperators = [...new Set(ops.map((option) => option.brand))];
    uniqueOperators.sort();
    setUniqueOps(uniqueOperators);
    setSelectedBrand(uniqueOperators[0])
    }
  }, [selectedCountry]);

  // SUBIR RECARGA A LA DB

  const submitRecharge = async (e) => {
    e.preventDefault();
    console.log(selectedBrand)
    try{ 
      const recarga = {
        companiaRecarga: selectedBrand,
        date: Date.now(),
        estadoRecarga: "Pendiente",
        idComprador: user.uid,
        montoRecarga: amount,
        numeroTelefono: '+' + selectedPrefix + ' '+ phone,
        paisRecarga: Object.keys(selectedCountry)[0]
      }

      await addDoc( collection(db, 'recargas'), recarga)

      console.log(recarga)

    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div>
      <div>
        <Card className="col-md-4 offset-md-4">
          <Card.Title className="text-center mb-3 mt-4">
            Recharge Mobiles Online
          </Card.Title>
          <Card.Body>
            <Form onSubmit={submitRecharge}>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={selectedCountry[0]}
                  onChange={setSelectedCountryHandler}
                >
                  {uniqueCountries.map((country) => (
                    <option key={country[1]} value={country}>{country[0]}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="operator">
                <Form.Label>Operator</Form.Label>
                <Form.Select 
                aria-label="Default select example" 
                value={selectedBrand}
                onChange={setSelectedBrandHandler}>
                  {uniqueOps.map((operator) => (
                    <option key={operator}>{operator}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup.Text>+{selectedPrefix}</InputGroup.Text>
                <Form.Control onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control onChange={(e) => setAmount(e.target.value)} aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className='col-md-12 text-center'>
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
