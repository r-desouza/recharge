import React from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate} from 'react-router-dom'

export const Account = () => {
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
    <div>
        <h2>Account</h2>
        <p>UserEmail: {user && user.email} </p>
        <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Account