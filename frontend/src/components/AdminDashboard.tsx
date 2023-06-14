import { Nav } from "react-bootstrap";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import useToast from "../hooks/useToast";
import { User } from "firebase/auth";
import Fade from 'react-bootstrap/Fade';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

export const AdminDashboard = (props: AccountProps) => {
  const [data, setData] = useState<Recarga[]>([]);
  const [dataFiltrada, setDataFiltrada] = useState<Recarga[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTabla, setLoadingTabla] = useState(true);
  const { showToast, toast } = useToast();
  const [tituloDDL, setTituloDDL] = useState("Filtrar");

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

  useEffect(() => {
    const dbSnap = async () => {
      const querySnap = await getDocs(collection(db, "recargas"));
      const dbData: Recarga[] = querySnap.docs.map((doc) => {
        const recarga = doc.data() as Recarga;
        recarga.id = doc.id;
        return recarga;
      });
      setData(dbData);
      setLoading(false);
      filtrarPorEstado(Status.Pending, dbData);
      console.log(dbData);
      console.log(dataFiltrada);
    };

    dbSnap();
  }, []);

  const cachedData = useMemo(() => [...data], [data]);

  const filtrarPorEstado = (estado: string, array?: []) => {
    setLoadingTabla(true);
    let listaFiltrada = null;
    

    if (array != null) {
      listaFiltrada = array.filter((recarga) => recarga.estadoRecarga == estado);
    } else {
      listaFiltrada = data.filter((recarga) => recarga.estadoRecarga == estado);
    }

    setTimeout(() => {
      setTituloDDL(estado)
      setDataFiltrada(listaFiltrada);
      setLoadingTabla(false);
    }, 175);


    
  };

  const updateDocument = async (id: string, status: string) => {
    const updatedData = cachedData.map((doc) => {
      if (doc.id === id) {
        doc.estadoRecarga = status;
      }
      return doc;
    });

    setData(updatedData);
    

    console.log("llegue aca");

    try {
      await updateDoc(doc(db, "recargas", id), { estadoRecarga: status });
      showToast("Server updated", "Status succesfully changed to: " + status);
    } catch (error) {
      showToast("Server error", "Failed to change status");
    }
  };

  const sum = data.reduce((accumulator, recharge) => {
    const value = parseFloat(recharge.montoRecarga);
    return accumulator + value;
  }, 0);

  const countPendientes = data.filter(
    (recarga) => recarga.estadoRecarga === "Pending"
  ).length;

  const lastWeekStartDate = new Date();
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);

  const countThisWeek = data.filter((timestamp) => {
    const date = new Date(timestamp.date);
    return date > lastWeekStartDate && date <= new Date();
  }).length;

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          {toast()}
          <div className="px-3">
            <div className="card">
              <div className="card-header">
                <h5>Welcome back, {props.user?.displayName}</h5>
              </div>
            </div>
            <Nav />
            <div className="container-fluid">
              <div className="row g-3 my-2">
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">{data.length}</h3>
                      <p className="fs-5">Recharges</p>
                    </div>
                    <i className="bi bi-cart-plus p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">$ {sum}</h3>
                      <p className="fs-5">Revenue</p>
                    </div>
                    <i className="bi bi-currency-dollar p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">{countPendientes}</h3>
                      <p className="fs-5">Pending sales</p>
                    </div>
                    <i className="bi bi-truck p-3 fs-1"></i>
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <h3 className="fs-2">{countThisWeek}</h3>
                      <p className="fs-5">This week</p>
                    </div>
                    <i className="bi bi-graph-up-arrow p-3 fs-1"></i>
                  </div>
                </div>
              </div>
            </div>

           
            <Fade timeout={100} in={!loadingTabla}>
              
            <table className="table caption-top bg-white rounded mt-2 table-sm" >
            <caption className="text-white fs-4">Recent Orders </caption>
            <caption>
            <DropdownButton className="" variant="secondary" id="dropdown-basic-button" title={tituloDDL}>
              <Dropdown.Item onClick={() => filtrarPorEstado(Status.Completed)}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => filtrarPorEstado(Status.Pending)}>Pending</Dropdown.Item>
               <Dropdown.Item onClick={() => filtrarPorEstado(Status.Cancelled)}>Cancelled</Dropdown.Item>
             </DropdownButton>
            </caption>
            
              <thead>

                <tr>
                  <th className="text-center"scope="col">#</th>
                  <th className="text-center" scope="col">buyer email</th>
                  <th className="text-center" scope="col">country</th>
                  <th className="text-center" scope="col">brand</th>
                  <th className="text-center" scope="col">phone number</th>
                  <th className="text-center" scope="col">amount</th>
                  <th className="text-center" scope="col">date</th>
                  <th className="text-center" scope="col">status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {dataFiltrada.map((recarga, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-center" >{recarga.idComprador}</td>
                    <td className="text-center" >{recarga.paisRecarga}</td>
                    <td className="text-center">{recarga.companiaRecarga}</td>
                    <td className="text-center">{recarga.numeroTelefono}</td>
                    <td className="text-center">${recarga.montoRecarga}</td>
                    <td className="text-center" >{convertDate(recarga.date)}</td>
                    <td>
                      <Dropdown as={ButtonGroup}>
                        <Button
                          variant={setButtonVariant(recarga.estadoRecarga)}
                        >
                          {recarga.estadoRecarga}
                        </Button>

                        <Dropdown.Toggle
                          split
                          variant={setButtonVariant(recarga.estadoRecarga)}
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              updateDocument(recarga.id, Status.Pending)
                            }
                          >
                            Pending
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              updateDocument(recarga.id, Status.Completed)
                            }
                          >
                            Completed
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              updateDocument(recarga.id, Status.Cancelled)
                            }
                          >
                            Cancelled
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </Fade>
          </div>
        </>
      )}
    </>
  );
};
export default AdminDashboard;
