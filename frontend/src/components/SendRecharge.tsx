import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { all, filter } from "mcc-mnc-list";
import { useState, useEffect } from "react";
import importPrefixData from "../prefix-phone.json";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { User } from "firebase/auth";
import { InputMask } from "primereact/inputmask";
import useToast from "../hooks/useToast";

interface SendRechargeProps {
  user: User | null;
}

interface PrefixData {
  [key: string]: any;
}

const prefixData = importPrefixData as PrefixData;

interface RechargeData {
  selectedCountry: { [key: string]: string };
  selectedBrand: string;
  amount: string;
  selectedPrefix: string;
  phone: string;
  status?: string;
  orderId?: string;
}

const SendRecharge = (props: SendRechargeProps) => {
  const list = all();
  // const uniqueCountries2 = new Map(
  //   list.map((pais) => [pais.countryName, pais.countryCode])
  // );
  const uniqueCountries2 = new Map(
    list
      .filter((pais) => pais.countryName && pais.countryCode)
      .map((pais) => [pais.countryName, pais.countryCode])
  );

  const uniqueCountries = [...uniqueCountries2];
  const uid = props.user?.uid;
  uniqueCountries.sort();

  const [selectedCountry, setSelectedCountry] = useState<{
    [key: string]: string;
  }>({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [uniqueOps, setUniqueOps] = useState<string[]>([]);

  const { showToast, toast } = useToast();

  const setSelectedCountryHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [key, value] = e.target.value.split(",");
    setSelectedCountry(() => ({ [key]: value }));
  };

  const setSelectedBrandHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  useEffect(() => {
    const coCode = Object.values(selectedCountry)[0];
    setSelectedPrefix(prefixData[coCode]);
    const ops = filter({
      statusCode: "Operational",
      countryCode: Object.values(selectedCountry)[0],
    });
    if (Object.values(selectedCountry)[0] !== undefined) {
      // const uniqueOperators = [...new Set(ops.map((option) => option.brand))];
      const uniqueOperators = [
        ...new Set(
          ops.map((option) =>
            option.brand && option.brand !== "" ? option.brand : null
          )
        ),
      ].filter((brand) => brand !== null);
      uniqueOperators.sort();
      setUniqueOps(uniqueOperators);
      setSelectedBrand(uniqueOperators[0]);
    }
  }, [selectedCountry]);

  // SUBIR RECARGA A LA DB

  const submitRecharge = async (data: RechargeData) => {
    try {
      const recarga = {
        companiaRecarga: data.selectedBrand,
        date: Date.now(),
        estadoRecarga: "Pending",
        idComprador: uid,
        montoRecarga: data.amount,
        numeroTelefono: "+" + data.selectedPrefix + " " + data.phone,
        paisRecarga: Object.keys(data.selectedCountry)[0],
        paypalOrderID: data.orderId,
        paypalOrderStatus: data.status,
      };

      showToast("Successs", "Recharge submitted successfully");

      await addDoc(collection(db, "recargas"), recarga);
    } catch (e) {
      showToast("Server error", "Failed submit order, please contact support.");
    }
  };

  return (
    <>
      {toast()}
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
                    <option>Select country</option>
                    {uniqueCountries.map((country) => (
                      <option key={country[1]} value={country}>
                        {country[0]}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="operator">
                  <Form.Label>Operator</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedBrand}
                    onChange={setSelectedBrandHandler}
                    disabled={Object.values(selectedCountry)[0] === undefined}
                  >
                    {uniqueOps.map((operator) => (
                      <option key={operator}>{operator}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Label>Phone Number</Form.Label>
                <Form.Group
                  className="mb-3 me-3 d-flex"
                  controlId="phoneNumber"
                >
                  <InputGroup.Text style={{ maxWidth: "96px" }}>
                    +{selectedPrefix}
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputMask
                      mask="99.99"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="form-control"
                      slotChar="00"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </InputGroup>
                </Form.Group>

                <PayPalButtons
                  style={{
                    color: "blue",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill",
                    label: "checkout",
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: "recharge",
                          amount: {
                            value: amount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    const status = order?.status;
                    const orderId = order?.id;
                    // Call 'submitRecharge' function after capturing the order
                    await submitRecharge({
                      selectedCountry,
                      selectedBrand,
                      amount,
                      selectedPrefix,
                      phone,
                      status,
                      orderId,
                    });
                  }}
                  forceReRender={[
                    selectedCountry,
                    selectedBrand,
                    amount,
                    phone,
                    selectedPrefix,
                  ]}
                  onError={(err) => {
                    showToast(
                      "Paypal  Checkout Error",
                      "Please make sure you're entering a valid input"
                    );
                  }}
                />
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SendRecharge;
