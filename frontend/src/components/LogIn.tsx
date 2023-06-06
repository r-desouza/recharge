import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const LogIn = () => {
  const valorInicial = {
    nombre: "",
    password: "",
  };

  const [usuario, setUsuario] = useState(valorInicial);

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form>
          <h2 className="text-center mb-3">Welcome back!</h2>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              required
              name="correo"
              value={usuario.correo}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              required
              name="apellido"
              value={usuario.apellido}
            />
          </div>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <button className="btn btn-primary form-control">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
