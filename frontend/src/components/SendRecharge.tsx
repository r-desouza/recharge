import { Card, Form, InputGroup, Modal, Button } from "react-bootstrap";
import { all, filter } from "mcc-mnc-list";
import { useState, useEffect } from "react";
import importPrefixData from "../prefix-phone.json";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { User } from "firebase/auth";
import { InputMask } from "primereact/inputmask";
import useToast from "../hooks/useToast";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

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
  const uniqueCountries2 = new Map(
    list
      .filter((pais) => pais.countryName && pais.countryCode)
      .map((pais) => [pais.countryName, pais.countryCode])
  );

  const uniqueCountries = [...uniqueCountries2];
  const uid = props.user?.uid;
  uniqueCountries.sort();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<{
    [key: string]: string;
  }>({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [uniqueOps, setUniqueOps] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [rechargeId, setRechargeId] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleProfile = () => {
    navigate("/account");
  };

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
      const uniqueOperators = [
        ...new Set(
          ops.map((option) =>
            option.brand && option.brand !== "" ? option.brand : null
          )
        ),
      ].filter((brand) => brand !== null) as string[];
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
        numeroTelefono: "+" + (data.selectedPrefix || "") + " " + data.phone,
        paisRecarga: Object.keys(data.selectedCountry)[0],
        paypalOrderID: data.orderId,
        paypalOrderStatus: data.status,
      };

      showToast("Successs", "Recharge submitted successfully");

      await addDoc(collection(db, "recargas"), recarga);

      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          {
            user_email: props.user?.email,
            companiaRecarga: recarga.companiaRecarga,
            date: new Date(recarga.date).toString(),
            estadoRecarga: recarga.estadoRecarga,
            idComprador: recarga.idComprador,
            montoRecarga: recarga.montoRecarga,
            numeroTelefono: recarga.numeroTelefono,
            paisRecarga: recarga.paisRecarga,
            paypalOrderID: recarga.paypalOrderID,
            paypalOrderStatus: recarga.paypalOrderStatus,
          },
          import.meta.env.VITE_EMAIL_USER_ID
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("message sent");
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (e) {
      console.log(e);
      showToast("Server error", "Failed submit order, please contact support.");
    }
  };

  return (
    <>
      {toast()}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Modal.Header >
                <Card.Title>Recharge submitted successfully</Card.Title>
              </Modal.Header>
              <Modal.Body>
                <Card.Text>
                Your recharge number id is #{rechargeId} <br></br>
          You can see the recharge details in your profile!
                </Card.Text>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleProfile}>
                  Profile
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Recharge Again
                </Button>
              </Modal.Footer>
            </Card.Body>
          </Card>
        </Modal>
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
                    onKeyDown={(e) => {
                      const keyCode = e.which || e.keyCode;
                      const isNumber =
                        (keyCode >= 48 && keyCode <= 57) ||
                        (keyCode >= 96 && keyCode <= 105);
                      const isDeleteOrBackspace =
                        keyCode === 8 || keyCode === 46;
                      if (!isNumber && !isDeleteOrBackspace) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Enter phone number"
                    maxLength={15}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputMask
                      mask="99.99"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value as string)}
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
                    data;
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
                  onClick={() => {
                    if (
                      Object.values(selectedCountry)[0] === undefined ||
                      amount == "00.00" ||
                      !phone
                    ) {
                      throw new Error("Invalid input");
                    }
                  }}
                  onApprove={async (data, actions) => {
                    data;
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
                    setRechargeId(orderId as string);
                    handleShow();
                  }}
                  forceReRender={[
                    selectedCountry,
                    selectedBrand,
                    amount,
                    phone,
                    selectedPrefix,
                  ]}
                  onError={() => {
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
