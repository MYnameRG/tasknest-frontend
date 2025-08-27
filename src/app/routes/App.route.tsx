import { Navigate, Route, Routes } from "react-router";
import Authentication from "../pages/Authentication";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import ManageTask from "../pages/ManageTask";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import AuthGuard from "../guards/AuthGuard";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="en" element={<App />}>
                    <Route path="authentication" element={<Authentication />} />
                    <Route path="main">
                        <Route index path="dashboard" element={
                            <AuthGuard>
                                <Dashboard />
                            </AuthGuard>
                        } />
                        <Route path="manage-task" element={
                            <AuthGuard>
                                <ManageTask />
                            </AuthGuard>
                        } />
                        <Route path="pricing" element={
                            <AuthGuard>
                                <Pricing />
                            </AuthGuard>
                        } />
                        <Route path="blog" element={
                            <AuthGuard>
                                <Blog />
                            </AuthGuard>
                        } />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/en/authentication" />} />
            </Routes>
        </>
    )
}

export default AppRoutes;