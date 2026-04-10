import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Package, 
  CheckCircle2, 
  Wrench, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";

// Data Dummy untuk Statistik
const statData = [
  { label: "Total Aset", value: "1,284", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Aset Aktif", value: "1,102", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Maintenance", value: "156", icon: Wrench, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Rusak/Off", value: "26", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
];

// Data Dummy untuk Grafik Tren (7 Hari Terakhir)
const chartData = [
  { name: 'Sen', perbaikan: 40, pengadaan: 24 },
  { name: 'Sel', perbaikan: 30, pengadaan: 13 },
  { name: 'Rab', perbaikan: 20, pengadaan: 98 },
  { name: 'Kam', perbaikan: 27, pengadaan: 39 },
  { name: 'Jum', perbaikan: 18, pengadaan: 48 },
  { name: 'Sab', perbaikan: 23, pengadaan: 38 },
  { name: 'Min', perbaikan: 34, pengadaan: 43 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* 1. WELCOME HEADER */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-800">Ringkasan Sistem</h3>
        <p className="text-sm text-slate-500">Selamat datang kembali, Mas Nanda. Berikut adalah ikhtisar performa T-RECS hari ini.</p>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statData.map((stat, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h4>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+12% dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CHARTS AREA */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Grafik Bar: Distribusi Perbaikan */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h4 className="font-bold text-slate-800">Tren Perbaikan Aset</h4>
            <p className="text-xs text-slate-500">Jumlah permintaan repair harian</p>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="perbaikan" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Area: Pengadaan Aset */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h4 className="font-bold text-slate-800">Pengadaan Hardware</h4>
            <p className="text-xs text-slate-500">Statistik penambahan unit baru</p>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="pengadaan" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY (FOOTER) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-4">Aktivitas Terakhir</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                  ID
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Perbaikan Router Core #MIP-992</p>
                  <p className="text-xs text-slate-500">Oleh Teknisi: Ahmad S. • 2 jam yang lalu</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">PROSES</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}