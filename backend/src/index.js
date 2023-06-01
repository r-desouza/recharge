require('dotenv').config();

const app = require('./app');

require('./database');

//ejecucion del servidor

async function main(){
    await app.listen(app.get('port'))
    console.log(':v', app.get('port'));
}

main();