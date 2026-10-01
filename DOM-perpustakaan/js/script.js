//
// DATA
//
const KOLEKSI_BUKU = [
    { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Fiksi", stok: 3, rating: 4.8 },
    { id: 2, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Fiksi", stok: 0, rating: 4.9 },
    { id: 3, judul: "Sapiens", penulis: "Yuval Noah Harari", kategori: "Sains", stok: 2, rating: 4.7 },
    { id: 4, judul: "Atomic Habits", penulis: "James Clear", kategori: "Non-fiksi", stok: 5, rating: 4.6 },
    { id: 5, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", kategori: "Fiksi", stok: 1, rating: 4.5 },
    { id: 6, judul: "Deep Work", penulis: "Cal Newport", kategori: "Non-fiksi", stok: 0, rating: 4.4 },
    { id: 7, judul: "A Brief History of Time", penulis: "Stephen Hawking", kategori: "Sains", stok: 3, rating: 4.6},
    { id: 8, judul: "Pulang", penulis: "Tere Liye", kategori: "Fiksi", stok: 2, rating: 4.3}
];

let state = KOLEKSI_BUKU.map(b => ({ ...b, favorit: false }));

//
// FUNGSI BUAT ELEMEN (createElement-based)
//
function buatBadge(teks, kelas) {
    const span = document.createElement("span");
    span.className = `badge ${kelas}`;
    span.textContent = teks;
    return span;
}


function buatTombol(teks, kelas, dataId) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `tombol-aksi ${kelas}`;
    btn.dataset.id = dataId;
    btn.textContent = teks;
    return btn;
}

function buatKartuBuku(buku) {
    const { id, judul, penulis, kategori, stok, rating, favorit } = buku;
    const tersedia = stok > 0;
    
    // Elemen kartu utama
    const kartu = document.createElement("div");
    kartu.className = [
        "kartu-buku",
        tersedia ? "" : "habis",
        favorit ? "favorit" : ""
    ].filter(Boolean).join(" ");
    kartu.dataset.id = id;
    
    // Baris atas — judul + tombol favorit
    const kartuAtas = document.createElement("div");
    kartuAtas.className = "kartu-atas";
    
    const elJudul = document.createElement("h3");
    elJudul.className = "kartu-judul";
    elJudul.textContent = judul;
    
    const tombolFavorit = buatTombol(
        favorit ? "❤️" : "🤍",
        `tombol-favorit${favorit ? " aktif" : ""}`,
        id
    );
    tombolFavorit.title = favorit ? "Hapus dari favorit" : "Tambah ke favorit";
    
    kartuAtas.append(elJudul, tombolFavorit);
    
    // Penulis
    const elPenulis = document.createElement("p");
    elPenulis.className = "kartu-penulis";
    elPenulis.textContent = penulis;
    
    // Meta — badge kategori + stok
    const kartuMeta = document.createElement("div");
    kartuMeta.className = "kartu-meta"; 
    const badgeKategori = buatBadge(kategori, "badge-kategori");
    
    let badgeStok;
    if (stok === 0) {
        badgeStok = buatBadge("Habis", "badge-habis");
    } else if (stok === 1) {
        badgeStok = buatBadge("Stok Kritis: 1", "badge-kritis");
    } else {
        badgeStok = buatBadge(`${stok} tersisa`, "badge-tersedia");
    }
    
    const elRating = document.createElement("span");
    elRating.className = "badge";
    elRating.style.marginLeft = "auto";
    elRating.style.color = "#d97706";
    elRating.textContent = ` ${rating}`;
    
    kartuMeta.append(badgeKategori, badgeStok, elRating);
    
    // Tombol aksi
    const kartuAksi = document.createElement("div");
    kartuAksi.className = "kartu-aksi";
    
    const tombolPinjam = buatTombol("Pinjam", "tombol-pinjam", id);
    if (!tersedia) tombolPinjam.disabled = true;
    
    const tombolDetail = buatTombol("Detail", "tombol-detail", id);
    
    kartuAksi.append(tombolPinjam, tombolDetail);
    
    // Susun kartu
    kartu.append(kartuAtas, elPenulis, kartuMeta, kartuAksi);
    return kartu;
}

//
// FUNGSI RENDER
//
function renderGrid() {
    const grid = document.getElementById("kontainer-buku");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    
    const fragment = document.createDocumentFragment();
    state.forEach(buku => fragment.appendChild(buatKartuBuku(buku)));
    grid.appendChild(fragment);
}

function updateHeader() {
    const badgeTotal = document.getElementById("badge-total");
    const badgeFavorit = document.getElementById("badge-favorit");
    const totalFavorit = state.filter(b => b.favorit).length;
    
    badgeTotal.textContent = `${state.length} buku`;
    badgeFavorit.textContent = `${totalFavorit} ❤️`;
    badgeFavorit.hidden = totalFavorit === 0;
}

function tampilkanDetailBuku(id) {
    const buku = state.find(b => b.id === id);
    const panel = document.getElementById("panel-detail");
    if (!buku || !panel) return;
    
    // Update konten panel menggunakan textContent (aman)
    panel.innerHTML = ""; 
    
    const judul = document.createElement("h2");
    judul.textContent = buku.judul;
    
    const penulis = document.createElement("p");
    penulis.textContent = `Penulis: ${buku.penulis}`;
    
    const kategori = document.createElement("p");
    kategori.textContent = `Kategori: ${buku.kategori}`;
    
    const stok = document.createElement("p");
    stok.textContent = `Stok: ${buku.stok === 0 ? "Habis" : buku.stok + " eksemplar"}`;
    
    const rating = document.createElement("p");
    rating.textContent = `Rating:  ${buku.rating}`;

    // Container untuk tombol aksi di dalam panel detail
    const kontainerTombol = document.createElement("div");
    kontainerTombol.style.display = "flex";
    kontainerTombol.style.gap = "10px";
    kontainerTombol.style.marginTop = "12px";
    
    // ACTION TO DO: Fitur Kembalikan Buku (ditambahkan secara mandiri)
    if (buku.stok === 0) {
        const tombolKembalikan = document.createElement("button");
        tombolKembalikan.textContent = "Kembalikan Buku";
        tombolKembalikan.style.cssText = "padding:6px 14px; border:1.5px solid #2563eb; border-radius:8px; cursor:pointer; background:#eff6ff; color:#1d4ed8; font-weight:600;";
        
        tombolKembalikan.addEventListener("click", () => {
            // Update stok bertambah 1
            state = state.map(b => b.id === id ? { ...b, stok: b.stok + 1 } : b);
            renderGrid();
            updateHeader();
            // Render ulang panel untuk update UI stok dan hilangkan tombol jika stok > 0
            tampilkanDetailBuku(id); 
        });
        kontainerTombol.append(tombolKembalikan);
    }
    
    const tombolTutup = document.createElement("button");
    tombolTutup.textContent = "X Tutup";
    tombolTutup.style.cssText = "padding:6px 14px; border:1.5px solid #e2e8f0; border-radius:8px; cursor:pointer; background:white; color:#475569; font-weight:600;";
    
    tombolTutup.addEventListener("click", () => {
        panel.hidden = true;
        document.querySelector(`.kartu-buku[data-id="${id}"]`)?.classList.remove("dipilih");
    });
    
    kontainerTombol.append(tombolTutup);
    
    panel.append(judul, penulis, kategori, stok, rating, kontainerTombol);
    panel.hidden = false;
    
    // Scroll ke panel
    panel.scrollIntoView({behavior: "smooth", block: "nearest" });
}

//
// EVENT DELEGATION
//
function setupEventDelegation() {
    const grid = document.getElementById("kontainer-buku");
    
    grid.addEventListener("click", function(event) {
        // Tombol favorit
        const tombolFavorit = event.target.closest(".tombol-favorit");
        if (tombolFavorit) {
            event.stopPropagation();
            const id = Number(tombolFavorit.dataset.id);
            state = state.map(b => b.id === id ? { ...b, favorit: !b.favorit } : b);
            renderGrid();
            updateHeader();
            return;
        }
        
        // Tombol pinjam
        const tombolPinjam = event.target.closest(".tombol-pinjam");
        if (tombolPinjam && !tombolPinjam.disabled) {
            event.stopPropagation();
            const id = Number(tombolPinjam.dataset.id);
            state = state.map(b => (b.id === id && b.stok > 0) ? { ...b, stok: b.stok - 1} : b);
            renderGrid();
            updateHeader();
            
            // Jika detail panel sedang terbuka dan menampilkan buku yang sama, update detailnya
            const panel = document.getElementById("panel-detail");
            if (!panel.hidden) tampilkanDetailBuku(id);
            return;
        }
        
        // Tombol detail
        const tombolDetail = event.target.closest(".tombol-detail");
        if (tombolDetail) {
            event.stopPropagation();
            const id = Number(tombolDetail.dataset.id);
            
            // Hapus highlight dari kartu lain
            grid.querySelectorAll(".kartu-buku.dipilih").forEach(k => {
                k.classList.remove("dipilih");
            });
            
            // Highlight kartu yang dipilih
            tombolDetail.closest(".kartu-buku")?.classList.add("dipilih");
            tampilkanDetailBuku(id);
            return;
        }
    });

    // Tutup panel saat klik di luar
    document.addEventListener("click", function(event) {
        const panel = document.getElementById("panel-detail");
        if (!panel || panel.hidden) return;
        if (!grid.contains(event.target) && !panel.contains(event.target)) {
            panel.hidden = true;
            grid.querySelectorAll(".kartu-buku.dipilih").forEach(k => {
                k.classList.remove("dipilih");
            });
        }
    });
}

//
// INISIALISASI
//
function inisialisasi() {
    renderGrid();
    updateHeader();
    setupEventDelegation();
    console.log(`Perpus DOM siap - ${state.length} buku`);
}
inisialisasi();
