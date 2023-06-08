import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {createContext, useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

useEffect(() => {
  const unsuscribe = onAuthStateChanged(auth, (currentUser) =>{
    console.log(currentUser)
    setUser(currentUser)
  })
  return() => {
    unsuscribe();
  }
},[])



    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    return(
        <UserContext.Provider value={{ createUser, user, signIn, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}
