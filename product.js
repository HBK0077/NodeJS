const products = [];
const { json } = require('body-parser');
const fs = require('fs');
const path= require('path');
const p = path.join(
    __dirname,
    '../',
    'data',
    'products.json'
);

const getProductsFromFile = (cb)=>{
     //const fileData = fs.readFile("products.txt");
    
    fs.readFile(p, (err,fileContent)=>{
        if(err){
            cb([]);
        }else{
        cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        // products.push(this);
        // fs.writeFile("products.txt",products);
        getProductsFromFile(products =>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });

    }

    static fetchAll(cb){
       getProductsFromFile(cb);
    }
}