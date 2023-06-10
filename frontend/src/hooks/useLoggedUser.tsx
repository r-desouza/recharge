import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useLoggedUser = () => {
  const [userLoggeado, setUserLoggeado] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {

      if (authUser) {
        setUserLoggeado(authUser);
      } else {
        setUserLoggeado(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

 

  return userLoggeado;
};

export default useLoggedUser;