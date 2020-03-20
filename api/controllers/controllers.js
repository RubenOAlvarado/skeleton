const mongoose = require('mongoose');
const Product = require('../models/product');
const winston = require('../config/winston');

exports.list = (req,res) => {
    Product.find({}, (err, products) => {
        if(err) {winston.error(`Error: ${err}`); return;}
        winston.info('THE INDEX');
        res.render('../views/product/index', {products});
    });
};

exports.show = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) {winston.error(`Error: ${err}`); return;}
        res.render('../views/product/show', {product});
    });
};

exports.create = (req,res) => res.render('../views/product/create');

exports.save = (req,res) => {
    const product = new Product(req.body);

    product.save(err => {
        if(err) {winston.error(`Error: ${err}`); return;}
        winston.info('Successfully created a product.');
        res.redirect(`/products/show/${product.id}`);
    });
};

exports.edit = (req,res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) {winston.error(`Error: ${err}`); return;}
        res.render('../views/product/edit', {product});
    });
};

exports.update = (req,res) => {
    Product.findByIdAndUpdate({_id:req.params.taskId}, req.body, {new: true}, (err, product) => {
        if(err) {
            winston.error(`Error: ${err}`); 
            res.render('../views/product/edit', {product:req.body});
        }
        winston.info(product);
        res.redirect(`products/show/${product.id}`);
    });
};

exports.delete = (req,res) => {
    Product.remove({_id:req.params.id}, err => {
        if(err) {winston.error(`Error: ${err}`); return;}
        winston.info('Product deleted!');
        res.redirect('/products');
    });
};