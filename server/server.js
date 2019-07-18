require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

//Conexion de mongoose
mongoose.connect(process.env.urlDB,{useNewUrlParser: true, useCreateIndex: true},(err,res)=>{
if(err)
 throw err,'Error de conexion';
console.log('Base de datos online');
});

//puerto donde se ejecuta el localhost
app.listen(process.env.PORT,()=>{
    console.log('Escuchando el puerto:',process.env.PORT);
})