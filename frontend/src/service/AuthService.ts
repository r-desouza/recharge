import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";

import { auth, db } from "../firebase";
import {collection, getDoc, getDocs} from 'firebase/firestore'


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

    async verifyAdmin(id: string) : Promise<{admin: boolean}>{
        const whitelistSnap = await getDocs(collection(db, 'whitelist'))
        let admin = false;

        whitelistSnap.forEach((doc) =>{
            if(id === doc.id){
                admin = true;
            }
        })

        return {admin}
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;