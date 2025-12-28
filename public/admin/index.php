<?php
session_start();

// KONFIGURASI
$password_admin = "admin123";
$file_berita = '../data/berita.json';
$file_content = '../data/content.json';

// LOGIN / LOGOUT
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

if (isset($_POST['login'])) {
    if ($_POST['password'] === $password_admin) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = "Password salah!";
    }
}

if (!isset($_SESSION['admin_logged_in'])) {
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - Zaid Bin Tsabit</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-green-600 to-emerald-800 h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">ZB</div>
            <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p class="text-gray-500 text-sm">RA & MI Zaid Bin Tsabit</p>
        </div>
        <?php if (isset($error)) echo "<p class='text-red-500 text-center mb-4 bg-red-50 p-2 rounded'>$error</p>"; ?>
        <form method="POST" class="space-y-4">
            <div>
                <label class="block text-gray-700 mb-1 font-medium">Password</label>
                <input type="password" name="password" class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Masukkan password...">
            </div>
            <button type="submit" name="login" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Masuk</button>
        </form>
    </div>
</body>
</html>
<?php
    exit;
}

// LOAD DATA
$berita = json_decode(file_get_contents($file_berita), true) ?? [];
$content = json_decode(file_get_contents($file_content), true) ?? [];

// PROCESS BERITA
if (isset($_POST['add_news'])) {
    $new_item = [
        "id" => time(),
        "title" => $_POST['title'],
        "date" => $_POST['date'],
        "summary" => $_POST['summary'],
        "img" => $_POST['img']
    ];
    array_unshift($berita, $new_item);
    file_put_contents($file_berita, json_encode($berita, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=berita&msg=added");
    exit;
}

if (isset($_GET['delete_news'])) {
    $berita = array_values(array_filter($berita, fn($item) => $item['id'] != $_GET['delete_news']));
    file_put_contents($file_berita, json_encode($berita, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=berita&msg=deleted");
    exit;
}

// PROCESS HALAMAN (Hero + Profil)
if (isset($_POST['update_halaman'])) {
    $content['hero']['title_line_1'] = $_POST['hero_title_1'];
    $content['hero']['title_highlight'] = $_POST['hero_highlight'];
    $content['hero']['subtitle'] = $_POST['hero_subtitle'];
    $content['hero']['bg_image'] = $_POST['hero_bg'];
    $content['profil']['sejarah'] = $_POST['profil_sejarah'];
    $content['profil']['visi'] = $_POST['profil_visi'];
    $content['profil']['image'] = $_POST['profil_image'];
    $content['profil']['misi'] = array_filter(array_map('trim', explode("\n", $_POST['profil_misi'])));
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=halaman&msg=saved");
    exit;
}

// PROCESS AKADEMIK
if (isset($_POST['update_akademik'])) {
    $content['akademik']['page_description'] = $_POST['akademik_desc'];
    $content['akademik']['ra_title'] = $_POST['ra_title'];
    $content['akademik']['ra_description'] = $_POST['ra_desc'];
    $content['akademik']['ra_programs'] = array_filter(array_map('trim', explode("\n", $_POST['ra_programs'])));
    $content['akademik']['mi_title'] = $_POST['mi_title'];
    $content['akademik']['mi_description'] = $_POST['mi_desc'];
    $content['akademik']['mi_programs'] = array_filter(array_map('trim', explode("\n", $_POST['mi_programs'])));
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=akademik&msg=saved");
    exit;
}

// PROCESS FASILITAS
if (isset($_POST['add_fasilitas'])) {
    $content['fasilitas'][] = ["name" => $_POST['fas_name'], "img" => $_POST['fas_img']];
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=fasilitas&msg=added");
    exit;
}
if (isset($_GET['delete_fasilitas'])) {
    $idx = (int)$_GET['delete_fasilitas'];
    array_splice($content['fasilitas'], $idx, 1);
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=fasilitas&msg=deleted");
    exit;
}

// PROCESS PPDB
if (isset($_POST['update_ppdb'])) {
    $content['ppdb']['tahun_ajaran'] = $_POST['ppdb_tahun'];
    $content['ppdb']['phone'] = $_POST['ppdb_phone'];
    $content['ppdb']['jam_layanan'] = $_POST['ppdb_jam'];
    $content['ppdb']['whatsapp_number'] = $_POST['ppdb_wa'];
    $content['ppdb']['syarat'] = array_filter(array_map('trim', explode("\n", $_POST['ppdb_syarat'])));
    
    // Parse alur
    $alur_titles = array_filter(array_map('trim', explode("\n", $_POST['ppdb_alur_titles'])));
    $alur_descs = array_filter(array_map('trim', explode("\n", $_POST['ppdb_alur_descs'])));
    $content['ppdb']['alur'] = [];
    for ($i = 0; $i < count($alur_titles); $i++) {
        $content['ppdb']['alur'][] = [
            "title" => $alur_titles[$i],
            "desc" => isset($alur_descs[$i]) ? $alur_descs[$i] : ""
        ];
    }
    
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=ppdb&msg=saved");
    exit;
}

// PROCESS FOOTER
if (isset($_POST['update_footer'])) {
    $content['footer']['tagline'] = $_POST['footer_tagline'];
    $content['footer']['alamat'] = $_POST['footer_alamat'];
    $content['footer']['phone'] = $_POST['footer_phone'];
    $content['footer']['email'] = $_POST['footer_email'];
    $content['footer']['facebook'] = $_POST['footer_fb'];
    $content['footer']['instagram'] = $_POST['footer_ig'];
    $content['footer']['youtube'] = $_POST['footer_yt'];
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=footer&msg=saved");
    exit;
}

// PROCESS GALLERY
if (isset($_POST['add_gallery'])) {
    $content['gallery'][] = ["img" => $_POST['gallery_img']];
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=gallery&msg=added");
    exit;
}
if (isset($_GET['delete_gallery'])) {
    $idx = (int)$_GET['delete_gallery'];
    array_splice($content['gallery'], $idx, 1);
    file_put_contents($file_content, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header("Location: index.php?tab=gallery&msg=deleted");
    exit;
}

$active_tab = $_GET['tab'] ?? 'berita';
$tabs = [
    'berita' => ['icon' => 'fa-newspaper', 'label' => 'Berita'],
    'halaman' => ['icon' => 'fa-home', 'label' => 'Beranda & Profil'],
    'akademik' => ['icon' => 'fa-graduation-cap', 'label' => 'Akademik'],
    'fasilitas' => ['icon' => 'fa-building', 'label' => 'Fasilitas'],
    'ppdb' => ['icon' => 'fa-user-plus', 'label' => 'PPDB'],
    'footer' => ['icon' => 'fa-globe', 'label' => 'Footer'],
    'gallery' => ['icon' => 'fa-images', 'label' => 'Gallery']
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin - Zaid Bin Tsabit</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <style>
        .sidebar-link.active { background: linear-gradient(90deg, #059669, #10b981); color: white; }
        .sidebar-link:hover:not(.active) { background: #f3f4f6; }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-xl min-h-screen fixed left-0 top-0">
            <div class="p-6 border-b">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">ZB</div>
                    <div>
                        <div class="font-bold text-gray-800">Admin Panel</div>
                        <div class="text-xs text-gray-500">Zaid Bin Tsabit</div>
                    </div>
                </div>
            </div>
            <nav class="p-4 space-y-1">
                <?php foreach ($tabs as $key => $tab): ?>
                <a href="?tab=<?= $key ?>" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium <?= $active_tab == $key ? 'active' : 'text-gray-600' ?>">
                    <i class="fas <?= $tab['icon'] ?> w-5"></i> <?= $tab['label'] ?>
                </a>
                <?php endforeach; ?>
            </nav>
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
                <a href="?logout" class="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 ml-64 p-8">
            <?php if (isset($_GET['msg'])): ?>
            <div class="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Perubahan berhasil disimpan!
            </div>
            <?php endif; ?>

            <!-- TAB: BERITA -->
            <?php if ($active_tab == 'berita'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-newspaper mr-2 text-green-600"></i>Kelola Berita & Kegiatan</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 class="font-bold text-lg mb-4">Tambah Berita Baru</h2>
                    <form method="POST" class="space-y-4">
                        <input type="text" name="title" placeholder="Judul Berita" required class="w-full border p-2 rounded-lg">
                        <input type="text" name="date" placeholder="Tanggal (cth: 12 Januari 2025)" required class="w-full border p-2 rounded-lg">
                        <input type="url" name="img" placeholder="Link Gambar (URL)" required class="w-full border p-2 rounded-lg">
                        <textarea name="summary" placeholder="Ringkasan berita..." rows="3" required class="w-full border p-2 rounded-lg"></textarea>
                        <button type="submit" name="add_news" class="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700">Publikasikan</button>
                    </form>
                </div>
                <div class="lg:col-span-2 space-y-4">
                    <h2 class="font-bold text-lg">Daftar Berita (<?= count($berita) ?>)</h2>
                    <?php if (empty($berita)): ?>
                    <div class="bg-gray-50 p-8 rounded-xl text-center text-gray-500">Belum ada berita.</div>
                    <?php else: foreach ($berita as $item): ?>
                    <div class="bg-white p-4 rounded-xl shadow-sm border flex gap-4">
                        <img src="<?= $item['img'] ?>" class="w-24 h-24 object-cover rounded-lg">
                        <div class="flex-grow">
                            <div class="font-bold text-gray-800"><?= $item['title'] ?></div>
                            <div class="text-xs text-green-600 font-medium mb-1"><?= $item['date'] ?></div>
                            <div class="text-sm text-gray-600 line-clamp-2"><?= $item['summary'] ?></div>
                        </div>
                        <a href="?delete_news=<?= $item['id'] ?>&tab=berita" onclick="return confirm('Hapus berita ini?')" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></a>
                    </div>
                    <?php endforeach; endif; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- TAB: HALAMAN (Hero + Profil) -->
            <?php if ($active_tab == 'halaman'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-home mr-2 text-blue-600"></i>Edit Beranda & Profil</h1>
            <form method="POST" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 class="font-bold text-lg mb-4 text-blue-600"><i class="fas fa-star mr-2"></i>Hero Section (Beranda)</h2>
                    <div class="space-y-4">
                        <div><label class="block text-sm font-medium mb-1">Judul Baris 1</label><input type="text" name="hero_title_1" value="<?= $content['hero']['title_line_1'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                        <div><label class="block text-sm font-medium mb-1">Judul Highlight (Warna)</label><input type="text" name="hero_highlight" value="<?= $content['hero']['title_highlight'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                        <div><label class="block text-sm font-medium mb-1">Sub Judul</label><textarea name="hero_subtitle" rows="2" class="w-full border p-2 rounded-lg"><?= $content['hero']['subtitle'] ?? '' ?></textarea></div>
                        <div><label class="block text-sm font-medium mb-1">Background Image URL</label><input type="text" name="hero_bg" value="<?= $content['hero']['bg_image'] ?? '' ?>" class="w-full border p-2 rounded-lg text-sm"></div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 class="font-bold text-lg mb-4 text-purple-600"><i class="fas fa-school mr-2"></i>Halaman Profil</h2>
                    <div class="space-y-4">
                        <div><label class="block text-sm font-medium mb-1">Foto Profil (URL)</label><input type="text" name="profil_image" value="<?= $content['profil']['image'] ?? '' ?>" class="w-full border p-2 rounded-lg text-sm"></div>
                        <div><label class="block text-sm font-medium mb-1">Sejarah Singkat</label><textarea name="profil_sejarah" rows="4" class="w-full border p-2 rounded-lg"><?= $content['profil']['sejarah'] ?? '' ?></textarea></div>
                        <div><label class="block text-sm font-medium mb-1">Visi</label><textarea name="profil_visi" rows="2" class="w-full border p-2 rounded-lg"><?= $content['profil']['visi'] ?? '' ?></textarea></div>
                        <div><label class="block text-sm font-medium mb-1">Misi (1 baris = 1 poin)</label><textarea name="profil_misi" rows="4" class="w-full border p-2 rounded-lg"><?= implode("\n", $content['profil']['misi'] ?? []) ?></textarea></div>
                    </div>
                </div>
                <div class="lg:col-span-2"><button type="submit" name="update_halaman" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700"><i class="fas fa-save mr-2"></i>Simpan Perubahan</button></div>
            </form>
            <?php endif; ?>

            <!-- TAB: AKADEMIK -->
            <?php if ($active_tab == 'akademik'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-graduation-cap mr-2 text-green-600"></i>Edit Halaman Akademik</h1>
            <form method="POST" class="space-y-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <label class="block text-sm font-medium mb-1">Deskripsi Halaman</label>
                    <textarea name="akademik_desc" rows="2" class="w-full border p-2 rounded-lg"><?= $content['akademik']['page_description'] ?? '' ?></textarea>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-green-50 p-6 rounded-xl border border-green-200">
                        <h2 class="font-bold text-lg mb-4 text-green-700"><i class="fas fa-child mr-2"></i>Raudhatul Athfal (RA)</h2>
                        <div class="space-y-4">
                            <div><label class="block text-sm font-medium mb-1">Judul</label><input type="text" name="ra_title" value="<?= $content['akademik']['ra_title'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                            <div><label class="block text-sm font-medium mb-1">Deskripsi</label><textarea name="ra_desc" rows="3" class="w-full border p-2 rounded-lg"><?= $content['akademik']['ra_description'] ?? '' ?></textarea></div>
                            <div><label class="block text-sm font-medium mb-1">Program (1 baris = 1 poin)</label><textarea name="ra_programs" rows="4" class="w-full border p-2 rounded-lg"><?= implode("\n", $content['akademik']['ra_programs'] ?? []) ?></textarea></div>
                        </div>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h2 class="font-bold text-lg mb-4 text-blue-700"><i class="fas fa-book mr-2"></i>Madrasah Ibtidaiyah (MI)</h2>
                        <div class="space-y-4">
                            <div><label class="block text-sm font-medium mb-1">Judul</label><input type="text" name="mi_title" value="<?= $content['akademik']['mi_title'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                            <div><label class="block text-sm font-medium mb-1">Deskripsi</label><textarea name="mi_desc" rows="3" class="w-full border p-2 rounded-lg"><?= $content['akademik']['mi_description'] ?? '' ?></textarea></div>
                            <div><label class="block text-sm font-medium mb-1">Program (1 baris = 1 poin)</label><textarea name="mi_programs" rows="4" class="w-full border p-2 rounded-lg"><?= implode("\n", $content['akademik']['mi_programs'] ?? []) ?></textarea></div>
                        </div>
                    </div>
                </div>
                <button type="submit" name="update_akademik" class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700"><i class="fas fa-save mr-2"></i>Simpan Perubahan</button>
            </form>
            <?php endif; ?>

            <!-- TAB: FASILITAS -->
            <?php if ($active_tab == 'fasilitas'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-building mr-2 text-orange-600"></i>Kelola Fasilitas</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 class="font-bold text-lg mb-4">Tambah Fasilitas</h2>
                    <form method="POST" class="space-y-4">
                        <input type="text" name="fas_name" placeholder="Nama Fasilitas" required class="w-full border p-2 rounded-lg">
                        <input type="url" name="fas_img" placeholder="Link Gambar (URL)" required class="w-full border p-2 rounded-lg">
                        <button type="submit" name="add_fasilitas" class="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700">Tambah</button>
                    </form>
                </div>
                <div class="lg:col-span-2">
                    <h2 class="font-bold text-lg mb-4">Daftar Fasilitas (<?= count($content['fasilitas'] ?? []) ?>)</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <?php foreach (($content['fasilitas'] ?? []) as $idx => $fas): ?>
                        <div class="relative group">
                            <img src="<?= $fas['img'] ?>" class="w-full h-32 object-cover rounded-lg">
                            <div class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <a href="?delete_fasilitas=<?= $idx ?>&tab=fasilitas" onclick="return confirm('Hapus fasilitas ini?')" class="bg-red-500 text-white px-3 py-1 rounded text-sm"><i class="fas fa-trash"></i></a>
                            </div>
                            <div class="text-center text-sm font-medium mt-2"><?= $fas['name'] ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <?php endif; ?>

            <!-- TAB: PPDB -->
            <?php if ($active_tab == 'ppdb'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-user-plus mr-2 text-green-600"></i>Edit Halaman PPDB</h1>
            <form method="POST" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                    <h2 class="font-bold text-lg text-green-600">Informasi Umum</h2>
                    <div><label class="block text-sm font-medium mb-1">Tahun Ajaran</label><input type="text" name="ppdb_tahun" value="<?= $content['ppdb']['tahun_ajaran'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                    <div><label class="block text-sm font-medium mb-1">Nomor Telepon</label><input type="text" name="ppdb_phone" value="<?= $content['ppdb']['phone'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                    <div><label class="block text-sm font-medium mb-1">Jam Layanan</label><input type="text" name="ppdb_jam" value="<?= $content['ppdb']['jam_layanan'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                    <div><label class="block text-sm font-medium mb-1">Nomor WhatsApp (tanpa +)</label><input type="text" name="ppdb_wa" value="<?= $content['ppdb']['whatsapp_number'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                    <div><label class="block text-sm font-medium mb-1">Syarat Pendaftaran (1 baris = 1 poin)</label><textarea name="ppdb_syarat" rows="6" class="w-full border p-2 rounded-lg"><?= implode("\n", $content['ppdb']['syarat'] ?? []) ?></textarea></div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                    <h2 class="font-bold text-lg text-blue-600">Alur Pendaftaran</h2>
                    <p class="text-sm text-gray-500">Judul dan Deskripsi harus sejajar (baris 1 judul = baris 1 deskripsi)</p>
                    <div><label class="block text-sm font-medium mb-1">Judul Langkah (1 baris = 1 langkah)</label><textarea name="ppdb_alur_titles" rows="4" class="w-full border p-2 rounded-lg"><?php foreach (($content['ppdb']['alur'] ?? []) as $a) echo $a['title'] . "\n"; ?></textarea></div>
                    <div><label class="block text-sm font-medium mb-1">Deskripsi Langkah</label><textarea name="ppdb_alur_descs" rows="4" class="w-full border p-2 rounded-lg"><?php foreach (($content['ppdb']['alur'] ?? []) as $a) echo $a['desc'] . "\n"; ?></textarea></div>
                </div>
                <div class="lg:col-span-2"><button type="submit" name="update_ppdb" class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700"><i class="fas fa-save mr-2"></i>Simpan Perubahan</button></div>
            </form>
            <?php endif; ?>

            <!-- TAB: FOOTER -->
            <?php if ($active_tab == 'footer'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-globe mr-2 text-gray-600"></i>Edit Footer & Kontak</h1>
            <form method="POST" class="bg-white p-6 rounded-xl shadow-sm border max-w-2xl space-y-4">
                <div><label class="block text-sm font-medium mb-1">Tagline</label><input type="text" name="footer_tagline" value="<?= $content['footer']['tagline'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                <div><label class="block text-sm font-medium mb-1">Alamat Lengkap</label><textarea name="footer_alamat" rows="2" class="w-full border p-2 rounded-lg"><?= $content['footer']['alamat'] ?? '' ?></textarea></div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium mb-1">Telepon</label><input type="text" name="footer_phone" value="<?= $content['footer']['phone'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                    <div><label class="block text-sm font-medium mb-1">Email</label><input type="email" name="footer_email" value="<?= $content['footer']['email'] ?? '' ?>" class="w-full border p-2 rounded-lg"></div>
                </div>
                <h3 class="font-bold pt-4">Link Sosial Media</h3>
                <div class="grid grid-cols-3 gap-4">
                    <div><label class="block text-sm font-medium mb-1"><i class="fab fa-facebook text-blue-600"></i> Facebook</label><input type="url" name="footer_fb" value="<?= $content['footer']['facebook'] ?? '' ?>" class="w-full border p-2 rounded-lg text-sm"></div>
                    <div><label class="block text-sm font-medium mb-1"><i class="fab fa-instagram text-pink-600"></i> Instagram</label><input type="url" name="footer_ig" value="<?= $content['footer']['instagram'] ?? '' ?>" class="w-full border p-2 rounded-lg text-sm"></div>
                    <div><label class="block text-sm font-medium mb-1"><i class="fab fa-youtube text-red-600"></i> YouTube</label><input type="url" name="footer_yt" value="<?= $content['footer']['youtube'] ?? '' ?>" class="w-full border p-2 rounded-lg text-sm"></div>
                </div>
                <button type="submit" name="update_footer" class="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900"><i class="fas fa-save mr-2"></i>Simpan Perubahan</button>
            </form>
            <?php endif; ?>

            <!-- TAB: GALLERY -->
            <?php if ($active_tab == 'gallery'): ?>
            <h1 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-images mr-2 text-pink-600"></i>Kelola Gallery</h1>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 class="font-bold text-lg mb-4">Tambah Foto</h2>
                    <form method="POST" class="space-y-4">
                        <input type="url" name="gallery_img" placeholder="Link Gambar (URL)" required class="w-full border p-2 rounded-lg">
                        <button type="submit" name="add_gallery" class="w-full bg-pink-600 text-white py-2 rounded-lg font-bold hover:bg-pink-700">Tambah</button>
                    </form>
                </div>
                <div class="lg:col-span-3">
                    <h2 class="font-bold text-lg mb-4">Foto Gallery (<?= count($content['gallery'] ?? []) ?>)</h2>
                    <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <?php foreach (($content['gallery'] ?? []) as $idx => $gal): ?>
                        <div class="relative group">
                            <img src="<?= $gal['img'] ?>" class="w-full h-24 object-cover rounded-lg">
                            <div class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <a href="?delete_gallery=<?= $idx ?>&tab=gallery" onclick="return confirm('Hapus foto ini?')" class="bg-red-500 text-white px-2 py-1 rounded text-xs"><i class="fas fa-trash"></i></a>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <?php endif; ?>

        </main>
    </div>
</body>
</html>
