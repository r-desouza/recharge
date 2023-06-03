const express = require('express')
const cors = require('cors')
const app = express();

//configuracion
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.get('/', (req, res)=>{
    res.send('Benvenuto')
})

// ruta api usuario

app.use('/api/usuarios', require('./routes/usuario'))

// ruta api recargas

app.use('/api/recargas', require('./routes/recarga'))


module.exports = app;

