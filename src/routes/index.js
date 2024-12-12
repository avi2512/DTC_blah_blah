import { Routes, Route, Navigate } from 'react-router-dom';
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../components/Admin/AdminDashboard';
import SchedulerDashboard from '../components/Scheduler/SchedulerDashboard';
import { UserRolesEnum } from '../constants';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={[UserRolesEnum.CHIEF, UserRolesEnum.MANAGER]}>
                    <AuthenticatedLayout>
                        <AdminDashboard />
                    </AuthenticatedLayout>
                </ProtectedRoute>
            } />

            {/* Protected Scheduler Routes */}
            <Route path="/scheduler/*" element={
                <ProtectedRoute allowedRoles={[UserRolesEnum.SCHEDULER]}>
                    <AuthenticatedLayout>
                        <SchedulerDashboard />
                    </AuthenticatedLayout>
                </ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes; 