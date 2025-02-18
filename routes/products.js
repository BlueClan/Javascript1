const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/:slug', (req, res) => {
    const slug = req.params.slug;

    
    db.get('SELECT * FROM products WHERE slug = ?', [slug], (err, product) => {
        if (err) {
            console.error('Error fetching product:', err.message);
            return res.status(500).render('error', { message: 'Database error' });
        }
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        
        db.all('SELECT * FROM products WHERE slug != ? LIMIT 3', [slug], (err, similarProducts) => {
            if (err) {
                console.error('Error fetching similar products:', err.message);
                return res.status(500).render('error', { message: 'Database error' });
            }
            res.render('product', { product, similarProducts });
        });
    });
});

module.exports = router;