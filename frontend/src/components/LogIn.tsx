import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { User } from "firebase/auth";
import authServiceInstance from "../service/AuthService";
import { Link } from "react-router-dom";
import useToast from "../hooks/useToast";

type LoginProps = {
  user: User | null;
};

const LogIn = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast, toast } = useToast();

  const handleClassicLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authServiceInstance.signIn(email, password);
      navigate("/account");
    } catch (e: any) {
      showToast("Login failed", "Invalid email/password");
      console.log(e.message);
    }
  };

  const handleGoogleLogin = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await authServiceInstance.signInWithGoogle();
      navigate("/Account");
    } catch (e: any) {
      showToast("Google LogIn error", e.message);
    }
  };

  useEffect(() => {
    if (props.user != null) {
      navigate("/Account");
    }
  }, []);

  return (
    <>
      {toast()}
      <div className="col-md-4 offset-md-4">
        <div className="card card-body">
          <form onSubmit={handleClassicLogin}>
            <h2 className="text-center mb-3">We are glad to see you again!</h2>

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
            <div className="mb-3">
              <button className="btn btn-primary form-control">Log in</button>
            </div>
          </form>

          <p style={{ textAlign: "center", color: "black" }}>
            <Link to="/SignUp">Don't have an account yet? JOIN NOW →</Link>
          </p>
          <hr className="hr hr-blurry" />

          <div>
            <GoogleButton
              className="mx-auto mt-3"
              onClick={handleGoogleLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
