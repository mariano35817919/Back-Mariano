const mongoose = require('mongoose');
require ('dotenv').config();

const DB_NAME=process.env.DB_NAME
const DB_PASSWORD=process.env.DB_PASSWORD

const CONNECTION_URL = `mongodb+srv://mariano27:${DB_PASSWORD}@cluster0.vljuooz.mongodb.net/${DB_NAME}`;


mongoose.connect(CONNECTION_URL,
    {
        useNewUrlParser:true
    })

    
const Product = mongoose.model('Poquemon',{
    nombre : String,
    tipo: String,
    precio: Number,
    stock: Number,
    


})

module.exports= Product