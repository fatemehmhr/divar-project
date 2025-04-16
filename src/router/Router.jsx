import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "src/pages/HomePage";
import AdminPage from "src/pages/AdminPage";
import AuthPage from "src/pages/AuthPage";
import DashboardPage from "src/pages/DashboardPage";
import PageNotFound from "src/pages/404";
import Loader from "components/modules/Loader";
import { getProfile } from "services/user";



function Router() {

    const { data, isLoading } = useQuery(["profile"], getProfile);
    // console.log({ data, isLoading, error })

    if (isLoading) return <Loader />

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Router