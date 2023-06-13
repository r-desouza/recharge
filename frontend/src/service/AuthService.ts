import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    User,
  } from "firebase/auth";

import { auth, db } from "../firebase";
import {collection, getDocs} from 'firebase/firestore'


class AuthService{
    async createUser(email: string, password: string){
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    
    async logout(){
        return await signOut(auth);
    }
    
    async signIn(email: string, password: string): Promise<User>{
        const result = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            throw new Error("Error logging in");
        });

        return result.user;
    }
    
    async signInWithGoogle(): Promise<User>{
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          throw new Error("Error logging in");
        });

        return result.user;
    }

    async verifyAdmin(id: string) : Promise<boolean>{
        const whitelistSnap = await getDocs(collection(db, 'whitelist'))
        let admin = false;

        whitelistSnap.forEach((doc) =>{
            if(id === doc.id){
                admin = true;
            }
        })

        return admin
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;