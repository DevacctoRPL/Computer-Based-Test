-- HARAP BACA SEBELUM IMPORT!!!
-- KODE DIBAWAH AKAN MENGGANTI (REPLACE) DATABASE DAN TABEL SEBELUMNYA JIKA ADA
-- Mengapa begitu? AGAR TIDAK MENYUSAHKAN DEVELOPER DAN ENGINEER SAAT INGIN MENGIMPOR ULANG DATABASE INI 
-- APALAGI JIKA BANYAK REVISI, MAKANYA DIBUATLAH SEPERTI INI
-- UNTUK MENCEGAH KEHILANGAN DATA DARI DATABASE SEBELUMNYA, JANGAN GEGABAH
-- Terima kasih...
--
-- CBT DATABASE version 2.12 beta
--
DROP DATABASE cbt_v2_beta;

CREATE DATABASE cbt_v2_beta;

USE cbt_v2_beta;

-- id admin dari nama admin dan angka 
-- id = nama + angka increment (dimulai dari 0)
CREATE TABLE
  admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255),
    sandi VARCHAR(255)
  );

-- Data dummy
INSERT INTO
  admin (nama, sandi)
VALUES
  ("admin", "admin");

-- id = mapel + lowercase
CREATE TABLE
  mapel (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    mapel VARCHAR(255) NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
  );

-- Data dummy
INSERT INTO
  mapel (id, mapel)
VALUES
  ("ppl", "PPL");

-- id = nama_kelas + angkatan 
CREATE TABLE
  kelas (
    id VARCHAR(255) PRIMARY KEY,
    nama_kelas VARCHAR(255) NOT NULL,
    jurusan VARCHAR(255),
    id_mapel VARCHAR(255),
    angkatan INT NOT NULL,
    FOREIGN KEY (id_mapel) REFERENCES mapel (id) ON UPDATE CASCADE ON DELETE SET NULL
  );

-- Data dummy
INSERT INTO
  kelas
VALUES
  ("xrpl12023", "X RPL 1", "RPL", "ppl", 2023);

CREATE TABLE
  guru (
    nig INT PRIMARY KEY NOT NULL,
    nama VARCHAR(255) NOT NULL,
    kode_guru VARCHAR(255) NOT NULL,
    sandi VARCHAR(255) NOT NULL,
    id_kelas VARCHAR(255),
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE SET NULL
  );

-- Data dummy
INSERT INTO
  guru
VALUES
  (
    2022304567,
    "Gogu Jadu",
    "gogo",
    "Indojuara1",
    "xrpl12023"
  );

CREATE TABLE
  siswa (
    nis INT PRIMARY KEY NOT NULL,
    nama VARCHAR(255) NOT NULL,
    panggilan VARCHAR(255) NOT NULL,
    sandi VARCHAR(255) NOT NULL,
    is_lulus TINYINT NOT NULL,
    is_switch_tab TINYINT,
    id_kelas VARCHAR(255),
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE SET NULL
  );

-- Data dummy
INSERT INTO
  siswa
VALUES
  (
    00654382901,
    "Dante Umumakan",
    "Dante",
    "kumaumakan10",
    0,
    NULL,
    "xrpl12023"
  );

-- id = ujian + dimulai_pada
CREATE TABLE
  ujian (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    ujian VARCHAR(255) NOT NULL,
    dimulai_pada DATE NOT NULL,
    berakhir_pada DATE NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
  );

-- Data dummy
INSERT INTO
  ujian (id, ujian, dimulai_pada, berakhir_pada)
VALUES
  ("pas20220201", "PAS", "2022-02-01", "2022-02-07");

-- id = mapel + id_ujian
CREATE TABLE
  soal (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    judul_soal TEXT NOT NULL,
    durasi TIME NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    id_mapel VARCHAR(255),
    id_ujian VARCHAR(255),
    id_kelas VARCHAR(255),
    nig INT,
    FOREIGN KEY (id_mapel) REFERENCES mapel (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_ujian) REFERENCES ujian (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (nig) REFERENCES guru (nig) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  soal (
    id,
    judul_soal,
    durasi,
    id_mapel,
    id_ujian,
    id_kelas
  )
VALUES
  (
    "pplpas20220201",
    "PAS PPL",
    "01:00:00",
    "ppl",
    "pas20220201",
    "xrpl12023"
  );

CREATE TABLE
  pertanyaan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomor INT,
    pertanyaan TEXT NOT NULL,
    gambar TEXT,
    id_soal VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_soal) REFERENCES soal (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  pertanyaan (nomor, pertanyaan, id_soal)
VALUES
  (1, "Mengapa PPL itu ada?", "pplpas20220201");

-- id = id_pertanyan + pilihan
CREATE TABLE
  jawaban (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    id_pertanyaan INT NOT NULL,
    pilihan CHAR(1) NOT NULL,
    isi_jawaban TEXT NOT NULL,
    gambar TEXT,
    benar TINYINT NOT NULL,
    FOREIGN KEY (id_pertanyaan) REFERENCES pertanyaan (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

-- data dummy
INSERT INTO
  jawaban
VALUES
  (
    "1a",
    1,
    "a",
    "Untuk memudahkan Developer dalam mengembangkan aplikasi",
    NULL,
    0
  );

CREATE TABLE
  nilai_siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nis INT,
    id_soal VARCHAR(255),
    nilai_total INT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (nis) REFERENCES siswa (nis) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_soal) REFERENCES soal (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  nilai_siswa (nis, id_soal, nilai_total)
VALUES
  (00654382901, "pplpas20220201", NULL);

-- id = bilangan dimulai dari 10
CREATE TABLE
  jawaban_siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_nilai INT,
    id_jawaban VARCHAR(255),
    nilai_per_jawaban INT DEFAULT 1,
    FOREIGN KEY (id_nilai) REFERENCES nilai_siswa (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_jawaban) REFERENCES jawaban (id) ON UPDATE CASCADE ON DELETE SET NULL
  );

INSERT INTO
  jawaban_siswa
VALUES
  (10, 1, "1a", 1);

CREATE TABLE
  rel_guru_mapel (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    nig INT NOT NULL,
    id_mapel VARCHAR(255) NOT NULL,
    FOREIGN KEY (nig) REFERENCES guru (nig) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_mapel) REFERENCES mapel (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  rel_guru_mapel
VALUES
  ("2022304567ppl", 2022304567, "ppl");

CREATE TABLE
  rel_kelas_mapel (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    id_kelas VARCHAR(255) NOT NULL,
    id_mapel VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_mapel) REFERENCES mapel (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  rel_kelas_mapel
VALUES
  ("xrpl12023ppl", "xrpl12023", "ppl");

CREATE TABLE
  rel_guru_kelas (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    nig INT NOT NULL,
    id_kelas VARCHAR(255) NOT NULL,
    FOREIGN KEY (nig) REFERENCES guru (nig) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  rel_guru_kelas
VALUES
  ("2022304567xrpl12023", 2022304567, "xrpl12023");

CREATE TABLE
  rel_soal_kelas (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    id_soal VARCHAR(255) NOT NULL,
    id_kelas VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_soal) REFERENCES soal (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_kelas) REFERENCES kelas (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

INSERT INTO
  rel_soal_kelas
VALUES
  (
    "pplpas20220201xrpl12023",
    "pplpas20220201",
    "xrpl12023"
  );