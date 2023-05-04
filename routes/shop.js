const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);      //GET route as we display a new route, /: shows that variable/dynamic route/segment will be added by colon
//We also added a shop controller to connect the controller function 

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);      // We created a new routes accepting a post request and connected it to postCart controller

router.post('/cart-delete-item', shopController.postCartDeleteProduct);     //We add the cart delete route woth new controller 

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
