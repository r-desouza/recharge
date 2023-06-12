import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import useLoggedUser from "../hooks/useLoggedUser";
import { User } from "firebase/auth";

type LoginProps = {
  user: User;
}

const LogIn = (props: LoginProps) => {
  const { signIn } = UserAuth();
  const { signInWithGoogle } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(email + " " + password);
      await signIn(email, password);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      navigate("/Account")
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (props.user != null) {
      navigate("/Account");
    }
  }, []);

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
        <hr className="hr hr-blurry" />
        <div>
          <GoogleButton  className="mx-auto mt-3" onClick={handleSubmit2}  />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
