window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const kodeInput = document.getElementById("kode");
  const discountInfo = document.querySelector(".discount");
  const orderForm = document.getElementById("orderForm"); // Ambil form-nya

  // Fungsi buka/tutup modal
  window.openModal = () => modal.classList.add("active");
  window.closeModal = () => modal.classList.remove("active");

  // Cek status diskon saat halaman dimuat
  if (localStorage.getItem("sudahPesan")) {
    kodeInput.value = "UNIK22! (hangus)";
    kodeInput.disabled = true;
    discountInfo.innerHTML = `
      Diskon <b>20%</b><br>
      Kode: <b>UNIK22!</b> (pembelian pertama saja)
    `;
  }

  // Handle Submit Form
  orderForm.addEventListener("submit", e => {
    e.preventDefault();

    // PERBAIKAN: Ambil value dari element berdasarkan ID di HTML
    const nama = document.getElementById("nama").value;
    const produk = document.getElementById("produk").value;
    const kategori = document.getElementById("kategori").value;
    const catatan = document.getElementById("catatan").value || "-";
    const kode = kodeInput.value;

    let diskon = "Tidak";

    // Logika diskon
    if (!localStorage.getItem("sudahPesan") && kode === "UNIK22!") {
      diskon = "Ya (20%)";
    } else if (localStorage.getItem("sudahPesan")) {
      diskon = "UNIK22! (hangus)";
    }

    // Format Pesan WhatsApp
    const pesan = 
`Halo, saya mau pesan:
Nama: ${nama}
Produk: ${produk}
Kategori: ${kategori}
Catatan: ${catatan}
Diskon: ${diskon}

*Transaksi manual setelah pemesanan*`;

// TAMBAHKAN BARIS INI UNTUK CEK:
    console.log("--- ISI PESAN WA ---");
    console.log(pesan);
    console.log("--------------------");

    const noWA = "628881531950";
    const url = "https://wa.me/" + noWA + "?text=" + encodeURIComponent(pesan);

    // Buka WhatsApp di tab baru
    window.open(url, "_blank");

    // Tandai sudah memesan setelah 1.5 detik
    setTimeout(() => {
      localStorage.setItem("sudahPesan", "true");
      // Opsional: Langsung ubah tampilan input setelah klik
      kodeInput.value = "UNIK22! (hangus)";
      kodeInput.disabled = true;
    }, 1500);
  });
});


const kids = document.querySelector('.kids');
let scrollAmount = 0;
let isPaused = false;

function step() {
  if (!isPaused) {
    scrollAmount += 0.8; // Angka ini kontrol kecepatan, 0.8 biasanya mulus banget
    kids.scrollLeft = scrollAmount;

    // Kalau sudah sampai ujung, balik ke 0
    if (kids.scrollLeft >= (kids.scrollWidth - kids.clientWidth)) {
      scrollAmount = 0;
    }
  }
  requestAnimationFrame(step); // Ini rahasia biar mulus 60fps
}

// Jalankan animasi
requestAnimationFrame(step);

// Opsional: Berhenti kalau disentuh/hover
kids.addEventListener('touchstart', () => isPaused = true);
kids.addEventListener('touchend', () => {
  scrollAmount = kids.scrollLeft; // Update posisi terakhir agar tidak loncat
  isPaused = false;
});
