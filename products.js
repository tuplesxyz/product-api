const fs = require('fs').promises
const path = require('path');

const productsFile = path.join(__dirname, 'products.json')

async function list(opts = {}) {
    const { offset = 0, limit = 25, tag } = opts

    const data = await fs.readFile(productsFile);
    return JSON.parse(data)
    .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
    .slice(offset, offset + limit)
}

async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))

    for (let i = 0; i < products.length; i++) {
        if (products[i]._id === id) return products[i]
    }

    return null
}

module.exports = {
    list,
    get
}