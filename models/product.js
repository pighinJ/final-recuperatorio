const mongoose = require('mongoose');
const productosEsquema = new mongoose.Schema({
    nombre_producto: String,
      cantidad_stock:Number,
      descripcion: String,
      imagen: String,
      categoria: String,
      oferta: Boolean,
      precio_oferta: Number,
      precio: Number
      
});




const Productos = mongoose.model('Productos', productosEsquema)

module.exports = Productos;
