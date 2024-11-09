import winston from "winston";
import "winston-daily-rotate-file";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    //template string
    //vamos a reemplazar esto {"level":"error","message":"Esto es una error"}
    //por esto "2021-10-05" 10:00:00 [error]:esto es un error

    return `${timestamp}[${level.toUpperCase()}]:${message}`
});
//define los niveles con los que se va a trrabajar y los colores para cada nivel
const customLevelOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
    }
};

const fileTransport = new winston.transports.DailyRotateFile({
    dirname: "./logs",
    filename: "aplication-%DATE%.log",//aplication-2024-10-25, aplication-2024-10-26
    datePattern: "YYYY-MM-DD-HH-mm",

    //VAMOS A DEFINIR UNA POLITICA DE RETENCION DE ARCIVOS (OPTIMIZACION DE ESPACIOS).
    //vamos a comprimir los archivos que se esten usando
    zippedArchive: true,
    //vamos a definir el tamano maximom de los archivos como tope 20 o 25 m
    maxSize: "1m",// crea nuevos archivos  cuando llega a 1mb el archivo
    //vammos a defiir el numero maximo de archivosque vammos a tener dismpnibles
    //al llegar a este numero los archivos se van a eliminar.
    maxFiles: 3,//3 archivos
    frequency: "1m", //define los intervalos de tiempo en los que se generann los reportes recomendable (1 POR DIA )
    level: "debug"


})
//Vamos a crear nuestro logger
//Para esto tenemos que definir un transporte

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
            ),
        }),
        // new winston.transports.File({
        //     filename: 'logs/error.log',
        //     level: 'warning',

        // })
        fileTransport
    ],

});

// COmo registrar los eventos en consola

//loger.error("hola mundo esto es un error")
//logger.warn("hola mundo esto es un warn")
//loger.info("hola mundo con logger")
//loger.http("hola mundo con logger es un http")
//logger.verbose("hola mundo esto es un verbose")
//logger.debug("hola mundeo esto es un debug")
//logger.silly("hola mundo esto es un silly")


export default logger;