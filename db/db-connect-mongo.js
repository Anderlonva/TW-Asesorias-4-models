const mongoose = require('mongoose')

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URL;

        await mongoose.connect(url);

        console.log("Conexion Exitosa");

    } catch (error) {
        console.log(error);
    }
}


module.exports = { getConnection }