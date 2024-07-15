const express = require('express');
const router = express.Router();
const { obtenerTodosLosProductos, buscarPorPasteles, buscarPorPan, buscarPorPanadería, carritoDeCompras } = require('../controllers/products');


// Ruta para obtener todos los productos
router.route('/shop').get(obtenerTodosLosProductos);

// Ruta para agregar al carrito de compras
router.route('/carrito/:id').get(carritoDeCompras);
router.route('/carrito').get(carritoDeCompras);







// Rutas por categoría
router.route('/pan').get(buscarPorPan);
router.route('/pasteles').get(buscarPorPasteles);
router.route('/panadería').get(buscarPorPanadería);

module.exports = router;
