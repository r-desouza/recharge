import { useNavigate } from "react-router-dom";
import authServiceInstance from "../service/AuthService";
import { User } from "firebase/auth";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface Recarga {
  id: string;
  companiaRecarga: string;
  date: number;
  estadoRecarga: string;
  idComprador: string;
  montoRecarga: number;
  numeroTelefono: string;
  paisRecarga: string;
  paypalOrderID: string;
  paypalOrderStatus: string;
}

enum Status {
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

type AccountProps = {
  user: User | null;
};

export const Account = (props: AccountProps) => {
  const navigate = useNavigate();
  const [dataFiltrada, setDataFiltrada] = useState<Recarga[]>([]);

  const handleLogout = async () => {
    try {
      await authServiceInstance.logout();
      navigate("/");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const dbSnap = async () => {
      const querySnap = await getDocs(collection(db, "recargas"));
      const dbData: Recarga[] = querySnap.docs.map((doc) => {
        const recarga = doc.data() as Recarga;
        recarga.id = doc.id;
        return recarga;
      });

      setDataFiltrada(
        dbData.filter(
          (recarga: Recarga) => recarga.idComprador === props.user?.uid
        )
      );
      dataFiltrada.sort(function (a, b) {
        return b.date - a.date;
      });
    };

    dbSnap();
  }, []);

  const convertDate = (date: number) => {
    const convertedDate: Date = new Date(date);
    return convertedDate.toLocaleString();
  };

  const setButtonVariant = (status: string) => {
    if (status === Status.Pending) return "warning";
    if (status === Status.Cancelled) return "danger";
    if (status === Status.Completed) return "success";
    return "warning";
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center mb-4" style={{ color: "white" }}>
          User Account
        </h2>
        <div className="card">
          <div className="card-header">
            <h5>Welcome, {props.user?.displayName}</h5>
          </div>
          <div className="card-body">
            <h6>Email: {props.user?.email}</h6>
            <p>Account Details:</p>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Recharge History</Accordion.Header>
              <Accordion.Body>
                <table className="table caption-top bg-white rounded mt-2 table-sm">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        #
                      </th>
                      <th className="text-center" scope="col">
                        Recharge id
                      </th>
                      <th className="text-center" scope="col">
                        brand
                      </th>
                      <th className="text-center" scope="col">
                        phone number
                      </th>
                      <th className="text-center" scope="col">
                        amount
                      </th>
                      <th className="text-center" scope="col">
                        date
                      </th>
                      <th className="text-center" scope="col">
                        status
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {dataFiltrada.map((recarga, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="text-center">{recarga.id}</td>
                        <td className="text-center">
                          {recarga.companiaRecarga}
                        </td>
                        <td className="text-center">
                          {recarga.numeroTelefono}
                        </td>
                        <td className="text-center">
                          {recarga.montoRecarga} USD
                        </td>
                        <td className="text-center">
                          {convertDate(recarga.date)}
                        </td>
                        <td className="text-center">
                          <Button
                            variant={setButtonVariant(recarga.estadoRecarga)}
                          >
                            {recarga.estadoRecarga}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="text-center mt-4">
          <Button variant="primary">Edit Account</Button>
          <Button variant="danger">Delete Account</Button>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <div></div>
      </div>
    </>
  );
};

export default Account;
