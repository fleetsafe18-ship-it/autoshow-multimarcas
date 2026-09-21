import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './admin/AuthContext.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import PublicLayout from './pages/PublicLayout.jsx';
import Home from './pages/Home.jsx';
import VehicleDetail from './pages/VehicleDetail.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import VehicleForm from './pages/admin/VehicleForm.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/veiculo/:id" element={<VehicleDetail />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="veiculos/novo" element={<VehicleForm />} />
          <Route path="veiculos/:id" element={<VehicleForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
