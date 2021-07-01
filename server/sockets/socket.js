const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    
    client.on( 'entrarChat', (data, callback ) => {

        if( !data.nombre ){
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }


        let personas = usuarios.agregarPersona( client.id, data.nombre);


        callback( personas );
    } );
    

});