const express = require('express');
const router = express.Router();
const db = require('../db/db'); 




router.get('/products', (req, res) => {
    res.render('admin-products', { products: [] });
});

// Route for new product
router.get('/products/new', (req, res) => {
    res.render('admin-new');
});


router.post('/products/new', (req, res) => {
    const { name, sku, price, image, description, brand } = req.body;

    // creating slug from the name of the new product
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // put the new product in the database
    db.run(
        'INSERT INTO products (name, slug, sku, price, image, description, brand) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, slug, sku, price, image, description, brand],
        function (err) {
            if (err) {
                console.error('Database insertion error:', err.message);
                return res.status(500).json({ message: 'Error adding product' });
            }
            res.status(200).json({ message: 'Product added successfully', slug }); // feeback to adding a product
        }
    );
});

// fetch all products 
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