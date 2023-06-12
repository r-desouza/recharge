import React, { useEffect, useState } from "react";
import {useNavigate, Link} from 'react-router-dom'
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


const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  setPassword(value);
  setPasswordMatch(value === confirmPassword);
};

const handleConfirmPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  setConfirmPassword(value);
  setPasswordMatch(value === password);
};

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card card-body">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Looks like you're new here!</h2>

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
              onInput={handlePasswordChange} 
            />
          </div>
          
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              required
              name="passwordConfirmation"
              onInput={handleConfirmPasswordChange}
            />
          </div>
          {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match.</p>}

          <button type="submit" className="btn btn-primary form-control">
            Register
          </button>


          <p style={{ textAlign: 'center', color: 'black'}}>
            <Link to="/LogIn">Already have an account? Log in →</Link>
        </p>
        </form>
       
      </div>
    </div>
  );
};

export default CrearUsuarios;
