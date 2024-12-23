const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Points to db.js

// Log to confirm database is loaded
console.log('Database loaded:', db);

// Route to get all products and render the admin-products page
router.get('/products', (req, res) => {
    res.render('admin-products', { products: [] }); // Pass an empty array initially
});

// Route to render the form for adding a new product
router.get('/products/new', (req, res) => {
    res.render('admin-new');
});

// Route to handle form submissions for adding new products
router.post('/products/new', (req, res) => {
    const { name, sku, price, image, description, categories } = req.body;
    db.run(
        'INSERT INTO products (name, sku, price, image, description, categories) VALUES (?, ?, ?, ?, ?, ?)',
        [name, sku, price, image, description, categories],
        function (err) {
            if (err) {
                console.error('Database insertion error:', err.message);
                return res.status(500).json({ message: 'Error adding product' });
            }
            res.status(200).json({ message: 'Product added successfully' }); // Return success response
        }
    );
});

// API route to fetch products (used by the Fetch API in the frontend)
router.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
