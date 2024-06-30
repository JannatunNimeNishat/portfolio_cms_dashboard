import { useEffect, useState } from "react";

const useGetLoggedInUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('seller-id'));
  
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === 'access_token') {
          setIsLoggedIn(!!e.newValue);
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
  
    return isLoggedIn;
  };
  
  export default useGetLoggedInUser;