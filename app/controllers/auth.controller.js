import configs from "../configs.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import sendEmail from "../utils/email.js";
import crypto from "crypto"

const register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        //1 vamos a obtener las credenciales del request (username, password)
        const { username, password } = req.body
        //2Vamos a buscar el usuario en la base de datos si no existe vamos a retornar 404
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            //3 Vamos a compararr la contrasena que viene en el request con la contrasena hasheada que tenemos en la bdd

        }
        const passwordMatch = await user.comparePasswords(password)
        //4 si la contrasena no coincide vamos a retornar 401
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //5 si las contrasena coincide vamos a generar un token JWT y lo vamos a retornar en la respuesta

        const token = await jwt.sign(
            { user_id: user._id, role: user.role },//-> esta informacion contiene el token de acceso
            //el metodo sign lo que hace es firmar nuestro.jwt (token) la firma del token sirve para validar
            //que el token fue generado por nosotros y no por alguien más
            //El primer parrametro a enviar en el metodo es un objeto que contiene la informacion del usuario
            //wejnfiwoebeuhbr/20848-> informacion del usuario
            //const token = await jwt.sign(}, process)
            configs.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const forgotPassword = async (req, res) => {
    try {
        // 1 vamos a validar si el correo que esta enviando existe en la base de datos
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //2 vamos a generar un token unico que vamos a enviar al correo al usuario
        const reciveToken = user.generatePasswordToken();
        console.log(reciveToken)
        console.log(user)
        await user.save({ validateBeforeSave: false });
        //3 vamos a generar la url que vamos a enviar al correo al usuario
        //http://localhost:5173/reset-password/ksdncookskdmclkdmclknflc
        const resetUrl = `http://localhost:5173/reset-password/${reciveToken}`
        try {
            const message = `Para resetear el password accede al siguiente link ${resetUrl}`
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });
            res.json({ message: "email sent" });
        } catch (error) {
            console.log(error)
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined

            await user.save({ validateBeforeSave: false });
            res.status(500).json({ message: error.message });

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//21 oct 2024

const resetPassword = async (req, res) => {
    try {
        //1 vamos a obteener el token del request
        const { token } = req.params;
        //2 vamos a obtener la nueva password que ha configurado el usuatrio
        const { password } = req.body;
        //3 En la BDD tenemos el token pero esta hasheado y lo que llega en el request esta en texto plano 
        //vamos a hashear el token que llega en el rerquest para poderlo comparar con el token hasheado
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        //4 Vamos a buscar ese usuario  de acuerdo al token hasheado y ademas vamos a aplicar la condicion del tiempo
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }

        });
        console.log(user)
        console.log(token)
        // VALIDAR SI EL USUARIO EXISTE O NO 
        if (!user) {
            return res.status(400).json({ message: "Invalid reset token or expired token" });

        };

        //vamos a actualizar la password  del usuario
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()
        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });


    }

}
export { register, login, forgotPassword, resetPassword };