import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

// Data awal (Mock Data)
const initialData = [
  { id: "MIP-001", nama: "Router Core A", kategori: "Network", status: "Aktif" },
  { id: "MIP-002", nama: "Server Database", kategori: "Hardware", status: "Maintenance" },
  { id: "MIP-003", nama: "Switch Layer 3", kategori: "Network", status: "Aktif" },
  { id: "MIP-004", nama: "MacBook Pro M2", kategori: "Workstation", status: "Aktif" },
]

export default function DataManagement() {
  // State Utama
  const [data, setData] = useState(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  
  // State untuk Form Tambah
  const [newItem, setNewItem] = useState({ 
    nama: "", 
    kategori: "" 
  })

  // Fungsi Tambah Data
  const handleAddData = () => {
    if (!newItem.nama || !newItem.kategori) return
    
    const newEntry = {
      id: `MIP-00${data.length + 1}`,
      nama: newItem.nama,
      kategori: newItem.kategori,
      status: "Aktif"
    }

    setData([...data, newEntry])
    setNewItem({ nama: "", kategori: "" })
    setIsOpen(false)
  }

  // Fungsi Hapus Data
  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aset ini?")) {
      setData(data.filter((item) => item.id !== id))
    }
  }

  // Logika Filter Pencarian
  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">Manajemen Aset MIP</h3>
          <p className="text-sm text-slate-500">Kelola dan monitor aset teknisi PT Mitrainfoparama secara real-time.</p>
        </div>

        {/* MODAL TAMBAH DATA */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700 shadow-md">
              <Plus size={18} /> Tambah Aset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Aset Baru</DialogTitle>
              <DialogDescription>
                Lengkapi detail di bawah ini untuk menambahkan aset ke sistem.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Aset</Label>
                <Input 
                  id="name" 
                  placeholder="Misal: Router Cisco X-200" 
                  value={newItem.nama}
                  onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Input 
                  id="category" 
                  placeholder="Misal: Network" 
                  value={newItem.kategori}
                  onChange={(e) => setNewItem({ ...newItem, kategori: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button onClick={handleAddData} className="bg-blue-600 hover:bg-blue-700">
                Simpan Aset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2. AREA FILTER / SEARCH */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Cari nama, ID, atau kategori..."
          className="pl-10 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 3. TABEL DATA */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-28 font-bold text-slate-600">ID ASET</TableHead>
              <TableHead className="font-bold text-slate-600">NAMA ASET</TableHead>
              <TableHead className="font-bold text-slate-600">KATEGORI</TableHead>
              <TableHead className="font-bold text-slate-600">STATUS</TableHead>
              {/* Dikunci lebarnya (w-32) dan diposisikan tengah */}
              <TableHead className="text-center font-bold text-slate-600 w-32">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-slate-400 uppercase">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">
                    {item.nama}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {item.kategori}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      item.status === "Aktif" 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-400 italic">
                  Data tidak ditemukan...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 uppercase tracking-widest font-semibold">
        <p>Menampilkan {filteredData.length} Aset</p>
        <p>T-RECS • MIP REDESIGN 2026</p>
      </div>
    </div>
  )
}