//26 oct 2024
import mongoose from "mongoose";
user: "UserId"
// products:[
//     {
//         id:"productId del producto que estamos comprando",
//         quantity: "cantidad del producto que estamos compranddo",
//     },
//     {
//         "id":"productId del producto que estamos comprando",
//         "quantity": "cantidad del producto que estamos comprando",
//     }
// ],
// [
//     {
//         coments:[
//             "comentId","commentId"
//         ],
//         totalPrice:"precio total"
//     }
// ]
// de alguna mane
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
        }
    ],
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "a product must be added"],
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    createedAt: {
        type: Date,
        default: Date.now,

    }
});

export const Order = mongoose.model("orders", orderSchema);