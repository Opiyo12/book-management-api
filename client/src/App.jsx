import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import ForgotPassword from "./features/auth/ForgotPassword";
import Unauthorized from "./features/auth/Unauthorized";

import AdminLayout from "./features/dashboard/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";

// pages
import Overview from "./features/dashboard/admin/pages/Overview";
import Roles from "./features/dashboard/admin/pages/Roles";
import Logs from "./features/dashboard/admin/pages/Logs";
import Settings from "./features/dashboard/admin/pages/Settings";
import AddUsers from "./features/dashboard/admin/pages/AddUsers";
import UserRoles from "./features/dashboard/admin/pages/UserRoles";
import AllUser from "./features/dashboard/admin/pages/AllUser";



function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes admin */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="users" element={<AllUser />} />
        <Route path="roles" element={<Roles />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users/all" element={<AllUser />} />
        <Route path="users/add" element={<AddUsers />} />
        <Route path="users/roles" element={<UserRoles />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" replace />} />
     
    </Routes>
  );
}

export default App;