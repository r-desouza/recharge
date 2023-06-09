import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth'

import {createContext, useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const provider = new GoogleAuthProvider();

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

    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

    }).catch ((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
    })}

    return(
        <UserContext.Provider value={{ createUser, user, signIn, logout, signInWithGoogle }}>
            {children}
        </UserContext.Provider>
    )




}

export const UserAuth = () => {
    return useContext(UserContext)
}
