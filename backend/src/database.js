const mongoose = require('mongoose');

//connection chain 
const URI = process.env.MONGODB_URI
             ? process.env.MONGODB_URI
             : 'mongodb://127.0.0.1:27017'

mongoose.connect(URI);

const connection = mongoose.connection;


connection.once('open', ()=> {
    console.log('la base de datos anda xd: ', URI);
})