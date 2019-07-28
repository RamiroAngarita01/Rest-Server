const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt =require('bcrypt');
const _ = require('underscore');
const  {verificaToken,verificaAdmin_Role} = require('../middlewares/autenticacion');
const app = express();

//Metodo get del objeto app expres
app.get('/usuario',[verificaToken,verificaAdmin_Role],(req, res)=> {

    let desde = req.query.desde || 0; //si no viene la variable que venga desde la pagina 1
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite= Number(limite);
   //->>Podemos agregar una condicion ejemplo {google:true} y agregarlo en el count
   Usuario.find({estado:true},'nombre email  estado google img') 
   .skip(desde)
   .limit(limite)
   .exec((err,usuarios)=>{
       if(err){
           return res.status(400).json({
               ok:false,
               err
           })
       }
       Usuario.countDocuments({estado:true},(err,conteo)=>{
           if(err)
           return res.status(400).json({
               ok:false,
               err
           })
        res.json({
            ok:true,
            usuarios,
            totalItems:conteo
        });
       })
      
   })
})
//Metodo post del objeto app expres
app.post('/usuario', verificaToken, (req, res)=> {
let body = req.body;

//creamos un objeto Usuario y le enviamnos la informacion del body
let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password,10),
    role: body.role,
});
//Guardamos el usuario en la db nos da dos respuestas un error en caso del mismo o
//el nos muestra el usuario enviado
        usuario.save((err,usuarioDB)=>{
         if(err){
          return res.status(400).json({
                 ok:false,
                 err
             });
         }
         res.json({usuario: usuarioDB});
        });
})
//Metodo put del objeto app expres
app.put('/usuario/:id', verificaToken, (req, res)=> {
    let id = req.params.id;
    //el metodo pick de underscore se usa para definir los campos que se quieren actualizar
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new:true, runValidators:true},(err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioDB,
        })
    })
 
}) 
//Metodo delete del objeto app expres
app.delete('/usuario/:id', verificaToken,(req,res)=>{
   let id = req.params.id;
//    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
//        if(err){
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };
//         //Validamos si el usuario o existe
//         if(!usuarioBorrado){
//             return res.status(400).json({
//                 ok:false,
//                 err:{
//                     message:'Usuario no existe en la db',
//                 }
//             })
//         }
//         res.json({
//             ok:true,
//             usuario:usuarioBorrado
//         })
//    })
//Desactivar usuario
    Usuario.findByIdAndUpdate(id,{estado:false},{new:true},(err,usuarioDesactivado)=>{
        if(err){
           return res.status(400).json({
            ok: false,
            err
        });
       }
       res.json({
           ok:true,
           usuario:usuarioDesactivado,
       })
    })
})
module.exports=app;
