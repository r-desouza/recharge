const recargaCtrl = {}

const Recarga = require('../models/Recarga')

recargaCtrl.getRecarga = async(req, res) =>{
    const Recargas = await Recarga.find()
    res.json(Recargas)
}

recargaCtrl.createRecarga = async(req, res) =>{
    const {idComprador, montoRecarga, paisRecarga, companiaRecarga, estadoRecarga} = req.body;
    const newRecarga = new Recarga({
        idComprador: idComprador,
        montoRecarga: montoRecarga,
        paisRecarga: paisRecarga,
        companiaRecarga: companiaRecarga,
        estadoRecarga: estadoRecarga
    })
    await newRecarga.save();
    res.json({message: "200"})
}

recargaCtrl.getRecargaById = async(req, res) =>{
    const recarga = await Recarga.findById(req.params.id)
    res.json(recarga)
}

recargaCtrl.deleteRecarga = async(req, res) =>{
    await Recarga.findByIdAndDelete(req.params.id)
    res.json({message: "200"})
}

recargaCtrl.updateRecarga = async(req, res) =>{
    const {idComprador, montoRecarga, paisRecarga, companiaRecarga, estadoRecarga} = req.body;
    await Recarga.findByIdAndUpdate(req.params.id, {
        idComprador: idComprador,
        montoRecarga: montoRecarga,
        paisRecarga: paisRecarga,
        companiaRecarga: companiaRecarga,
        estadoRecarga: estadoRecarga
    })

    res.json({message: "200"})
}

module.exports = recargaCtrl;