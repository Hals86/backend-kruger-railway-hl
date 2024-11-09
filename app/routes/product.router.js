import express, { Router } from "express";
import { getAllProducts, saveProduct, updateProduct, getProductById, deleteProductById, saveMultipleProducts, findProductsByFilter } from "../controllers/product.controller.js"
import autenticationMiddleware from "../middlewares/autentication.middleware.js";
import authorizationMIddleware from "../middlewares/authorization.middleware.js";


const router = express.Router();

router.use(autenticationMiddleware);// aplica el middleware de autenticacion a todas las rutas.

//vamos a definir que rol puede acceder a cada uno de los servicis

router.get("/", authorizationMIddleware(["admin", "author", "user"]), getAllProducts);// Solamente pueden acceder los usuarios que tengan el rol admin, author 
router.post("/", authorizationMIddleware(["admin", "author"]), saveProduct);//admin, author
router.put("/:id", authorizationMIddleware(["admin", "author"]), updateProduct);//admin, author
router.get("/by-filter", authorizationMIddleware(["admin", "author", "user"]), findProductsByFilter);// es una ruta estatica que se debe pasar antee de la dinamica getProductbyId
router.get("/:id", authorizationMIddleware(["admin", "author", "user"]), getProductById);
router.delete("/:id", authorizationMIddleware(["admin"]), deleteProductById);//acceso admin
router.post("/multipleproducts", saveMultipleProducts)
//definimos el primer servicio

export default router;
//router.post("/",autenticationMiddleware saveProduct); implementa de manera individual la autenticacion 