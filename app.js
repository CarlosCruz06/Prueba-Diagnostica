require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelos
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    cantidadDisponible: Number
});

const PedidoSchema = new mongoose.Schema({
    productoId: mongoose.Schema.Types.ObjectId,
    cantidad: Number,
    fechaPedido: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', ProductoSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);

// Rutas

// GET - Obtener catálogo de productos
app.get('/api/catalogo', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener el catálogo:', error);
        res.status(500).send('Error al obtener el catálogo');
    }
});



// POST - Crear un pedido
app.post('/api/pedido', async (req, res) => {
    const { productoId, cantidad } = req.body;

    try {
        const producto = await Producto.findById(productoId);

        if (!producto || producto.cantidadDisponible < cantidad) {
            return res.status(400).send('Producto no disponible o cantidad insuficiente');
        }

        // Crear pedido
        const nuevoPedido = new Pedido({
            productoId: producto._id,
            cantidad: cantidad
        });

        // Actualizar stock
        producto.cantidadDisponible -= cantidad;
        await producto.save();
        await nuevoPedido.save();

        res.json({ mensaje: 'Pedido realizado con éxito' });
    } catch (error) {
        res.status(500).send('Error al realizar el pedido');
    }
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
