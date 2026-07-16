import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux";
const PublicRoutes = ({children}) => {
  const {isLoggedIn, loading} = useSelector((state)=>state.auth)
  // if(loading){
  //   return <h1>Loading...</h1>
  // }
  return isLoggedIn? <Navigate to= "/dashboard"/>: children 
};

export default PublicRoutes 