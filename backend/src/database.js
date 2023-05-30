const mongoose = require('mongoose');

//connection chain 
const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://localhost/4000'

mongoose.connect(URI);

const connection = mongoose.connection;


connection.once('open', ()=> {
    console.log('la base de datos anda xd: ', URI);
})