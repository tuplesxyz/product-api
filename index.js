const express = require('express');
const { listProducts, getProduct } = require('./api');
const { cors } = require('./middleware');
const port = process.env.PORT || 1337;
const app = express();

app.use(cors);

app.get('/products', listProducts);
app.get('/products/:id', getProduct);

app.listen(port,  () =>
    console.log(`Server listening on port ${port}`)
)

