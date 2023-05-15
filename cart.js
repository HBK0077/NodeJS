const fs = require('fs');
const path = require('path');

const p = path.join(
    __dirname,
    '../',
    'data',
    'cart.json'
);
  

module.exports = class Cart{
    static addProduct(id, productPrice){
        //Fetch the previous cart products
        fs.readFile(p, (err, fileContent)=>{
            let cart = {products:[], totalPrice: 0}
            if(!err){
                cart  = JSON.parse(fileContent);
            }
       
        //Analyze the cart for the exsiting product
        const exsitingProductIndex = cart.products.findIndex(prod => prod.id === id);
        const exsitingProduct = cart.products[exsitingProductIndex];
        let updatedProduct;
        
        if(exsitingProduct){
            updatedProduct = {...exsitingProduct};
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[exsitingProductIndex] = updatedProduct;
        }
        //add a new product / increase the quantity
        else{
            updatedProduct = {id: id, qty:1};
            cart.products = [...cart.products, updatedProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err)=>{
            console.log(err);
        });
    });
    }
};