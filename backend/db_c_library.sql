-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 05:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_c_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` bigint(20) UNSIGNED NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `thn_terbit` date NOT NULL,
  `judul` varchar(255) NOT NULL,
  `jml_pinjam` int(11) NOT NULL DEFAULT 0,
  `stok` int(11) NOT NULL,
  `pengarang` varchar(255) NOT NULL,
  `status` enum('available','borrowed') NOT NULL DEFAULT 'available',
  `isbn` varchar(255) DEFAULT NULL,
  `book_poster` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `kategori`, `thn_terbit`, `judul`, `jml_pinjam`, `stok`, `pengarang`, `status`, `isbn`, `book_poster`, `created_at`, `updated_at`) VALUES
(1, 'Horror', '2024-12-01', 'Frankenstein', 25, 101, 'Mary Shelley', 'available', '9781234567890', 'book_posters/Frankenstein.jpg', '2024-12-06 11:47:01', '2024-12-17 09:39:56'),
(2, 'Horror', '2024-12-01', 'Carmilla', 12, 100, '. Sheridan Le Fanu', 'available', '9781234567890', 'book_posters/Carmilla.jpg', '2024-12-06 11:47:01', '2024-12-17 09:10:18'),
(3, 'Horror', '2024-12-01', 'Gothic Tales', 12, 100, 'Elizabeth Gaskell', 'available', '9781234567890', 'book_posters/GothicTales.jpg', '2024-12-06 11:47:01', '2024-12-17 02:18:42'),
(4, 'Horror', '2024-12-01', 'Dracula', 13, 100, 'Bram Stoker', 'available', '9781234567890', 'book_posters/Dracula.jpg', '2024-12-06 11:47:01', '2024-12-17 02:19:23'),
(6, 'Horror', '2024-12-02', 'Rebecca', 16, 100, 'Daphne du Maurier', 'available', '9781234567890', 'book_posters/rebecca.jpg', '2024-12-06 11:47:01', '2024-12-17 09:39:48'),
(7, 'Horror', '2024-12-02', 'I Am Legend', 16, 100, 'Richard Matheson', 'available', '9781234567890', 'book_posters/IamLegend.jpg', '2024-12-06 11:47:01', '2024-12-17 02:21:46'),
(8, 'Horror', '2024-12-15', 'The Bad Seed', 17, 100, 'William March', 'available', '9781234567890', 'book_posters/TheBadSeed.jpg', '2024-12-06 11:47:01', '2024-12-17 02:22:02'),
(9, 'Horror', '2024-12-10', 'Psycho', 18, 100, 'Robert Bloch', 'available', '9781234567890', 'book_posters/Psycho.jpg', '2024-12-06 11:47:01', '2024-12-17 02:25:23'),
(10, 'Horror', '2024-12-07', 'The Exorcist', 19, 100, 'William Peter Blatty', 'available', '9781234567890', 'book_posters/TheExorcist.jpg', '2024-12-06 11:47:01', '2024-12-17 02:26:01'),
(11, 'Horror', '2024-12-07', 'Carrie', 20, 100, 'Stephen King', 'available', '9781234567890', 'book_posters/carrie.jpg', '2024-12-06 11:47:01', '2024-12-17 02:27:38'),
(13, 'Fantasy', '2024-12-06', 'The Hobbit', 2, 1, 'J.R.R. Tolkien', 'available', '1', 'book_posters/theHobbit.jpg', '2024-12-15 04:21:18', '2024-12-17 02:40:11'),
(15, 'Fantasy', '2024-12-12', 'Kindred', 1, 110, 'Octavia Butler', 'available', 'apa ya', 'book_posters/kindred.jpg', '2024-12-16 10:17:04', '2024-12-17 08:27:25'),
(16, 'Fantasy', '2024-12-08', 'Little, Big', 0, 100, 'ohn Crowley', 'available', '1234567890000', 'book_posters/littlebig.jpg', '2024-12-16 10:28:16', '2024-12-17 02:40:28'),
(17, 'Romance', '2024-12-16', 'Jane Eyre', 0, 1, 'Charlotte Brontë', 'available', '1111', 'book_posters/janeEyre.jpg', '2024-12-17 02:33:09', '2024-12-17 02:44:05'),
(18, 'Fantasy', '2024-12-08', 'The Gunslinger', 0, 1, 'Stephen King', 'available', 'asdfgh', 'book_posters/gunslinger.jpg', '2024-12-17 02:38:27', '2024-12-17 02:40:39'),
(19, 'Kids', '2024-11-30', 'The Mitten', 0, 1, 'Jan Brett', 'available', 'qqqqqqqqqq', 'book_posters/theMitten.jpg', '2024-12-17 02:44:31', '2024-12-17 02:47:21'),
(20, 'Fiction', '2024-12-09', 'The Giver', 0, 2, 'Lois Lowry', 'available', 'asdfv', 'book_posters/the-giver.jpg', '2024-12-17 02:45:18', '2024-12-17 02:53:16'),
(21, 'Kids', '2024-12-02', 'Press Here', 0, 3, 'Hervé Tullet', 'available', '1234567', 'book_posters/pressHere.jpg', '2024-12-17 02:48:22', '2024-12-17 02:48:22'),
(22, 'Kids', '2024-12-10', 'Snuggle Puppy!', 0, 2, 'Sandra Boynton', 'available', '123456dc', 'book_posters/snugglePuppy.jpg', '2024-12-17 02:49:16', '2024-12-17 02:49:16'),
(23, 'Romance', '2024-12-01', 'Fahrenheit 4512', 0, 12, 'Ray Bradbury2', 'available', 'sdcxs2', 'book_posters/XCfgahD0COiEq7x31pziD9WRQgcNyyG9C9fibpsH.jpg', '2024-12-17 02:52:00', '2024-12-17 09:02:20'),
(24, 'Fiction', '2024-12-07', 'The Power', 0, 1, 'Naomi Alderman', 'available', 'asdc', 'book_posters/thePower.jpg', '2024-12-17 02:54:17', '2024-12-17 02:54:17'),
(25, 'Romance', '2024-12-12', 'Anna Karenina', 0, 1, 'Leo Tolstoy', 'available', 'asdcx', 'book_posters/annaKarenina.jpg', '2024-12-17 02:55:23', '2024-12-17 02:55:23'),
(26, 'Romance', '2024-12-07', 'Maurice', 0, 12, 'E.M. Forster', 'available', 'maurice', 'book_posters/maurice.jpg', '2024-12-17 02:56:29', '2024-12-17 02:56:29'),
(27, 'Romance', '2024-12-13', 'Romeo and Juliet', 1, 0, 'William Shakespeare', 'available', '122', 'book_posters/romeonjuliet.jpg', '2024-12-17 02:57:29', '2024-12-17 08:27:27');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_12_06_064746_create_user_table', 1),
(2, '2024_12_06_064823_create_buku_table', 1),
(3, '2024_12_06_064840_create_peminjaman_table', 1),
(4, '2024_12_06_064856_create_pengembalian_table', 1),
(5, '2024_12_06_065249_create_personal_access_tokens_table', 1),
(6, '2024_12_06_071323_create_sessions_table', 2),
(7, '2024_12_07_183206_add_book_poster_to_buku_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id_pinjam` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_buku` bigint(20) UNSIGNED NOT NULL,
  `tgl_pinjam` date NOT NULL,
  `tgl_kembali` date DEFAULT NULL,
  `status` enum('borrowed','returned','pending') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengembalian`
