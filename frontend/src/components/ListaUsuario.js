import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        await fetch("http://localhost:4000/api/usuarios/", {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => setLista(data));

        console.log("aca se ejecuta una vez");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await fetch("http://localhost:4000/api/usuarios/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => console.log("Success: ", res.ok));
    } catch (error) {
      console.error("Error:", error);
    }
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
