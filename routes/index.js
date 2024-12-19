var express = require('express');
var router = express.Router();

const products = [
  { id: 1, name: 'Alpha T-Shirt', price: 199, image: '/images/1.jpg', slug: 'alpha-tshirt', brand: 'Levis',},
  { id: 2, name: 'Beta T-Shirt', price: 199, image: '/images/2.jpg', slug: 'beta-tshirt', brand: 'Levis' },
  { id: 3, name: 'Charlie T-Shirt', price: 199, image: '/images/3.jpg', slug: 'charlie-tshirt', brand: 'Levis' },
  { id: 4, name: 'Delta T-Shirt', price: 199, image: '/images/4.jpg', slug: 'delta-tshirt', brand: 'Levis' },
  { id: 5, name: 'Echo T-Shirt', price: 199, image: '/images/5.jpg', slug: 'echo-tshirt', brand: 'Levis' },
  { id: 6, name: 'Fox T-Shirt', price: 199, image: '/images/6.jpg', slug: 'fox-tshirt', brand: 'Levis' },
  { id: 7, name: 'Golf T-Shirt', price: 199, image: '/images/7.jpg', slug: 'golf-tshirt', brand: 'Levis' },
  { id: 8, name: 'Hotel T-Shirt', price: 199, image: '/images/8.jpg', slug: 'hotel-tshirt', brand: 'Levis' },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { products });
});

module.exports = router;