--

CREATE TABLE `pengembalian` (
  `id_pengembalian` bigint(20) UNSIGNED NOT NULL,
  `id_pinjam` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `jml_denda` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(110, 'App\\Models\\User', 1, 'API Token', 'a1d7f5093f75d9329737673b3b5d8b702fbe80d2446909286174e654cf37ce4b', '[\"*\"]', '2024-12-17 09:40:27', NULL, '2024-12-17 09:38:23', '2024-12-17 09:40:27');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('admin','anggota') NOT NULL,
  `profile_photo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `no_telp`, `address`, `role`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, 'Admin ATMA Library', 'admin@gmail.com', '$2y$12$d1u8IcZ0F.UA6Ph6QtWO0uTPywsEe5uZmiHAFt9xFnept.x8qhkd2', '081393336578', 'Jalan Perpustakaan Atma Jaya Yogyakarta No 3C', 'admin', 'profile_photos/admin.jpg', '2024-12-06 00:11:25', '2024-12-06 00:11:25'),
(7, 'V', 'V@gmail.com', '$2y$12$9MKpJKXKW0KNjnnljyMR0etLoiKynExwKhMdfa.UY2qJHxMt6.RU.', '12345678', NULL, 'anggota', 'profile_photos/7pvGk777M59tWd4Gj4gDFN6DXUYdExBM3QSxbyRK.jpg', '2024-12-17 08:08:11', '2024-12-17 08:16:28'),
(8, 'Vania', 'Vania@gmail.com', '$2y$12$ztZJEp4h0726Te5C1ACXL.Hrt/Vq.2iG6Tnyerk.7Z8Qmg98vuZpW', '081218111', 'Bumi', 'anggota', 'profile_photos/HUBr0BWEXrw8apQ37jjwzXFBZ0RX5evyQBwSENUi.jpg', '2024-12-17 08:56:07', '2024-12-17 08:59:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id_pinjam`),
  ADD KEY `peminjaman_id_user_foreign` (`id_user`),
  ADD KEY `peminjaman_id_buku_foreign` (`id_buku`);

--
-- Indexes for table `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD PRIMARY KEY (`id_pengembalian`),
  ADD KEY `pengembalian_id_pinjam_foreign` (`id_pinjam`),
  ADD KEY `pengembalian_id_user_foreign` (`id_user`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id_buku` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id_pinjam` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pengembalian`
--
ALTER TABLE `pengembalian`
  MODIFY `id_pengembalian` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_id_buku_foreign` FOREIGN KEY (`id_buku`) REFERENCES `buku` (`id_buku`),
  ADD CONSTRAINT `peminjaman_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD CONSTRAINT `pengembalian_id_pinjam_foreign` FOREIGN KEY (`id_pinjam`) REFERENCES `peminjaman` (`id_pinjam`),
  ADD CONSTRAINT `pengembalian_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
