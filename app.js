
const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors()); 



const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CONNECTION_URL = `mongodb+srv://mariano27:${DB_PASSWORD}@cluster0.vljuooz.mongodb.net/${DB_NAME}`;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });
    
    // Configuración de Rutas
    const userRoutes = require('./routes/userRoutes');
    const productRoutes = require ('./routes/productRoutes')
    app.use('/usuarios', userRoutes);
    app.use('/productos',productRoutes);


// Ruta de Bienvenida
app.get('/', (req, res) => {
    res.send('¡Hola, mundo hermoso!');
});

// Inicio del Servidor
app.listen(PORT, () => {
    console.log(`El servidor se está escuchando en el puerto http://localhost:${PORT}`);

});












