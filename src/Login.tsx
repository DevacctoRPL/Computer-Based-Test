import React from "react"
import LoginForm from "./components/LoginForm"
import { useNavigate } from "react-router-dom"
import { hashPassword } from "./utils/hashPassword"

const Login: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: { nis: string; password: string }) => {
    const hashedPassword = await hashPassword(data.password)

    // Simulasi cek ke database
    const users = [{ nis: "12345", passwordHash: "hashed_password" }]
    const user = users.find(
      (u) => u.nis === data.nis && u.passwordHash === hashedPassword
    )

    if (user) {
      navigate("/dashboard") // Ganti dengan halaman dashboard
    } else {
      alert("NIS atau password salah")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login
