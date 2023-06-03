import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getUsuarios();
  },[]);

  const getUsuarios = async () => {

    axios.get("http://localhost:4000/api/usuarios/")
    .then(response => setLista(response.data))
    .catch(error => console.error("Error:", error))

  };

  const eliminarUsuario = async (id) => {

    axios.delete("http://localhost:4000/api/usuarios/" + id)
    .then(response => console.log("Success: ", response.statusText))
    .catch(error => console.error("Error:", error))

  };

  return (
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
  );
};

export default ListaUsuario;
