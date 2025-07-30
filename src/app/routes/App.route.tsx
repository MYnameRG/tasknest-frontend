import { Navigate, Route, Routes } from "react-router";
import Authentication from "../pages/Authentication";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import ManageTask from "../pages/ManageTask";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="en" element={<App />}>
                    <Route path="authentication" element={<Authentication />} />
                    <Route path="main">
                        <Route index path="dashboard" element={<Dashboard />} />
                        <Route path="manage-task" element={<ManageTask />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="blog" element={<Blog />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/en/authentication" />} />
            </Routes>
        </>
    )
}

export default AppRoutes;