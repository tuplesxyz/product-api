const express = require('express');
const { json } = require('body-parser')
const {
    setMiddleware,
    authenticate,
    login,
    ensureAdmin
} = require('./auth')
const {
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    editProduct,
    listOrders,
    createOrder
} = require('./api');

const { cors, notFound, handleError, handleValidationError } = require('./middleware');
const port = process.env.PORT || 1337;


const app = express();

app.use(cors);
app.use(json());
app.use(cookieParser());

setMiddleware(app)

app.post('/login', authenticate, login)

app.get('/products', listProducts);
app.get('/products/:id', getProduct);

app.post('/products', ensureAdmin, createProduct)
app.put('/products/:id', ensureAdmin, editProduct)
app.delete('/products/:id', ensureAdmin, deleteProduct)

app.get('/orders', ensureAdmin, listOrders)
app.post('/orders', ensureAdmin, createOrder)

app.use(handleValidationError)
app.use(handleError)
app.use(notFound)

app.listen(port,  () =>
    console.log(`Server listening on port ${port}`)
)

