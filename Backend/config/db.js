
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
    console.log("MYSQL_URL AT RUNTIME =>", JSON.stringify(process.env.MYSQL_URL));
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
   
    console.log("MySQL connected successfully");
  }
});

export default db;