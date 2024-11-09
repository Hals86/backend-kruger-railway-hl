import jwt from "jsonwebtoken";
import configs from "../configs.js";
const autenticationMiddleware = (req, res, next) => {
    //vamos a obtener el JWT del header del request
    const authHeader = req.header("Authorization");

    //Vamos a validatr si esta llegando o no el JWT en el header y adicionalmente que el header inicie con la palabra bearer
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res
            .status(401).json({ message: "No hay token provided" });
    }

    //Vamos  a validar que el token de acceso sea valido
    try {
        //Berer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcxMDVjYjgzZDY1ZDU0ZGZkNzdiZjQ0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjkyOTIxMjEsImV4cCI6MTcyOTI5NTcyMX0._tLyxLVgvUwB7-EvLrV-lPf7BBUuj9ewyQf_zBLRSdU
        const token = authHeader.split(" ")[1];// (posicion 1 (Bearrer) posicion 2 ("eyJhbGci....."))
        console.log(token)

        //vamos a validarlo y decodificarlo
        const decoded = jwt.verify(token, configs.JWT_SECRET);
        console.log(decoded)
        //modificar o agregar atributo request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }

};

export default autenticationMiddleware;