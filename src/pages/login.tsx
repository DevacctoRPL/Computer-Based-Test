import React from "react"

const Login: React.FC = () => {
  return (
    <>
      <main>
        <form action="../../server/login.ts" method="post">
          <label htmlFor="nama">Nama Panggilan</label>
          <br />
          <input type="text" id="nama" name="nama" />
          <br /> <br />
          <label htmlFor="sandi">Sandi</label>
          <br />
          <input type="password" name="sandi" id="sandi" />
          <br />
          <button type="submit">Masuk</button>
        </form>
      </main>
    </>
  )
}

export default Login
