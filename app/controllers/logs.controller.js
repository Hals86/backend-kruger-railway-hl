import logger from "../utils/logger.js";

const testsLogs = async (req, res) => {
    try {
        logger.error("esto es un error");
        logger.info("esto es un info");
        logger.warn("esto es un warning");
        logger.debug("esto es un debug");
        //logger.verbose("esto es un verbose");
        //logger.silly("esto es un silly");

        res.send({ message: "Logs Test" })

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export { testsLogs };