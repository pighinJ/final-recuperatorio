const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/connectDB');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');






// Configuración de sesiones
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

// Configuración del motor de plantillas
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos y análisis de cuerpos de solicitud
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas principales
app.use('/productos', productsRouter);
app.use('/admin', adminRouter);

// Función para calcular el total del carrito
function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => total + producto.precio_oferta * producto.cantidad, 0);
}

// Ruta para mostrar el carrito
app.get('/productos/carrito', (req, res) => {
    const carrito = req.session.carrito || [];
    const total = calcularTotal(carrito);
    res.render('page/carrito', { carrito, total });
});

// Ruta para eliminar un producto del carrito
app.delete('/eliminar-producto/:id', (req, res) => {
    const productId = req.params.id;
    const carrito = req.session.carrito || [];

    // Filtrar el carrito para excluir el producto con el ID dado
    req.session.carrito = carrito.filter(producto => producto.id !== productId);
    res.sendStatus(204); // 204 indica éxito sin contenido
});

// Ruta para agregar un producto al carrito
app.post('/productos/carrito', (req, res) => {
    const { id, nombre_producto, descripcion, precio_oferta, imagen } = req.body;
    const nuevoProducto = { id, nombre_producto, descripcion, precio_oferta, imagen, cantidad: 1 };

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    const existingProductIndex = req.session.carrito.findIndex(product => product.id === id);
    if (existingProductIndex >= 0) {
        req.session.carrito[existingProductIndex].cantidad++;
    } else {
        req.session.carrito.push(nuevoProducto);
    }

    res.json({ success: true, carrito: req.session.carrito });
});

// Ruta para actualizar la cantidad de un producto en el carrito
app.put('/actualizar-cantidad/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const carrito = req.session.carrito || [];
    const producto = carrito.find(product => product.id === id);

    if (producto) {
        if (action === 'increase') {
            producto.cantidad++;
        } else if (action === 'decrease' && producto.cantidad > 1) {
            producto.cantidad--;
        }
        res.status(200).json({ message: 'Cantidad actualizada', carrito });
    } else {
        res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('page/home');
});

// Otras rutas estáticas
app.get('/about', (req, res) => {
    res.render('page/about');
});

app.get('/contact', (req, res) => {
    res.render('page/contact');
});

app.get('/login', (req, res) => {
    res.render('page/login', { error: null });
});

app.get('/register', (req, res) => {
    res.render('page/register');
});

// Ruta para la confirmación de compra
app.get('/confirmate', (req, res) => {
    res.render('page/confirmate');
});

// Ruta para procesar la confirmación de compra
app.post('/confirmate', (req, res) => {
    const carrito = req.session.carrito || [];
    const metodoPago = req.body.metodoPago;

    if (carrito.length > 0) {
        console.log(`Compra realizada con método de pago: ${metodoPago}`);
        req.session.carrito = []; // Vaciar el carrito después de la compra
        res.send('Compra realizada con éxito');
    } else {
        res.status(400).send('El carrito está vacío');
    }
});

// Rutas de autenticación
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // Lógica para registrar al usuario
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    // Lógica para iniciar sesión del usuario
    res.redirect('/');
});




//cart---------------------------------------------------------------









// Conectar a la base de datos y arrancar el servidor
const iniciar = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log('Servidor ejecutándose en el puerto', process.env.PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

iniciar();
