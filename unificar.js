const connectDB = require('./config/connectDB');
const Productos = require('./models/product');
const productJson = require('./datos.json');


require('dotenv').config();

const iniciar = async () => {
    try {
        // Corrige la cadena de conexión para que comience con "mongodb://"
        await connectDB(process.env.MONGO_URL)

        await Productos.create(productJson)
        console.log('Se ejecutó el cambio');

    } catch (error) {
        console.log(error);
    }
};

iniciar();