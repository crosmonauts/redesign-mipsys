import { ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, Database, Settings, Bell, LogOut } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  // FUNGSI LOGOUT (VERSI KONEK BACKEND)
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      // 1. Hapus token dari localStorage agar akses terputus
      localStorage.removeItem("token")

      // 2. (Opsional) Jika backend temanmu butuh hit API logout untuk hapus session:
      // api.post("/logout").catch(err => console.log("Logout log failed"))

      // 3. Lempar balik ke halaman login
      navigate("/login")
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      
      {/* Sidebar Kiri */}
      <aside className="hidden w-64 flex-col bg-slate-900 text-white md:flex">
        <div className="flex h-16 items-center px-6 border-b border-slate-800">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center mr-3 font-bold">
            M
          </div>
          <h1 className="text-xl font-bold tracking-tight">MIP SYSTEM</h1>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 space-y-1 p-4 text-sm font-medium">
          <Link 
            to="/" 
            className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
              isActive("/") 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link 
            to="/manajemen-data" 
            className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
              isActive("/manajemen-data") 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Database size={18} />
            Manajemen Data
          </Link>

          <Link 
            to="/pengaturan" 
            className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
              isActive("/pengaturan") 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings size={18} />
            Pengaturan
          </Link>
        </nav>

        {/* TOMBOL LOGOUT */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all active:scale-95"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 sticky top-0 z-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {isActive("/") ? "Ringkasan" : location.pathname.replace("/", "").replace("-", " ")}
          </h2>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">Nanda</p>
                <p className="text-xs text-slate-500 mt-1">Full Stack Developer</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                N
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  )
}