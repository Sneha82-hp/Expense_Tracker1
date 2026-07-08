import { Outlet } from "react-router-dom";

const AuthRoute = () => {
    //const {accessToken, user} = useTypedSelector((state) => state.auth);

    //if (!accessToken && !user) return  <Outlet />;
    //return <Navigate to= {PROTECTED_ROUTES.OVERVIEW} replace/>;

    return  <Outlet />;
};

export default AuthRoute;