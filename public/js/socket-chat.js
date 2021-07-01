const socket = io();
const params = new URLSearchParams( window.Location.search );


    if( !params.has('nombre') ){
        window.Location = 'index.html';
        throw new Error('El nombre es necesario');
    }


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit( 'entrarChat', {  usuario: 'Jesus' } );

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});