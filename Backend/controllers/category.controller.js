import db from "../config/db.js";

export const getAllCategories = (req, res) =>{
    db.query("SELECT id, name FROM categories", (err, rows) => {
        if(err){
            return res.status(500).json({message: "Failed to fetch categories"});
                }
                console.log(rows);

                res.json(rows);
    });
};

//add new category
export const addCategory = (req, res) => {
    const {name} = req.body;

    if(!name || name.trim().length <3){
        return res.status(400).json({message: "Category name required"});
    }

    const sql = "INSERT INTO categories (name) VALUES(?)";
    db.query(sql, [name.trim()], (err, result) => {
        if(err) {
            return res.status(500).json({message:"Category add failed"});
        }
        res.status(201).json({
            message: "Category added successfully.", id: result.insertId,
        });
    });
};






