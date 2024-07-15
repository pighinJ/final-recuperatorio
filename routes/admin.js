const express = require('express');
const router = express.Router();
const {verProductos, mostrarAgregarProductos, enviarProducto, enviarProductoEditado, productoActual, eliminarProducto, mostrarEliminaProducto} = require('../controllers/admin');

//crud

router.route('/crud').get(verProductos)
router.route('/agregate').get(mostrarAgregarProductos);
router.route('/nuevoproducto').post(enviarProducto)

//Update 
router.route('/updateproducto/:id').post(enviarProductoEditado) //update


router.route('/productoactual/:id').get(productoActual)

//DELETE
router.route('/deleteproducto').get(mostrarEliminaProducto)
router.route('/delete/:id').post(eliminarProducto)

module.exports = router;





