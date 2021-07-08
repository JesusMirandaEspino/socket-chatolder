const socket = io();
let params = new URLSearchParams( window.location.search );


    if( !params.has('nombre') || !params.has('sala') ){
        window.location = 'index.html';
        throw new Error('El nombre y sala  son necesarios');
    }


const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit( 'entrarChat',  usuario, ( resp ) => {
        renderizarUsuarios( resp );
    } );

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    //console.log('Servidor:', mensaje);
    renderizarMensaje( mensaje, false );


});



//Escuchar cambios en usuarios o cuando un usuario sale o entra
socket.on('listaPersona', function(personas) {

    renderizarUsuarios(personas);
});


//mensaje privado
socket.on('mensajePrivado', function(mensaje){
    console.log( 'mensaje privado', mensaje );
}
);
