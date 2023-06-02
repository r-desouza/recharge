const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

usuarioCtrl.getUsuario = async(req, res) =>{
    const usuarios = await Usuario.find()
    res.json(usuarios)
}

usuarioCtrl.createUsuario = async(req, res) =>{
    const {nombre, apellido, correo, telefono, edad} = req.body;
    const newUsuario = new Usuario({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        edad: edad
    })
    await newUsuario.save();
    res.json({message: "200"})
}

usuarioCtrl.getUsuarioById = async(req, res) =>{
    const usuario = await Usuario.findById(req.params.id)
    res.json(usuario)
}

usuarioCtrl.deleteUsuario = async(req, res) =>{
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({message: "200"})
}

usuarioCtrl.updateUsuario = async(req, res) =>{
    const {nombre, apellido, correo, telefono, edad} = req.body;
    await Usuario.findByIdAndUpdate(req.params.id, {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        edad: edad
    })

    res.json({message: "200"})
}

module.exports = usuarioCtrl;