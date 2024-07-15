
const Productos = require('../models/product');

const obtenerTodosLosProductos=async (req, res)=> {

    const products = await Productos.find();
    
    console.log('Todo bien, se realizo la busqueda')
    res.render('page/shop', {products: products})
    

}


const carritoDeCompras = async (req, res) => {
    console.log('Esta funcion muestra el carrito');

    const idReq = { _id: req.params.id };
    let products = await Productos.findOne(idReq)
        .then(product => {
            res.render('page/carrito', { product });
            console.log('El resultado es', product)
        })
        .catch(error => {
            console.log(error)
        })
        

}




//categorias

const buscarPorPan = async (req, res)=> {
    try{
        const productos = await Productos.find({categoria:'Pan'});
        res.status(200).json({productos, numProducts: products.length});

}catch(error){
    console.log('Error en la busqueda de categoria', error);
    res.status(500).json({error:'Error al obtener productos de la categoria ${categoria}'});
}
}

const buscarPorPasteles = async (req, res)=> {
    try{
        const productos = await Productos.find({categoria:'Pasteles'});
        res.status(200).json({productos, numProducts: products.length});

}catch(error){
    console.log('Error en la busqueda de categoria', error);
    res.status(500).json({error:'Error al obtener productos de la categoria ${categoria}'});
}
}
const buscarPorPanadería = async (req, res)=> {
    try{
        const productos = await Productos.find({categoria:'Panadería'});
        res.status(200).json({productos, numProducts: products.length});

}catch(error){
    console.log('Error en la busqueda de categoria', error);
    res.status(500).json({error:'Error al obtener productos de la categoria ${categoria}'});
}
}





module.exports= {
    
    obtenerTodosLosProductos,
    buscarPorPan,
    buscarPorPasteles,
    buscarPorPanadería,
    carritoDeCompras
    

}
