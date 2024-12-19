var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite3 database
let db = new sqlite3.Database('./database.db'); // Change this path to your actual database location

// Route to get all products for admin-products.ejs
router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.render('admin-products', { products: rows });
        }
    });
});

// Route to display the new product form
router.get('/products/new', (req, res) => {
    res.render('admin-new');
});

// Route to handle form submission and add a new product
router.post('/products', (req, res) => {
    const { name, description, image, sku, price, categories } = req.body;
    
    // Insert the new product into the database
    const stmt = db.prepare('INSERT INTO products (name, description, image, sku, price, categories) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(name, description, image, sku, price, categories.join(','), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving product');
        } else {
            res.redirect('/admin/products');
        }
    });
    stmt.finalize();
});

module.exports = router;