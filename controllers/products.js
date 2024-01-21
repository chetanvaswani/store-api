const Product = require('../models/Product')
const { options } = require('../routes/products')

const getAllProductsStatic = async (req, res, next) => {
    const products = await Product.find({})
    res.json({products: products, nbhits:products.length})
}

const getAllProducts = async (req, res, next) => {
    const {featured, name, sort, fields, numericFilters} = req.query
    let queryObject = {}

    // search
    if(name){
        queryObject.name = { $regex:name, $options:'i' }
    }
    if(featured){
        queryObject.featured =  featured === 'true' ? true : false
    }

    if(numericFilters){
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        // only aplicable on these numeric value not something like name
        let options = ['price', 'rating']
        console.log(filters)
        filters = filters.split(',').forEach((filter) => {
            let [field, operator, value] = filter.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operator] : Number(value)}
            }
        });
    }

    let result = Product.find(queryObject)
    console.log(queryObject)
    // sort
    if(sort){
        let sortList = sort.split(',').join(" ")
        result = result.sort(sortList)
    }

    // select
    if (fields){
        let fieldList = fields.split(',').join(" ")
        result = result.select(fieldList)
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10

    //skip
    result.skip((page-1)*(limit))

    //limit
    result = result.limit(limit)

    const products = await result
    res.json({products: products, nbhits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}