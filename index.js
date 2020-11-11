const express = require('express');
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')

const {
    authenticate,
    login,
    ensureUser
} = require('./auth')
const {
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    editProduct,
    listOrders,
    createOrder,
    createUser
} = require('./api');

const { cors, notFound, handleError, handleValidationError } = require('./middleware');
const port = process.env.PORT || 1337;


const app = express();

app.use(cors);
app.use(json());
app.use(cookieParser());

app.post('/users', createUser)

app.post('/login', authenticate, login)

app.get('/products', listProducts);
app.get('/products/:id', getProduct);

app.post('/products', ensureUser, createProduct)
app.put('/products/:id', ensureUser, editProduct)
app.delete('/products/:id', ensureUser, deleteProduct)

app.get('/orders', ensureUser, listOrders)
app.post('/orders', ensureUser, createOrder)

app.use(handleValidationError)
app.use(handleError)
app.use(notFound)

app.listen(port,  () =>
    console.log(`Server listening on port ${port}`)
)

