import bcrypt from "bcrypt";

const password = "admin@123"; 
const hash = bcrypt.hashSync(password, 10);

console.log(hash);
