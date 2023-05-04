const Product = require('../models/product');
const Cart = require('../models/cart');     //imported cart form models 

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {    //We define a controller to get a single product
  const prodId = req.params.productId;        //express give params object in our request through which we can access prodId as address name declared in routes
  Product.findById(prodId, product => {       // We implement the findById method 
    res.render('shop/product-detail', {       // We rendered the product-detail view of shop view
      product: product,                       // product on left side is the key accessed in view and right side is value taken as argument
      pageTitle: product.title,               // page title taken by head view
      path: '/products'                       // We highlighted this as we want to highlight this section in navigation section
    }); 
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {   //We fetch the products in cart
  Cart.getCart(cart => {
    Product.fetchAll(products => {    //First we fetch all products present in admin
      const cartProducts = [];
      for (product of products) {     //Then we check which products are present in cart
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {      //We need to fetch the product and add it to cart
  const prodId = req.body.productId;          //req.body.productId is the name we use in views input
  Product.findById(prodId, product => {       //We find th product
    Cart.addProduct(prodId, product.price);   //From cart model, 
  });
  res.redirect('/cart');                      //This will render the cart page using get request
};

exports.postCartDeleteProduct = (req, res, next) => {   //We fetch the id from request in hidden view, and delete the product
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
