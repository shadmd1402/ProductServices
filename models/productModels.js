const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            reuired: [true, "Please enter product name" ] 
        },
        quantity: {
            type: String ,
            reuired: true,
            default: 0
        },
        price: {
            type: Number,
            requied: true,
        },
        image: {
            type: String,
            reuired: false
        }
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;