import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/lib/axios"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ShieldCheck, LogIn, Loader2, AlertCircle, User } from "lucide-react" // Tambah ikon User

export default function Login() {
  // 1. Ganti state email menjadi username
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 2. Sesuaikan request body dengan key "username"
      const response = await api.post("/auth/login", {
        username: username, // Mengirim username ke backend
        password: password
      })

      // Simpan token (pastikan path response.data.token sesuai dengan backend temanmu)
      const token = response.data.token 
      
      if (token) {
        localStorage.setItem("token", token)
        navigate("/")
      } else {
        setError("Token tidak ditemukan dalam respons server.")
      }

    } catch (err: any) {
      const message = err.response?.data?.message || "Username atau password salah!"
      setError(message)
      console.error("Login Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-slate-200/50 blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200 z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white" size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">T-RECS LOGIN</CardTitle>
          <CardDescription>
            Masukkan username dan password MIP Anda.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm animate-in fade-in zoom-in duration-200">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              {/* 3. Ganti Label & Input menjadi Username */}
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="username" 
                  type="text" // Type text karena bukan email
                  placeholder="Masukkan username Anda..." 
                  required 
                  className="pl-10 bg-slate-50/50 focus:bg-white transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                required 
                className="bg-slate-50/50 focus:bg-white transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base font-semibold transition-all active:scale-95"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk Sekarang <LogIn className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              PT Mitrainfoparama • 2026
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}