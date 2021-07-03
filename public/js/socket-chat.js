const socket = io();
const params = new URLSearchParams( window.location.search );


    if( !params.has('nombre') ){
        window.location = 'index.html';
        throw new Error('El nombre es necesario');
    }


const usuario = {
    nombre: params.get('nombre')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit( 'entrarChat',  usuario, ( resp ) => {
        console.log( resp );
    } );

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

/*
// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
*/
// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);


});


socket.on('listaPersona', function(personas) {

    console.log('Servidor:', personas);


});

