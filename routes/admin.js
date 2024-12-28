const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Points to db.js



// Route to render the admin-products page
router.get('/products', (req, res) => {
    res.render('admin-products', { products: [] }); // Pass an empty array initially
});

// Route to render the form for adding a new product
router.get('/products/new', (req, res) => {
    res.render('admin-new');
});

// Route to handle form submissions for adding new products
router.post('/products/new', (req, res) => {
    const { name, sku, price, image, description, brand } = req.body;

    // Generate the slug from the name
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // Insert the product into the database
    db.run(
        'INSERT INTO products (name, slug, sku, price, image, description, brand) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, slug, sku, price, image, description, brand],
        function (err) {
            if (err) {
                console.error('Database insertion error:', err.message);
                return res.status(500).json({ message: 'Error adding product' });
            }
            res.status(200).json({ message: 'Product added successfully', slug }); // Return success response
        }
    );
});

// Route to fetch all products dynamically
router.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(rows); // Return products as JSON
        }
    });
});

module.exports = router;
