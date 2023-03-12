import { Navigate } from "react-router-dom";
import { isAuth } from "./common";

const ProtectedRoute = ({ children }) => {

    return isAuth() ? children : <Navigate to="/" replace />;

}

export default ProtectedRoute;
