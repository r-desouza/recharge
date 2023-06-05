import React, { useEffect, useState } from "react";



const LogIn = () => {

    const valorInicial = {
        nombre: "",
        apellido: "",
        correo: "",
      };
      
      const [usuario, setUsuario] = useState(valorInicial);

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form >
          <h2 className="text-center mb-3">Welcome back</h2>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el nombre del usuario"
              required
              name="nombre"
              value={usuario.nombre}
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
            />
          </div>

          <button className="btn btn-primary form-control">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
