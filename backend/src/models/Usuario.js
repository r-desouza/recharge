const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    password: String,
    fechaNacimiento: String,
    telefono: Number,
    correo: String,
    admin: Boolean
},
{
    timestamps: true
})


module.exports = model('Usuario', usuarioSchema)