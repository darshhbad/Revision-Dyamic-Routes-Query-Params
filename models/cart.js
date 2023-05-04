const fs = require('fs');     
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'   //created a file containg cart info in data folder
);

module.exports = class Cart {
  static addProduct(id, productPrice) {   //takes the id and price of th product we want to add
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };   //we create a cart object and will push the details if the cart is not empty
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(     //checked if the product already exists by index as we don't know where the product is in cart
        prod => prod.id === id            
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };  //... spread operator taker properties of existing object
        updatedProduct.qty = updatedProduct.qty + 1;      //increased quantity as the product is already foung
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;   //add updated product with existing cart
      } else {
        updatedProduct = { id: id, qty: 1 };        //if not found we set the id as id we got, and set quantity to 1
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;  //we added + in front of product price to convert it to integer
      fs.writeFile(p, JSON.stringify(cart), err => {      //we saved the new cart to the file
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {    //We get the id and price of the product as we will need to update the price of product on deletion
    fs.readFile(p, (err, fileContent) => {    //We read the cart if products ar present
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {                                           //We need to check if product is present in the cart or not 
          return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {    //We get the product ids if the cart is not empty
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
