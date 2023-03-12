import { Navigate } from "react-router-dom";
import { isAuth, PATH } from "./common";

const ProtectedRoute = ({ children }) => {

    return isAuth() ? children : <Navigate to={PATH.HOME} replace />;

}

export default ProtectedRoute;
