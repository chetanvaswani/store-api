// Third Party tools
require('dotenv').config()
require('express-async-errors')

// Middlewear
const errorHandlerMiddlewear = require('./middlewear/error-handler')
const notFoundMiddlewear = require('./middlewear/notFound')

// Database
const connectDB = require('./db/connect')

// app
const express = require('express')
const app = express()

// Routes
const Products = require('./routes/products')

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send('<h1>Store API version 1.0</h1> <a href="/api/v1/products">GoTo Products</a>')
})

app.use('/api/v1/products', Products)

app.use(errorHandlerMiddlewear)
app.use(notFoundMiddlewear)

const PORT = process.env.PORT | 8000

app.listen(PORT, async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log(`App is listening on port:${PORT}`)
    } catch (err) {
        console.log(err)
    }
})