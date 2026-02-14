import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const loginAdmin = (req, res) => {
     
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email & password required");
    return res.status(400).json({ message: "Email & password required" });
  }

  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result[0];
    const isMatch = bcrypt.compareSync(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin :{
        id: admin.id,
        email: admin.email
      }
    });
  });
};
