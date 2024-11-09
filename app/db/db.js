//importacon de mongoose
import mongoose from "mongoose"


//conexion a base de datos 
//connectDB se importa en server

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Hleg:Iddqd86@krugerbackendap.uz0a4.mongodb.net/places?retryWrites=true&w=majority&appName=KrugerBackendAP");
        console.log("conexion existos a la db")
    } catch (error) {
        console.error("error al conectar db", error);
    }
};