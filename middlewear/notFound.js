const notFound = (req, res, next) => {
    res.status(404).send('The URL you are searching for does not exists!')
}

module.exports = notFound