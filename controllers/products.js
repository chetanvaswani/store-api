const Product = require('../models/Product')

const getAllProducts = async (req, res, next) => {
    const products = await Product.find({})
    res.json({products: products})
}

const getAllProductsStatic = async (req, res, next) => {
    const products = await Product.find({featured:true})
    res.json({products: products, nbhits:products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}