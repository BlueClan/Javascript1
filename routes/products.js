var express = require('express');
var router = express.Router();
const db = require('../db/db'); // Database connection

router.get('/:slug', (req, res) => {
    const slug = req.params.slug;

    // Fetch the product with the matching slug
    db.get('SELECT * FROM products WHERE slug = ?', [slug], (err, product) => {
        if (err) {
            console.error('Error fetching product:', err.message);
            return res.status(500).render('error', { message: 'Database error', error: { status: 500, stack: '' } });
        }
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found', error: { status: 404, stack: '' } });
        }

        // Fetch similar products (excluding the current product)
        db.all('SELECT * FROM products WHERE slug != ? LIMIT 3', [slug], (err, similarProducts) => {
            if (err) {
                console.error('Error fetching similar products:', err.message);
                return res.status(500).render('error', { message: 'Database error', error: { status: 500, stack: '' } });
            }
            res.render('product', { product, similarProducts });
        });
    });
});

module.exports = router;