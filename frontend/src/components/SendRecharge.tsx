import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { all, filter } from "mcc-mnc-list";
import { useState, useEffect } from "react";
import prefixData from "../prefix-phone.json"
import { collection, addDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { PayPalButtons } from '@paypal/react-paypal-js'
import useLoggedUser from "../hooks/useLoggedUser";
import { User } from "firebase/auth";

//PENDIENTE: MANEJAS LOS NULL DE ALGUNA FORMA

type SendRechargeProps = {
  user: User;
}

type RechargeData = {
  selectedCountry: string,
  selectedBrand: string,
  amount: string,
  selectedPrefix: string,
  phone: string,
}

const SendRecharge = (props: SendRechargeProps) => {
  const list = all();
  const uniqueCountries2 = new Map(list.map(pais => [pais.countryName ,pais.countryCode]))
  const uniqueCountries = [...uniqueCountries2];
  const uid = props.user.uid
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
    console.log("Selected country:" + { [key]: value })
    setSelectedCountry({ [key]: value });
  };

  const setSelectedBrandHandler = (e) => {
    console.log("Selected brand:" + e.target.value)
    setSelectedBrand(e.target.value);
  };
  console.log("SELECTED COUNTRY:" + selectedCountry)
  console.log("SELECTED BRAND:" + selectedBrand)
  console.log("SELECTED AMOUNT:" + amount)
  console.log("SELECTED PHONE:" + phone)
  console.log("SELECTED PREFIX:" + selectedPrefix)
  console.log("UID:" + uid)

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

  const submitRecharge = async (data: RechargeData) => {
    console.log("SELECTED COUNTRY:" + data.selectedCountry)
    console.log("SELECTED BRAND:" + data.selectedBrand)
    console.log("SELECTED AMOUNT:" + data.amount)
    console.log("SELECTED PHONE:" + data.phone)
    console.log("SELECTED PREFIX:" + data.selectedPrefix)
    console.log("UID:" + uid)

    try{ 
      const recarga = {
        companiaRecarga: data.selectedBrand,
        date: Date.now(),
        estadoRecarga: "Pendiente",
        idComprador: uid,
        montoRecarga: data.amount,
        numeroTelefono: '+' + data.selectedPrefix + ' '+ data.phone,
        paisRecarga: Object.keys(data.selectedCountry)[0]
      }

      console.log("Final recharge objec666t:" + recarga);

      await addDoc( collection(db, 'recargas'), recarga)

    } catch (e){
      console.log(e)
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
            <Form>
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

              <PayPalButtons style={{
                color: "blue",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill",
                label: "checkout"
              }}

              createOrder={(data, actions) => {

                console.log("SELECTED COUNTRY:" + selectedCountry)
                console.log("SELECTED BRAND:" + selectedBrand)
                console.log("SELECTED AMOUNT:" + amount)
                console.log("SELECTED PHONE:" + phone)
                console.log("SELECTED PREFIX:" + selectedPrefix)
                console.log("UID:" + uid)
            



                return actions.order.create({
                  purchase_units: [
                    {
                      description: 'recharge',
                      amount: {
                        value: "1.99",
                      },
                    },
                  ],
                });
              }}

              onApprove={async (data, actions) => {
                const order = await actions.order?.capture()
               // Call 'submitRecharge' function after capturing the order
                await submitRecharge( { selectedCountry, selectedBrand, amount, selectedPrefix, phone })
              }}
              
              onError={(err) =>{
                console.error("Paypal  Checkout onERROR", err)
              }}
              />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SendRecharge;
