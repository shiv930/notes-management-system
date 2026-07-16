import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router'

const ProtectedRoutes = ( {children}) => {
 let {isLoggedIn,loading} = useSelector((state)=>state.auth)

// if(loading){
//     return <h1>Loading...</h1>
// }
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoutes