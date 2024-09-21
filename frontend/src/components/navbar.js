import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import {useAuthContext} from '../hooks/useAuthContext';



const NavBar = () => {
    
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout();
    }
    
    return ( 
        <header className="bg-amber-100 text-gray-800 border-b border-amber-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold hover:text-amber-600 transition duration-300">
          Reverie
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li><Link to="/" className="hover:text-amber-600 transition duration-300">Home</Link></li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-amber-600 transition duration-300">Worlds</span>
              <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block">
                <li><Link to="/viewworlds" className="block px-4 py-2 hover:bg-amber-100">View Worlds</Link></li>
                <li><Link to="/createworld" className="block px-4 py-2 hover:bg-amber-100">Create World</Link></li>
                <li><Link to="/joinworld" className="block px-4 py-2 hover:bg-amber-100">Join World</Link></li>
              </ul>
            </li>
            <li><Link to="/characters" className="hover:text-amber-600 transition duration-300">Characters</Link></li>
            <li><Link to="/community" className="hover:text-amber-600 transition duration-300">Community</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" className="hover:text-amber-600 transition duration-300">Profile</Link></li>
                <li>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/signin" className="hover:text-amber-600 transition duration-300">Sign In</Link></li>
                <li><Link to="/signup" className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition duration-300">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
      );
    }
 
export default NavBar;