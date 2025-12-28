# Panduan Mengganti Password Admin Panel

## Website RA & MI Zaid Bin Tsabit

---

## Lokasi File Password

Password admin disimpan di file:

```
admin/index.php
```

Jika di komputer lokal:
```
C:\Users\andi\Desktop\zaid_bin_tsabit\dist\admin\index.php
```

Jika sudah di hosting:
```
public_html/admin/index.php
```

---

## Cara Mengganti Password

### Langkah 1: Buka File

Buka file `admin/index.php` menggunakan:
- Notepad
- VS Code
- File Manager hosting (cPanel)

### Langkah 2: Cari Baris Password

Cari baris berikut di bagian awal file (sekitar baris 10-15):

```php
$password = 'admin123';
```

### Langkah 3: Ganti Password

Ubah `admin123` menjadi password baru Anda:

```php
$password = 'password_baru_anda';
```

Contoh:
```php
$password = 'SekolahZBT2025!';
```

### Langkah 4: Simpan File

- Tekan Ctrl + S (jika di komputer)
- Klik tombol Save (jika di cPanel)

### Langkah 5: Selesai!

Login ke admin panel dengan password baru.

---

## Jika Lupa Password

Karena password tersimpan di file (bukan database), Anda hanya perlu:

1. Buka file `admin/index.php`
2. Lihat nilai pada baris `$password = '...';`
3. Itulah password Anda saat ini

Atau langsung ganti dengan password baru.

---

## Tips Keamanan Password

| Tips | Penjelasan |
|------|------------|
| Minimal 8 karakter | Lebih panjang = lebih aman |
| Kombinasi huruf + angka | Contoh: Sekolah2025 |
| Tambahkan simbol | Contoh: Sekolah@2025! |
| Jangan pakai tanggal lahir | Mudah ditebak |
| Jangan share ke orang lain | Hanya untuk admin |

---

## Contoh Password yang Aman

- `AdminZBT_2025!`
- `RAMIpanjatan#123`
- `Sekolah@KulonProgo`

---

## Kontak Bantuan

Jika mengalami kesulitan, hubungi developer atau admin IT sekolah.

---

*Dokumen ini adalah bagian dari Website RA & MI Zaid Bin Tsabit*
