const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

usuarioCtrl.getUsuario = async(req, res) =>{
    const usuarios = await Usuario.find()
    res.json(usuarios)
}

usuarioCtrl.createUsuario = async(req, res) =>{
    const {nombre, apellido, password, correo, telefono, fechaNacimiento, admin} = req.body;
    const newUsuario = new Usuario({
        nombre: nombre,
        apellido: apellido,
        password: password,
        correo: correo,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento,
        admin: admin
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
    const {nombre, apellido, password, correo, telefono, fechaNacimiento, admin} = req.body;
    await Usuario.findByIdAndUpdate(req.params.id, {
        nombre: nombre,
        apellido: apellido,
        password: password,
        correo: correo,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento,
        admin: admin
    })

    res.json({message: "200"})
}

module.exports = usuarioCtrl;