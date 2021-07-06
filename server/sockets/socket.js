const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } =  require('../util/util');

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

        client.broadcast.emit( 'listaPersona', usuarios.getPeronas() );


        callback( personas );
    } );


    client.on( 'crearMensaje', (data) => {
        let persona = usuarios.getPesona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.emit( 'crearMensaje', mensaje );
    } );


    client.on('disconnect', () => {

        let personaBorrada =  usuarios.borrarPersona( client.id );

        client.broadcast.emit( 'crearMensaje', crearMensaje( personaBorrada.nombre, `${personaBorrada.nombre} a abandonado el chat` ) );

        client.broadcast.emit( 'listaPersona', usuarios.getPeronas() );

    });



    //mensajes privados
    cliente.on( 'mensajePrivado', data => {
        let persona = usuarios.getPesona( cliente.id );
        cliente.broadcast.emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
    });
    

});