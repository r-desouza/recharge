import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useLoggedUser = () => {
  const [userLoggeado, setUserLoggeado] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {

      if (authUser) {
        setUserLoggeado(authUser);
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

  return { userLoggeado, loading };
};

export default useLoggedUser;