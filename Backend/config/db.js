import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7477060870",
  database: "hdhub4u_admin",
});
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL connected");
  }
});

export default db;
