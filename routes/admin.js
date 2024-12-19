const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Points to db.js inside the db folder
console.log('Database loaded:', db);

// Get all products and render the admin-products page
router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).send('Database error');
        } else {
            res.render('admin-products', { products: rows });
        }
    });
});

// Render the admin-new page
router.get('/products/new', (req, res) => {
    res.render('admin-new');
});

// Handle form submissions for adding new products
router.post('/products/new', (req, res) => {
    const { name, sku, price, image, description, categories } = req.body;
    db.run(
        'INSERT INTO products (name, sku, price, image, description, categories) VALUES (?, ?, ?, ?, ?, ?)',
        [name, sku, price, image, description, categories],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error adding product');
            }
            res.redirect('/admin/products'); // Redirect to the product list after adding
        }
    );
});

module.exports = router;
