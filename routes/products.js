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
router.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return res.status(404).render('error', {
            message: 'Product not found',
            error: { status: 404, stack: '' }
        });
    }
    // to generate similar products
    const similarProducts = products.filter(p => p.slug !== slug).slice(0, 3);

    res.render('product', { product, similarProducts });
});
module.exports = router;


