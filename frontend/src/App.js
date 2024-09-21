import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import MainMenu from './pages/MainMenu';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateWorld from './pages/CreateWorld';
import NavBar from './components/navbar';
import WorldImage from './components/worldimage';





function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      
       <NavBar />
      <div className="pages">
        <Routes>
        <Route path="/" element={user ?<MainMenu />: <Navigate to="/signin" />} />
        <Route path="/signin" element={!user ?<SignIn />: <Navigate to="/" />} />
        <Route path="/signup" element={!user ?<SignUp />: <Navigate to="/" />} />
        <Route path="/createworld" element={user ?<CreateWorld />: <Navigate to="/signin" />} />
      </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
