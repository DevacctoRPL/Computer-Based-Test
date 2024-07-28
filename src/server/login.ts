import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

const app = express()
const port = 3000

// Konfigurasi koneksi database MySQL
const pool = mysql.createPool({
  host: "your_host",
  user: "your_user",
  password: "your_password",
  database: "cbt",
})

app.use(cors())
app.use(express.json())

app.post("/login", async (req, res) => {
  const { nis, password } = req.body as { nis: string; password: string }

  // Validasi input
  if (!nis || !password) {
    return res.status(400).json({ message: "NIS dan password harus diisi" })
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE nis = ?", [
      nis,
    ])

    if (rows.length === 0 || rows[0].password_hash !== password) {
      return res.status(401).json({ message: "NIS atau password salah" })
    }

    return res.json({ message: "Login berhasil" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Terjadi kesalahan pada server" })
  }
})

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
