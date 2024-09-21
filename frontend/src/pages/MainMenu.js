import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';
import {useWorldsContext} from '../hooks/useWorldContext';


const storedUser = JSON.parse(localStorage.getItem('user')) || null;


const MainMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useWorldsContext();
    
  
useEffect(() => {
  //const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && !user) {
    dispatch({ type: 'LOGIN', payload: storedUser });
  }
}, [dispatch, user]);

const handleClick = () => {
  navigate('/createworld');
}


return (
  <div className="min-h-screen w-full bg-amber-50 flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold text-gray-800 mb-8 font-serif">Reverie</h1>
    <div className="mt-8 text-gray-700 font-serif text-2xl">Welcome, {user?.account?.username || 'Player'}!</div>
    <div className="space-y-4 w-full max-w-md mt-8">
      <button onClick={() => handleClick('/viewworlds')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">View Stradiaverse</button>
      <button onClick={() => handleClick('/createworld')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">Create RP World</button>
      <button onClick={() => handleClick('/joinworld')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">Join RP World</button>
      <button onClick={() => handleClick('/settings')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">User Account Settings</button>
      <button onClick={() => handleClick('/characters')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">My Characters</button>
      <button onClick={() => handleClick('/logout')} className="w-full py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 font-serif">Logout</button>
    </div>
  </div>
);
    
  }; 
  
  export default MainMenu;