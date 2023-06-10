import React from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate} from 'react-router-dom'
import { useEffect } from "react";

export const Account = (props) => {

    useEffect(() => {
        console.log(props.user)
        if (props.user == null) {
          navigate("/LogIn");
        }
      }, []);

    const {user, logout } = UserAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try{
            await logout()
            navigate('/')
        }catch (e){
            console.log(e.message)
        }
    }

  return (
    props.user != null && 
    <div>
        <h2>Account</h2>
        <p>UserEmail: {props.user && props.user.email} </p>
        <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Account