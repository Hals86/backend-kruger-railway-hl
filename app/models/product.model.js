//1.- Definir el *SCHEMA* (atributos de los documentos, los tipos de datos y validaciones )
//2.- Crear el modelo (clase) del producto

import mongoose from "mongoose";
//1.-
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A product must have a title"],
        unique: true,//no permite que exista un elemento con nombre duplicado.
    },

    description: {
        type: String,
        minlength: [5, "must have at least 5 charachters"],
        maxlength: [100, "must have max 100 charachters"]
    },

    price: {
        type: Number,
        require: [true, "A product must have a price"],
        min: [0, "price must be greater than 0"],
        max: [10000, "price must be max 10000"]

    },
    category: {
        type: String,
        require: [true, "Product must have a category"]

    }
});
//2.-
export const Product = mongoose.model("product", productSchema)