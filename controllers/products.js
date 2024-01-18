const Product = require('../models/Product')

const getAllProducts = async (req, res, next) => {
    const products = await Product.find({})
    res.json({products: products})
}

const getAllProductsStatic = (req, res, next) => {
    res.json({products: "All Products Static"})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}