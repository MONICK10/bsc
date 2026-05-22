import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import AdminSidebar from '../components/AdminSidebar.jsx';

export default function AdminLayout() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
