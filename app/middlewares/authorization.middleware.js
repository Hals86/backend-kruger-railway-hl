//Vamos a recibir como parametro los roles que puedan acceder a un servicio
const authorizationMIddleware = (roles) => {
    return (req, res, next) => {
        //Debemos obtener el rol del usuario que esta haciendo el request
        const userRole = req.user.role;

        // verificar si el rol del usuariio que esta haciendo el request tiene permitido acceder al servicio
        if (!roles.includes(userRole)) {//dentro de este arreglo se encuentra el rol user?

            return res.status(403).json({ message: "Access denied" })

        }

        next();
    };
};

export default authorizationMIddleware;