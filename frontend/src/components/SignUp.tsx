import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import authServiceInstance from "../service/AuthService";

const CrearUsuarios = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  if (password === confirmPassword) {
    try{
      await authServiceInstance.createUser(email,password)
      navigate('/Account')
    }catch(e: any){
      alert(e.message)
    }
  } else {
    setPasswordMatch(false);
    alert("Passwords do not match")
  }
}

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleConfirmPasswordChange = (e) => {
  setConfirmPassword(e.target.value);
};

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Welcome!</h2>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
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
              onChange={handlePasswordChange} 
            />
          </div>
          {!passwordMatch && <p>Passwords do not match.</p>}
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              required
              name="passwordConfirmation"
              onChange={handleConfirmPasswordChange}
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
