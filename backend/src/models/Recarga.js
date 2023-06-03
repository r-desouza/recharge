const {Schema, model} = require('mongoose');

const recargaSchema = new Schema({
    idComprador: String,
    montoRecarga: Number,
    paisRecarga: String,
    companiaRecarga: String,
    estadoRecarga: String,

},
{
    timestamps: true
})


module.exports = model('Recarga', recargaSchema)