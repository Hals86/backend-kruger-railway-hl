import dotenv from "dotenv";

dotenv.config()

export default {
    PORT: process.env.PORT || 8080,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILTRAP_USER: process.env.MAILTRAP_USER,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
}