-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2024 at 05:52 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbt-unit_test_dillon` INI UBAH AJA CUG, SESUAIIN AJAH
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `sandi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nama`, `sandi`) VALUES
('daji10', 'daji', 'daji123'),
('gogo11', 'gogo', 'gogo000');

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `nig` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kode_guru` varchar(255) NOT NULL,
  `id_mapel_kelas` varchar(255) NOT NULL,
  `sandi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`nig`, `nama`, `kode_guru`, `id_mapel_kelas`, `sandi`) VALUES
('1214', 'Erlang ft Siesta', 'erl', 'ximm32021pbo', 'Shiesuta12');

-- --------------------------------------------------------

--
-- Table structure for table `jawaban`
--

CREATE TABLE `jawaban` (
  `id` varchar(255) NOT NULL,
  `id_soal` int(11) NOT NULL,
  `pilihan` char(1) NOT NULL,
  `isi_jawaban` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` varchar(255) NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `angkatan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`, `jurusan`, `angkatan`) VALUES
('xiirpl22024', 'XII RPL 2', 'RPL', 2020),
('xiirpl32024', 'XII RPL 3', 'RPL', 2021),
('ximm32021', 'XI MM 3', 'mm', 2021);

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` varchar(255) NOT NULL,
  `nama_mapel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `nama_mapel`) VALUES
('ipa', 'IPA'),
('pbo', 'PBO');

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `id` varchar(255) NOT NULL,
  `id_jawaban` varchar(255) NOT NULL,
  `nis` varchar(255) NOT NULL,
  `jmlh_benar` int(11) NOT NULL,
  `nilai` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rel_guru_mapel`
--

CREATE TABLE `rel_guru_mapel` (
  `id` varchar(255) NOT NULL,
  `nig` varchar(255) NOT NULL,
  `id_mapel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rel_mapel_kelas`
--

CREATE TABLE `rel_mapel_kelas` (
  `id` varchar(255) NOT NULL,
  `id_kelas` varchar(255) NOT NULL,
  `id_mapel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rel_mapel_kelas`
--

INSERT INTO `rel_mapel_kelas` (`id`, `id_kelas`, `id_mapel`) VALUES
('ximm32021pbo', 'ximm32021', 'pbo');

-- --------------------------------------------------------

--
-- Table structure for table `rel_siswa_soal`
--

CREATE TABLE `rel_siswa_soal` (
  `id` varchar(255) NOT NULL,
  `nis` varchar(255) NOT NULL,
  `id_soal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rel_soal_mapel_kelas`
--

CREATE TABLE `rel_soal_mapel_kelas` (
  `id` varchar(255) NOT NULL,
  `id_soal` varchar(255) NOT NULL,
  `id_mapel_kelas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nis` varchar(255) NOT NULL,
  `id_kelas` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `panggilan` varchar(255) DEFAULT NULL,
  `sandi` varchar(255) NOT NULL,
  `lulus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nis`, `id_kelas`, `nama`, `panggilan`, `sandi`, `lulus`) VALUES
('12345', 'ximm32021', 'Andi Setiawan', 'Andi', 'password123', 0),
('2020120102', 'xiirpl22024', 'Dillon Vantra', 'Vantra', 'DillonVantra', 0),
('2020120105', 'xiirpl22024', 'Morpheus Zein Irawan', 'Morphy', 'Morphyeatmorphin', 0),
('20202021', 'ximm32021', 'Mado Inko', 'Inko', 'inko123', 0),
('23456', 'ximm32021', 'Budi Susanto', 'Budi', 'password456', 0),
('34567', 'ximm32021', 'Cici Lestari', 'Cici', 'password789', 0),
('45678', 'ximm32021', 'Dedi Pratama', 'Dedi', 'password101', 0),
('56789', 'ximm32021', 'Eni Rahmawati', 'Eni', 'password111', 0);

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `id` varchar(255) NOT NULL,
  `id_ujian` varchar(255) NOT NULL,
  `id_mapel` varchar(255) NOT NULL,
  `nig` varchar(255) NOT NULL,
  `nama_soal` text NOT NULL,
  `pertanyaan` text NOT NULL,
  `dibuat_pada` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ujian`
--

