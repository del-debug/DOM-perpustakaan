# DOM-perpustakaan
**1. `querySelector` dan `querySelectorAll**`

* **Pengertian & Cara Kerja:** Ini adalah metode untuk mencari elemen DOM menggunakan selektor CSS yang sama dengan yang Anda tulis di file `style.css`. `querySelector` akan mengambil elemen pertama yang cocok, sedangkan `querySelectorAll` mengambil semua elemen yang cocok dalam bentuk `NodeList`.
* **Contoh Implementasi:**
* Pada fungsi `tampilkanDetailBuku`, `document.querySelector('.kartu-buku[data-id="${id}"]')` digunakan untuk mencari satu elemen kartu buku spesifik untuk memanipulasi kelasnya.


* Pada fungsi `setupEventDelegation`, `grid.querySelectorAll(".kartu-buku.dipilih")` mencari *semua* kartu yang sedang berstatus dipilih agar kelas "dipilih" tersebut bisa dihapus sebelum kartu baru disorot.





**2. `innerHTML`, `textContent`, `innerText**`

* **Pengertian & Cara Kerja:** Ketiganya memanipulasi isi konten dalam elemen. `innerHTML` membaca dan merender tag HTML secara harfiah, `textContent` mengambil seluruh teks mentah (termasuk yang disembunyikan CSS), sedangkan `innerText` hanya mengambil teks yang dirender dan terlihat oleh pengguna.
* **Contoh Implementasi:**
* Aplikasi perpustakaan dominan menggunakan `textContent` untuk alasan keamanan saat memasukkan data dinamis, seperti pada pembuatan badge dengan `span.textContent = teks;`.


* `innerHTML` digunakan dengan cara pintas pada `panel.innerHTML = "";` untuk mengosongkan keseluruhan isi panel detail secara instan sebelum elemen detail buku yang baru dirender ke dalamnya.





**3. Manipulasi Atribut dan Style**

* **Pengertian & Cara Kerja:** DOM memungkinkan perubahan properti HTML (atribut seperti `id`, `class`, `disabled`, custom `data-*`) dan manipulasi tampilan visual (*inline CSS*) secara langsung menggunakan JavaScript.
* **Contoh Implementasi Atribut:** Mengubah properti fungsional tombol dengan `btn.type = "button"`, menyimpan ID buku secara tersembunyi dengan `btn.dataset.id = dataId`, dan mematikan fungsi tombol jika buku habis menggunakan `tombolPinjam.disabled = true`.


* **Contoh Implementasi Style:** Mengubah warna teks rating buku menggunakan `elRating.style.color = "#d97706"` secara spesifik, serta menerapkan sekumpulan CSS sekaligus pada tombol pengembalian buku melalui `tombolKembalikan.style.cssText`.



**4. Membuat & Menghapus Elemen**

* **Pengertian & Cara Kerja:** Metode `document.createElement()` menciptakan elemen HTML baru di memori. Elemen ini baru akan muncul di browser setelah dimasukkan ke dalam DOM menggunakan metode seperti `append()` atau `appendChild()`. Untuk menghapus, metode `removeChild()` atau `remove()` digunakan.
* **Contoh Implementasi:**
* **Membuat:** Komponen UI dibangun dari nol di memori, contohnya `document.createElement("h3")` untuk judul kartu buku. Elemen-elemen ini kemudian digabungkan, seperti `kartuAtas.append(elJudul, tombolFavorit)`.


* **Menghapus:** Sebelum merender ulang tampilan, fungsi `renderGrid` menggunakan `while (grid.firstChild) grid.removeChild(grid.firstChild);` untuk membersihkan seluruh elemen anak dari kontainer utama.





**5. Event Listener: `click`, `input`, `submit**`

* **Pengertian & Cara Kerja:** Fungsi `addEventListener()` membuat elemen menjadi interaktif dengan merespons aksi pengguna. `click` merespons klik mouse, `input` merespons ketikan pada kolom teks, dan `submit` merespons pengiriman formulir.
* **Contoh Implementasi:** Proyek perpustakaan ini sangat mengandalkan event `click`. Terdapat event listener pada tombol "X Tutup" yang menjalankan fungsi untuk menyembunyikan panel (`panel.hidden = true`) ketika tombol tersebut diklik. *(Catatan: Event `input` dan `submit` tidak digunakan dalam struktur kode ini karena tidak ada form penambahan buku atau kolom pencarian).*



**6. Event Bubbling & `stopPropagation**`

* **Pengertian & Cara Kerja:** *Event Bubbling* adalah fenomena di mana interaksi (misalnya klik) pada elemen terdalam akan "menggelembung" dan memicu event pada elemen pembungkusnya ke atas. `event.stopPropagation()` dipanggil untuk menghentikan efek domino ini.
* **Contoh Implementasi:** Pada fungsi `setupEventDelegation`, aplikasi mendaftarkan satu event `click` pada induk `kontainer-buku` untuk memantau semua interaksi di dalamnya. Saat tombol "Pinjam" atau "Favorit" diklik, fungsi memanggil `event.stopPropagation()`. Ini mencegah klik tersebut diteruskan ke atas yang dapat memicu penutupan panel detail secara tidak sengaja oleh event global `document.addEventListener("click", ...)`.







