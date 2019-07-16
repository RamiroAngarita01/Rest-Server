require('./config/config');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Metodo get del objeto app expres
app.get('/usuario', function (req, res) {
    res.json('get usuario')
})
//Metodo post del objeto app expres
app.post('/usuario', function (req, res) {
let body = req.body;
    if(body.nombre == undefined){
        res.status(400).json({
            ok:false,
            message:'El nombre es requerido',
            
        })
    }else{
        res.json({
            "persona": body
            })
    }
  
})
//Metodo put del objeto app expres
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({id})
}) 
//Metodo delete del objeto app expres
app.delete('/usuario/:id',function(req,res){
    res.json('delete usuario')
})











//puerto donde se ejecuta el localhost
app.listen(process.env.PORT,()=>{
    console.log('Escuchando el puerto:',process.env.PORT);
})