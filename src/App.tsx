import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import DataManagement from "@/pages/DataManagement"
import Settings from "@/pages/Settings"
import Login from "@/pages/Login"

/**
 * Komponen ProtectedRoute
 * Berfungsi sebagai satpam: Mengecek apakah user punya token atau tidak.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token")
  
  // Jika tidak ada token, arahkan paksa ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Jika ada token, izinkan masuk ke halaman yang dituju
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. RUTE PUBLIK: Halaman Login (Tanpa Sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* 2. RUTE INTERNAL: Dibungkus ProtectedRoute & DashboardLayout
          Menggunakan wildcard "/*" agar semua sub-route di dalamnya 
          secara otomatis terproteksi.
        */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  {/* Halaman utama dashboard */}
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Halaman manajemen data aset */}
                  <Route path="/manajemen-data" element={<DataManagement />} />
                  
                  {/* Halaman pengaturan profil & sistem */}
                  <Route path="/pengaturan" element={<Settings />} />

                  {/* Catch-all: Jika user mengetik alamat asal-asalan, 
                      lempar balik ke dashboard utama */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}