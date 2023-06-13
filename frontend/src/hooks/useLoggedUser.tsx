import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import authServiceInstance from "../service/AuthService";

const useLoggedUser = () => {
  const [userLoggeado, setUserLoggeado] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async (uid: string) => {
      try {
        const { admin } = await authServiceInstance.verifyAdmin(uid);
        setIsAdmin(admin);
      } catch {
        console.log("error whitelist check");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUserLoggeado(authUser);
        await checkAdmin(authUser.uid);
        setLoading(false);
      } else {
        setUserLoggeado(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { userLoggeado, loading, isAdmin };
};

export default useLoggedUser;
