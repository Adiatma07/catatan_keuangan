# 💰 Catatan Keuangan

Aplikasi pencatat keuangan pribadi berbasis web. Catat pemasukan dan pengeluaran harian, pantau saldo per akun (Cash & Bank), dan lihat laporan bulanan — semua langsung dari browser, tanpa perlu install apa-apa.

## ✨ Fitur

- **Beranda** — input transaksi baru (tipe, kategori, jumlah, akun, tanggal)
- **Kategori dinamis** — pilihan kategori otomatis menyesuaikan tipe transaksi:
  - Pengeluaran: Makan/Minum, Transportasi, Hiburan, Belanja, Tagihan, Kesehatan
  - Pemasukan: Gaji, Bonus, Investasi, Hadiah, Lainnya
- **History** — daftar lengkap semua transaksi yang pernah diinput, bisa dihapus per item
- **Laporan Bulanan** — total pemasukan & pengeluaran, bisa difilter per bulan
- **Saldo per Akun** — rincian saldo Cash, Bank, dan total gabungan keduanya
- **Pengaturan** — hapus semua data (dengan konfirmasi)
- Format angka otomatis pakai pemisah ribuan (contoh: `2.000.000`)
- Data tersimpan di **localStorage** browser — tetap ada meski browser ditutup/refresh

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla, tanpa framework)

## 🚀 Cara Menjalankan

1. Clone repo ini:
   ```bash
   git clone https://github.com/Adiatma07/catatan_keuangan.git
   ```
2. Buka folder project di code editor (misal VS Code)
3. Buka file `index.html` menggunakan extension **Live Server**, atau buka langsung file `index.html` di browser

## 📂 Struktur File

```
├── index.html   # Struktur halaman & navigasi tab
├── style.css    # Tampilan/desain
└── script.js    # Logic aplikasi (input, hitung total, laporan, dll)
```

## 📌 Rencana Pengembangan

- [ ] Edit transaksi (saat ini hanya bisa tambah & hapus)
- [ ] Grafik visualisasi pengeluaran per kategori
- [ ] Filter/pencarian di tab History
- [ ] Set budget/target bulanan per kategori
- [ ] Export data ke CSV

## 📄 Lisensi

Proyek ini dibuat untuk keperluan belajar pribadi.