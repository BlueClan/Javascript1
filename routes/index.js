const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', function (req, res, next) {
    db.all('SELECT * FROM products', (err, products) => {
        if (err) {
            console.error('Error fetching products:', err.message);
            return res.status(500).render('error', { message: 'Database error' });
        }
        res.render('index', { products });
    });
});

module.exports = router;