CREATE TABLE `ujian` (
  `id` varchar(255) NOT NULL,
  `nama_ujian` varchar(255) NOT NULL,
  `dimulai_pada` date DEFAULT NULL,
  `berakhir_pada` date DEFAULT NULL,
  `dibuat_pada` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`nig`),
  ADD KEY `guru_id_mapel_kelas_foreign` (`id_mapel_kelas`);

--
-- Indexes for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nilai_id_jawaban_foreign` (`id_jawaban`),
  ADD KEY `nilai_nis_foreign` (`nis`);

--
-- Indexes for table `rel_guru_mapel`
--
ALTER TABLE `rel_guru_mapel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rel_guru_mapel_id_mapel_foreign` (`id_mapel`),
  ADD KEY `rel_guru_mapel_nig_foreign` (`nig`);

--
-- Indexes for table `rel_mapel_kelas`
--
ALTER TABLE `rel_mapel_kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rel_mapel_kelas_id_kelas_foreign` (`id_kelas`),
  ADD KEY `rel_mapel_kelas_id_mapel_foreign` (`id_mapel`);

--
-- Indexes for table `rel_siswa_soal`
--
ALTER TABLE `rel_siswa_soal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rel_siswa_soal_id_soal_foreign` (`id_soal`),
  ADD KEY `rel_siswa_soal_nis_foreign` (`nis`);

--
-- Indexes for table `rel_soal_mapel_kelas`
--
ALTER TABLE `rel_soal_mapel_kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rel_soal_mapel_kelas_id_mapel_kelas_foreign` (`id_mapel_kelas`),
  ADD KEY `rel_soal_mapel_kelas_id_soal_foreign` (`id_soal`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nis`),
  ADD KEY `siswa_id_kelas_foreign` (`id_kelas`);

--
-- Indexes for table `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soal_nig_foreign` (`nig`),
  ADD KEY `soal_id_mapel_foreign` (`id_mapel`),
  ADD KEY `soal_id_ujian_foreign` (`id_ujian`);

--
-- Indexes for table `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guru`
--
ALTER TABLE `guru`
  ADD CONSTRAINT `guru_id_mapel_kelas_foreign` FOREIGN KEY (`id_mapel_kelas`) REFERENCES `rel_mapel_kelas` (`id`);

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `nilai_id_jawaban_foreign` FOREIGN KEY (`id_jawaban`) REFERENCES `jawaban` (`id`),
  ADD CONSTRAINT `nilai_nis_foreign` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`);

--
-- Constraints for table `rel_guru_mapel`
--
ALTER TABLE `rel_guru_mapel`
  ADD CONSTRAINT `rel_guru_mapel_id_mapel_foreign` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`id`),
  ADD CONSTRAINT `rel_guru_mapel_nig_foreign` FOREIGN KEY (`nig`) REFERENCES `guru` (`nig`);

--
-- Constraints for table `rel_mapel_kelas`
--
ALTER TABLE `rel_mapel_kelas`
  ADD CONSTRAINT `rel_mapel_kelas_id_kelas_foreign` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`),
  ADD CONSTRAINT `rel_mapel_kelas_id_mapel_foreign` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`id`);

--
-- Constraints for table `rel_siswa_soal`
--
ALTER TABLE `rel_siswa_soal`
  ADD CONSTRAINT `rel_siswa_soal_id_soal_foreign` FOREIGN KEY (`id_soal`) REFERENCES `soal` (`id`),
  ADD CONSTRAINT `rel_siswa_soal_nis_foreign` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`);

--
-- Constraints for table `rel_soal_mapel_kelas`
--
ALTER TABLE `rel_soal_mapel_kelas`
  ADD CONSTRAINT `rel_soal_mapel_kelas_id_mapel_kelas_foreign` FOREIGN KEY (`id_mapel_kelas`) REFERENCES `rel_mapel_kelas` (`id`),
  ADD CONSTRAINT `rel_soal_mapel_kelas_id_soal_foreign` FOREIGN KEY (`id_soal`) REFERENCES `soal` (`id`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_id_kelas_foreign` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`);

--
-- Constraints for table `soal`
--
ALTER TABLE `soal`
  ADD CONSTRAINT `soal_id_mapel_foreign` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`id`),
  ADD CONSTRAINT `soal_id_ujian_foreign` FOREIGN KEY (`id_ujian`) REFERENCES `ujian` (`id`),
  ADD CONSTRAINT `soal_nig_foreign` FOREIGN KEY (`nig`) REFERENCES `guru` (`nig`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
