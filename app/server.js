import express from "express";
import { connectDB } from "./db/db.js";
import productRoutes from "./routes/product.router.js";
import userRoutes from "./routes/user.routes.js";
import configs from "./configs.js";
import authRoutes from "./routes/auth.router.js"
import logsRoutes from "./routes/logs.router.js"
import cors from "cors";
import orderRoutes from "./routes/order.router.js";

const app = express();

//MIDDLEWARE PARA PARSEAR JSON
app.use(express.json());
//configuracion MIDDLEWARE CORS para que acepte peticiones de cualquier origen
// es optimo para ambientes de produccion definir el origen especifico
app.use(cors())



connectDB();

app.use("/orders", orderRoutes)
app.use("/products", productRoutes);
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/logs", logsRoutes)//para acceder localhost 8080/logs
app.use("/orders", orderRoutes);
// app.listen(8080, () => {
//     console.log("Servidor escuchando en el puerto 8080");
// })
app.listen(configs.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${configs.PORT}`);
})