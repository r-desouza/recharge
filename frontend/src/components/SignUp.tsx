import React, { useEffect, useState } from "react";
import axios from "axios";

const CrearUsuarios = () => {
  const valorInicial = {
    nombre: "",
    apellido: "",
    correo: "",
  };

  const [usuario, setUsuario] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const guardarDatos = async (e) => {

    e.preventDefault();

      try {

        await axios.post(process.env.REACT_APP_API_URL + "/api/usuarios/", usuario)

      } catch (error) {
        console.error("Error:", error);
      }
    
    setUsuario({ ...valorInicial });
  };


  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Welcome!</h2>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el nombre del usuario"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-3">
            <label>Apellido</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el apellido del usuario"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-3">
            <label>Correo</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresa tu correo"
              required
              name="correo"
              value={usuario.correo}
              onChange={capturarDatos}
            />
          </div>

          <button className="btn btn-primary form-control">
            Register
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default CrearUsuarios;
