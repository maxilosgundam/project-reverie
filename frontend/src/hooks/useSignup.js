import { useState} from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
   
    const signup = async ( username, email, password, confirmPassword ) => {
        setIsLoading(true);
        setError(null);   
    
        if (password !== confirmPassword) {
          console.log('password is ', password, ' and confirmPassword is ', confirmPassword);
          setError("Passwords don't match");
          return;
        }
    
        try {
          const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });
    
          const data = await response.json();
    
          if(!response.ok){
            setIsLoading(false);
            setError(data.message);
          } else {
            setError(data.message);
          }
          
          if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            
            //update the auth context
            dispatch({type: 'LOGIN', payload: data});
            
            //update loading state
            setIsLoading(false);
          }
          
        } catch (err) {
          setError('An error occurred during sign up');
        }        
    }

    return {signup, isLoading, error}
    

    
}

