function formatRupiah(angka) {
  return angka.toLocaleString('id-ID');
}

// ================= DATA =================
let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];

// ================= ELEMEN =================
const form = document.getElementById('form-transaksi');
const listTransaksi = document.getElementById('list-transaksi');
const totalEl = document.getElementById('total');
const tipeSelect = document.getElementById('tipe');
const kategoriSelect = document.getElementById('kategori');
const pilihBulan = document.getElementById('pilih-bulan');
const jumlahInput = document.getElementById('jumlah');

// ================= FORMAT INPUT JUMLAH =================
jumlahInput.addEventListener('input', function () {
  let angka = jumlahInput.value.replace(/\D/g, '');
  if (angka === '') {
    jumlahInput.value = '';
    return;
  }
  jumlahInput.value = formatRupiah(parseInt(angka));
});

// ================= KATEGORI DINAMIS =================
const kategoriMap = {
  pengeluaran: ["Makan/Minum", "Transportasi", "Hiburan", "Belanja", "Tagihan", "Kesehatan"],
  pemasukan: ["Gaji", "Bonus", "Investasi", "Hadiah", "Lainnya"]
};

function updateKategori() {
  const tipeTerpilih = tipeSelect.value;
  const daftarKategori = kategoriMap[tipeTerpilih];

  kategoriSelect.innerHTML = '';
  daftarKategori.forEach(function (kategori) {
    const option = document.createElement('option');
    option.value = kategori;
    option.textContent = kategori;
    kategoriSelect.appendChild(option);
  });
}

tipeSelect.addEventListener('change', updateKategori);

// ================= NAVIGASI TAB =================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabButtons.forEach(b => b.classList.remove('aktif'));
    tabContents.forEach(c => c.classList.remove('aktif'));

    btn.classList.add('aktif');
    const targetId = btn.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('aktif');
  });
});

// ================= TAMBAH TRANSAKSI =================
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = kategoriSelect.value;
  const jumlah = parseInt(jumlahInput.value.replace(/\D/g, ''));
  const tipe = tipeSelect.value;
  const akun = document.getElementById('akun').value;
  const tanggal = document.getElementById('tanggal').value;

  const transaksiBaru = { nama, jumlah, tipe, akun, tanggal };

  transaksi.push(transaksiBaru);
  localStorage.setItem('transaksi', JSON.stringify(transaksi));

  form.reset();
  document.getElementById('tanggal').valueAsDate = new Date();
  updateKategori();
  tampilkan();
});

// ================= TAMPILKAN LIST & TOTAL =================
function tampilkan() {
  listTransaksi.innerHTML = '';
  let total = 0;

  transaksi.forEach(function (item, index) {
    const li = document.createElement('li');
    const tanda = item.tipe === 'pemasukan' ? '+' : '-';
    li.textContent = `${item.tanggal} • ${item.nama} (${item.akun}): ${tanda} Rp ${formatRupiah(item.jumlah)}`;

    const btnHapus = document.createElement('button');
    btnHapus.textContent = 'Hapus';
    btnHapus.onclick = function () {
      transaksi.splice(index, 1);
      localStorage.setItem('transaksi', JSON.stringify(transaksi));
      tampilkan();
    };

    li.appendChild(btnHapus);
    listTransaksi.appendChild(li);

    total += item.tipe === 'pemasukan' ? item.jumlah : -item.jumlah;
  });

  totalEl.textContent = formatRupiah(total);
  hitungLaporan();
  hitungSaldoAkun();
}

// ================= LAPORAN BULANAN =================
function hitungLaporan() {
  const bulanTerpilih = pilihBulan.value;
  if (!bulanTerpilih) return;

  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  transaksi.forEach(function (item) {
    const bulanItem = item.tanggal ? item.tanggal.slice(0, 7) : '';

    if (bulanItem === bulanTerpilih) {
      if (item.tipe === 'pemasukan') {
        totalPemasukan += item.jumlah;
      } else {
        totalPengeluaran += item.jumlah;
      }
    }
  });

  document.getElementById('total-pemasukan').textContent = 'Rp ' + formatRupiah(totalPemasukan);
  document.getElementById('total-pengeluaran').textContent = 'Rp ' + formatRupiah(totalPengeluaran);
}

function hitungSaldoAkun() {
  let saldoCash = 0;
  let saldoBank = 0;

  transaksi.forEach(function (item) {
    const nilai = item.tipe === 'pemasukan' ? item.jumlah : -item.jumlah;

    if (item.akun === 'cash') {
      saldoCash += nilai;
    } else if (item.akun === 'bank') {
      saldoBank += nilai;
    }
  });

  const saldoTotal = saldoCash + saldoBank;

  document.getElementById('saldo-cash').textContent = 'Rp ' + formatRupiah(saldoCash);
  document.getElementById('saldo-bank').textContent = 'Rp ' + formatRupiah(saldoBank);
  document.getElementById('saldo-total').textContent = 'Rp ' + formatRupiah(saldoTotal);
}

pilihBulan.addEventListener('change', hitungLaporan);

// ================= HAPUS SEMUA DATA =================
document.getElementById('btn-hapus-semua').addEventListener('click', function () {
  const konfirmasi = confirm('Yakin mau hapus SEMUA data transaksi? Ini gak bisa dibalikin lagi.');

  if (konfirmasi) {
    transaksi = [];
    localStorage.removeItem('transaksi');
    tampilkan();
    alert('Semua data berhasil dihapus.');
  }
});

// ================= INISIALISASI =================
document.getElementById('tanggal').valueAsDate = new Date();

const sekarang = new Date();
pilihBulan.value = sekarang.toISOString().slice(0, 7);

updateKategori();
tampilkan();