const jwt = require('jsonwebtoken');
//=============================
//Verificar Token
//=============================
let verificaToken =( req, res, next )=>{
 let token = req.get('Authorization'); //Autorizacion
          //verica el token
      jwt.verify(token, process.env.SEED,(err,decode)=>{
          if(err){
             return res.status(401).json({
                ok:false,  
                err:{
                    message:'Token invalido',
                }
              });
          }
        
         req.usuario = decode.usuario;
       next();
      });
};

//====================
//Verifica AdminRole
//====================
let verificaAdmin_Role = (req, res , next)=>{
let usuario = req.usuario;
    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }
    else{
        return res.json({
            ok:false,
            err:{
                message:'El usuario no es administrador ('+usuario.role+')'
            }
        })
    }
    
};
module.exports = {
    verificaToken,
    verificaAdmin_Role
};