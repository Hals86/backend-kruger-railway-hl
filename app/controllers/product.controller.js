import { Product } from "../models/product.model.js";
//GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);//retorna el listado de productos almacenado en la base de datos
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//SAVE PRODUCTS
const saveProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product)
    } catch (error) {
        res.status(400).send(error);
    }
};
//GET PRODUCT BY ID AND UPDATE REQUIRED PARAMS
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,//ejecuta las validaciones establecidas en el schema
        });

        if (!product) {
            return res.status(404).send({ message: "Product not found" });// se usa json cuando se envia datos, el .send para enviar cualquier cosa/ .end cuando ya finaliza la respuesta
        }
        res.json(product)
    } catch (error) {
        res.status(400).send(error);
    }

};
//GET (FIND) PRODUCT BY ID     
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id, req.body)
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.json(product)
    }

    catch (error) {

        res.status(404).send({ message: "Product not found" })
    }
};


//DELETE

const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);    //pide explicacion a gpt
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.json(product)
    } catch (error) {

        res.status(500).send(error);
    }
};
// SAVE MULTIPLE PRODUCTS
const saveMultipleProducts = async (req, res) => {
    try {
        const products = req.body;
        if (!Array.isArray(products)) {
            return res.status(400).send({ message: "Invalid request body. Expected an array of products." });
        }

        const savedProducts = await Product.insertMany(products);
        res.json(savedProducts);
    } catch (error) {
        res.status(400).send(error);
    }
};
//CONSULTA
//?price=500&sort=price&limit=10&page1
const findProductsByFilter = async (req, res) => {
    try {
        let queryObject = { ...req.query };
        // console.log(queryObject)//

        const withoutFields = ["page", "limit", "fields", "sort"];

        withoutFields.forEach((field) => delete queryObject[field])
        //vamos a remplazar los operadores por su sintaxis habitual para usarlos en la consulta
        //1 vamos a transformar el objetop a un string para poder remplazar los operadores.
        let stringQuery = JSON.stringify(queryObject)
        console.log(queryObject)
        stringQuery = stringQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        queryObject = JSON.parse(stringQuery)

        //"prrice,title"
        let sort = "";
        if (req.query.sort)
            sort = req.query.sort.split(",").join(" ");

        //el ordenamiento pued ser por ejemplo "price title"
        let selected = "";
        if (req.query.fields) {
            selected = req.query.fields.split(",").join(" ");
        }
        //Paginacion 
        //skip ->saltar elementos 
        //liimit ->es lacantidad de elementos que vamos a most por pagina 
        //quiero traer iinformacion de la primera pagina
        //page = 1, limit = 10 ---->skip (0) limit (10)
        //page = 2, limit = 10 ---->skip (10) limit (10)
        //page = 3, limit = 10 ---->skip (20) limit (10)
        //if
        //


        let limit = req.query.limit || 100;
        let page = req.query.page || 1;
        let skip = (page - 1) * limit // hace dinamico el comportamiento

        const products = await Product.find(queryObject) //first find then select finaly sort
            .select(selected)
            .sort(sort)
            .limit(limit)//allows limit for pagination
            .skip(skip)//defines nuber of items to be displayed
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export {
    getAllProducts, saveProduct, updateProduct, getProductById, deleteProductById, saveMultipleProducts
    , findProductsByFilter
};