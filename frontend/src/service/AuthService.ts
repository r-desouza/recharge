import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";

import { auth } from "../firebase";


class AuthService{
    async createUser(email: string, password: string){
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    
    async logout(){
        return await signOut(auth);
    }
    
    async signIn(email: string, password: string){
        return await signInWithEmailAndPassword(auth, email, password);
    }
    
    async signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;