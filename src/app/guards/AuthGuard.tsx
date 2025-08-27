import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { localStorageService } from '../services/index';

interface PrivateRouteProps {
    children: JSX.Element;
}

const AuthGuard = ({ children }: PrivateRouteProps) => {
    const location = useLocation();
    const currentUser = localStorageService.getItem('user') as any;
    if (!currentUser || !currentUser?.token) {
        return <Navigate to="/en/authentication" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthGuard;