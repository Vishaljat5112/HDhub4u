import db from "../config/db.js";


//generate slug
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

//delete category
export const deleteCategory = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err){
            return res.status(500).json({message: "Category delete failed"});
        }

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Category not found"});
        }

        res.json({message: "Category deleted successfully"});
    });
};


// update category
export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim().length < 3) {
        return res.status(400).json({ message: "Valid category name required" });
    }

    const sql = "UPDATE categories SET name = ? WHERE id = ?";

    db.query(sql, [name.trim(), id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Category update failed" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category updated successfully" });
    });
};




//get alll category
export const getAllCategories = (req, res) =>{
    db.query("SELECT id, name FROM categories ORDER BY id ASC", (err, rows) => {
        if(err){
            return res.status(500).json({message: "Failed to fetch categories"});
                }
                console.log(rows);

                res.json(rows);
    });
};




// add new category
export const addCategory = (req, res) => {
    const { name } = req.body;

    if (!name || name.trim().length < 3) {
        return res.status(400).json({ message: "Category name required" });
    }

    const trimmedName = name.trim();
    const slug = generateSlug(trimmedName);

    const sql = "INSERT INTO categories (name, slug) VALUES (?, ?)";

    db.query(sql, [trimmedName, slug], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ message: "Category already exists" });
            }
            return res.status(500).json({ message: "Category add failed" });
        }

        res.status(201).json({
            message: "Category added successfully",
            id: result.insertId,
        });
    });
};





