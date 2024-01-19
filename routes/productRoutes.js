const express = require('express');
const router = express.Router();
const productController = require('../dao/controllers/productController');

const Product = require('../dao/models/product');

// Ruta para crear un producto
router.post('/pokemon', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productController.createProduct(productData);
        res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/pokemon', async (req,res)=>{
    const productos = await Product.find();
    res.json({
        productos:productos
    })
});





// Otras rutas relacionadas con usuarios u otros recursos si es necesario
module.exports = router;

