# InfernoKu

**Identitas Proyek**

* **Nama:** InfernoKu
* **Deskripsi singkat:** Aplikasi manajemen pekerjaan (Job Management) sederhana untuk membantu tim atau pemilik usaha mengelola daftar pekerjaan: menambah, melihat detail, mengedit, menghapus, menandai selesai, dan menghitung total fee dari pekerjaan yang sudah ditambahkan.
* **Penulis:** I Made Wisnu Pradnya Yoga (2301020010)
* **Tanggal:** 2025-10-26

---

## Ringkasan Fitur

InfernoKu menyediakan fitur-fitur inti berikut:

1. **CRUD Job**

   * **Create:** Menambahkan job baru dengan informasi seperti judul, klien, deskripsi, location, dan fee/payment.
   * **Read:** Melihat daftar job beserta ringkasan informasinya.
   * **Update:** Mengubah informasi job yang sudah ada.
   * **Delete:** Menghapus job jika tidak diperlukan.

2. **Menjumlahkan Fee (Total Finance)**

   * Aplikasi otomatis menghitung total fee dari seluruh job yang tersimpan.

3. **Detail Job**

   * Melihat halaman detail untuk setiap job yang menampilkan informasi lengkap (judul, klien, deskripsi, location, dan fee/payment).

4. **Menandai Job Selesai**

   * Mengubah status job menjadi "Selesai" ketika pekerjaan sudah dilaksanakan.

---

## Struktur Data (Model Job)

Contoh struktur `Job` yang disarankan (TypeScript / JSON):

```ts
interface Job {
  id: number;
  title: string;
  client: string;
  payment: number;
  description?: string;
  date?: string;
  completed?: boolean; 
  Location?: string;
}

