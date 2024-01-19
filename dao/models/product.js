const mongoose = require('mongoose');
require ('dotenv').config();

const DB_NAME=process.env.DB_NAME
const DB_PASSWORD=process.env.DB_PASSWORD

const CONNECTION_URL = `mongodb+srv://mariano27:${DB_PASSWORD}@cluster0.vljuooz.mongodb.net/${DB_NAME}`;


mongoose.connect(CONNECTION_URL,
    {
        useNewUrlParser:true
    })

    //con lo que escribo abajo indico que la base de datos se va a llamar Products, fijarme que le agrega una "s" mongo, es decir lo pluraliza, si yo no quiero que lo pluralize tengo que poner en un tercer parametro Products , es decir despues de } agregar una coma y poner Products. Es decir ponemos el nombre de la coleccion nosotros por defecto
const Product = mongoose.model('Poquemon',{
    nombre : String,
    tipo: String,
    precio: Number,
    stock: Number,
    


})

module.exports= Product