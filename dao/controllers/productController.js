const Product = require('../models/product');

const createProduct =async (product) => {
    try {
        const newProduct = new Product(product);
        await newProduct.save();
        console.log('Producto guardado:', newProduct);
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
}

module.exports = {
    createProduct,
    
};
