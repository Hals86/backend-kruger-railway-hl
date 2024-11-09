import nodemailer from "nodemailer";
import configs from "../configs.js";
//En las options vamos a recibir el email a donde vamos a enviar el correo
//Vamos a recibir el  asunto del correo
//Vamos a recibir el mensaje del correo
//Options es un objeto que tiene las propiedades email, subject, message

const sendEmail = async (options) => {
    // VAmos a crear la integracion con el servicio de mailtrap
    const transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: configs.MAILTRAP_USER,
            pass: configs.MAILTRAP_PASSWORD,
        },
    });

    //Vamos a armar las opciones de envio de nuestro correo 

    const mailOptions = {
        from: "Kruger Backend <no-reply@demomailtrap.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
};

export default sendEmail