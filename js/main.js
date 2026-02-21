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

  setInterval(() => {
    scrollAmount += 1;
    kids.scrollLeft = scrollAmount;

    if (kids.scrollLeft + kids.clientWidth >= kids.scrollWidth) {
      scrollAmount = 0;
    }
  }, 30);

  let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  // Hapus semua class active
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // Tambah class active ke index yang dituju
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Jalankan otomatis setiap 3 detik
setInterval(nextSlide, 3000);