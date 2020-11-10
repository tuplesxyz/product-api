const { list, get } = require('./products');
const autoCatch = require('./lib/auto-catch');

async function listProducts(req, res) {

    const { offset = 0, limit = 25, tag } = req.query

        const listOfProducts = await list({
            offset: Number(offset),
            limit: Number(limit),
            tag
        });

        res.json(listOfProducts);

}

async function getProduct(req, res, next) {

    const { id } = req.params;

    const product = await get(id)
    if (!product) return next()

    res.json(product)
}

async function createProduct(req, res, next) {
    console.log(`request body:`, req.body)
    res.json(req.body)
}

async function editProduct(req, res, next) {
    // console.log(req.body)
    res.json(req.body)
}

async function deleteProduct(req, res, next) {
    res.json({ success: true })
}

module.exports = autoCatch({
    listProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
})