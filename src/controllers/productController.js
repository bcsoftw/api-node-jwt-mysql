const Product = require('../models/Product');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const db = require('../config/db');

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        responseTrait.responseSuccess(res, products,'Product List Fetch Successfully !');
    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing products');
    }
};

exports.createProduct = async (req, res) => {
    const { name, technology, description, discount, price } = req.body;

    try {
        const product = await Product.create({ name, technology, description, discount, price });
        responseTrait.responseSuccess(res, product, 'New Product Created Successfully !');
    } catch (err) {
        responseTrait.responseError(res, null, 'Error create product');
    }
};

exports.showProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } });
        if (product) {
            responseTrait.responseSuccess(res, product, 'Product Details Fetch Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Product Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.updateProduct = async (req, res) => {
    const { name, technology, description, discount, price } = req.body;

    try {
        const product = await Product.update({ name, technology, description, discount, price },{ where: { id: req.params.id } });
        if (product) {
            const productUpdate = await Product.findOne({ where: { id: req.params.id } });
            responseTrait.responseSuccess(res, productUpdate, 'Product Updated Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Product Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.deleteProduct= async (req, res) => {
    try {
        const product = await Product.destroy({ where: { id: req.params.id } });
        if (product) {
            responseTrait.responseSuccess(res, null, 'Product Deleted Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Product Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};