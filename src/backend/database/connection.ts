import mysql2 from 'mysql2'

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cbt",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;