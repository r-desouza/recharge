import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getUsuarios();
  },[]);

  const getUsuarios = async () => {
    console.log(process.env.REACT_APP_API_URL + "/api/usuarios/")

    axios.get(process.env.REACT_APP_API_URL + "/api/usuarios/")
    .then(response => setLista(response.data))
    .catch(error => console.error("Error:", error))

  };

  const eliminarUsuario = async (id) => {

    axios.delete(process.env.REACT_APP_API_URL + "/api/usuarios/" + id)
    .then(response => console.log("Success: ", response.statusText))
    .catch(error => console.error("Error:", error))

  };

  return (<>
<div >
      <h1 className="text-white text-center mb-3 mt-4">Home</h1>
    </div>



    <div className="row">
      {lista.map((list) => (
        <div className="col-md-4 p-2" key={list._id}>
          <div className="card">
            <div className="card-header">
              <h5>Nombre: {list.nombre}</h5>
            </div>

            <div className="card-body">
              <p>Apellido: {list.apellido}</p>
              <p>Edad: {list.edad}</p>
              <p>Telefono: {list.telefono}</p>
              <p>Correo: {list.correo}</p>
            </div>
            <div className="card=footer">
              <button
                className="btn btn-danger"
                onClick={() => eliminarUsuario(list._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ListaUsuario;