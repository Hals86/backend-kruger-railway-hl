import { User } from "../models/user.model.js";
import sendEmail from "../utils/email.js";
const saveUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const sendWelcomeEmail = async (req, res) => {
    try {

        //las lineas comentadas permiten enviar el
        // const { email, name } = req.body;

        // const options = {
        //     email,
        //     subject: "welcome",
        //     message: `Hello ${name},\n\nWelcome to our service! We're glad to have you.`,
        // }

        //await sendEmail(options); 
        await sendEmail(req.body)// en postman probar enviando los parametros de 
        res.json({ message: "sent succesfuly" })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};
//oct 25 2024
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        //trae usuarios
        const userId = req.params.id
        //encontrar y actualizar el usuario
        const result = await User.findByIdAndUpdate(userId,
            { deletedAt: Date.now() }, //usuario eliminado con (deletedAt) permite saber cuando fue borrado , al usar isDeleted solo rretorna un boleano de si se borro o no 
            { new: true } //documento actualizado
        );
        //verifica usuario fue  encontado
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        };
        res.status(200).json({ message: "user deleted" })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};
export { saveUser, sendWelcomeEmail, getAllUsers, deleteUser };