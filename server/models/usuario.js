//modelo de usuario
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator');
//validar roles "lista de roles"
let rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE','SUPER_ROLE'],
    message:'{VALUE} no es un rol válido'
}
//esquema de usuario para mongo
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        unique:true,
        type: String,
    },email:{
        type:String,
        unique:true,
        required:[true,'El correo es necesario'],
    },password:{
        type:String,
        required:[true,'La contraseña es necesaria'],
    },img:{
        type:String,
        required:false,
    },role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos,
    },estado:{
        type:Boolean,
        default:true,
    },google:{
        type:Boolean,
        default:false,
    }
});
//El metodo toJSON es el que se usa para imprimir el objeto que se guarda
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
  
}
//Validar en el esquema los campos unicos y enviar un mensaje amigable
usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe ser unico'});
module.exports = mongoose.model('Usuario',usuarioSchema);