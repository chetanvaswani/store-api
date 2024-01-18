

class CustomAPIError extends Error{
    constructor (message, statusCode){
        super(message),
        this.statusCode = statusCode
    }
}

const createCustomAPIError = (mesage, statusCode) => {
    return new CustomAPIError(mesage, statusCode)
}

module.exports = {createCustomAPIError, CustomAPIError};