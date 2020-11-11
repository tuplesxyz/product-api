const { list, get, create, edit, remove } = require('./models/products');
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
    const product = await create(req.body);
    res.json(product)
}

async function editProduct(req, res, next) {
    const change = req.body
    const product = await edit(req.params.id, change)
    res.json(product)
}

async function deleteProduct(req, res, next) {
    await remove(req.params.id)
    res.json({ success: true })
}

async function createOrder(req, res, next) {
    const order = await Orders.create(req.body)
    res.json(order)
}

async function listOrders(req, res, next) {
    const { offset = 0, limit = 25, productId, status } = req.query
    const orders = await Orders.list({
        offset: Number(offset),
        limit: Number(limit),
        productId,
        status
    })
    res.json(orders)
}

module.exports = autoCatch({
    listProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    createOrder,
    listOrders
})