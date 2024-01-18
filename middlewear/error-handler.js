const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddlewear = (err, req, res, next) => {
    if( err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({status:"failure", msg:err.message})
}

module.exports = errorHandlerMiddlewear