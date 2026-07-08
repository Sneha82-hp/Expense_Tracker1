import { Outlet } from "react-router-dom";


const ProtectedRoute = () => {
  //const {accessToken, user}= useTypedSelector((state) => state.auth);

  //if(accessToken && user) return <Outlet />;
    //return <Navigate to= {AUTH_ROUTES.SIGN_IN} replace/>;
  return <Outlet />;  
};

export default ProtectedRoute;