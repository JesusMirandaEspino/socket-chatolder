const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } =  require('../util/util');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    
    client.on( 'entrarChat', (data, callback ) => {

        if( !data.nombre  || !data.sala ){
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            });
        }

        client.join( data.sala );


        usuarios.agregarPersona( client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit( 'listaPersona', usuarios.getPersonasSalas( data.sala ) );

        client.broadcast.to(data.sala).emit( 'crearMensaje', crearMensaje( data.nombre, `${data.nombre} se unio al chat el chat` ) );
        callback( usuarios.getPersonasSalas( data.sala ) );
    } );


    client.on( 'crearMensaje', (data, callback) => {
        let persona = usuarios.getPesona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje );

        callback( mensaje );
    } );


    client.on('disconnect', () => {

        let personaBorrada =  usuarios.borrarPersona( client.id );

        client.broadcast.to(personaBorrada.sala).emit( 'crearMensaje', crearMensaje( personaBorrada.nombre, `${personaBorrada.nombre} a abandonado el chat` ) );

        client.broadcast.to(personaBorrada.sala).emit( 'listaPersona', usuarios.getPersonasSalas( personaBorrada.sala  ) );

    });



    //mensajes privados
    client.on( 'mensajePrivado', data => {
        let persona = usuarios.getPesona( cliente.id );
        cliente.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
    });
    

});