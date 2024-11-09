//26 oct 2024
import mongoose from "mongoose";


/*COMENTARIO ESTRUCTURA
>>{
    user:"1234"
    message"hola mundo"
    createdat: "2021-10-05t22:00.00.000z"
},
message: hola mundo
createdAt:"2021-10-05T22:00:00.000Z" 

*/

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});