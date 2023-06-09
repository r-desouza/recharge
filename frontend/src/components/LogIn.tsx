import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const LogIn = () => {

  const {signIn} = UserAuth()
  const {signInWithGoogle} = UserAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      console.log(email + " " + password)
      await signIn(email,password)
      navigate('/account')
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSubmit2 = async (e) =>{
    e.preventDefault();
    try {
      console.log("mori")
      await signInWithGoogle()
      navigate('/account')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Welcome back!</h2>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              required
              name="correo"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              required
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <button className="btn btn-primary form-control">Log in</button>
        </form>
        <div>
        <button  onClick={handleSubmit2} className="btn btn-primary form-control mt-3">You can also log in with google! (cap)</button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
