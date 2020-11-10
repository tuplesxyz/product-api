const cuid = require('cuid')
const { isEmail } = require('validator')
const db = require('../db')

function emailSchema(opts = {}) {
    const { required } = opts
    return {
        type: String,
        required: !!required,
        validate: {
        validator: isEmail,
        message: props => `${props.value} is not a valid URL` }
    }
}

const Order = db.model('Order', {
    _id: { type: String, default: cuid },
    buyerEmail: emailSchema({ required: true }),
    products: [
        {
            type: String,
            ref: 'Product',
            index: true,
            required: true
        }
    ],
    status: {
        type: String,
        index: true,
        default: 'CREATED',
        enum: ['CREATED', 'PENDING', 'COMPLETED']
    }
})

async function get(_id) {
    const order = await Order.findById(_id)
        .populate('products')
        .exec()

    return order
}


async function create(fields) {
    const order = await new Order(fields).save()
    await order.populate('products').execPopulate()
    return order
}