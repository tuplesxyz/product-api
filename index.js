const express = require('express');
const { json } = require('body-parser')
const {
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    editProduct,
    listOrders,
    createOrder
} = require('./api');
const { cors, notFound, handleError } = require('./middleware');
const port = process.env.PORT || 1337;
const app = express();

app.use(cors);
app.use(json());

app.get('/products', listProducts);
app.get('/products/:id', getProduct);

app.post('/products', createProduct)
app.put('/products/:id', editProduct)
app.delete('/products/:id', deleteProduct)

app.get('/orders', listOrders)
app.post('/orders', createOrder)

app.use(handleError)
app.use(notFound)

app.listen(port,  () =>
    console.log(`Server listening on port ${port}`)
)

