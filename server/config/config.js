//========================
//Puerto
//========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conexion
let urlDB;
if ( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://strider:hcRDnmNa6zwTEVQb@cluster0-aw81m.mongodb.net/cafe';
}
process.env.urlDB = urlDB;
