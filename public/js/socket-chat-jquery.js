
let param = new URLSearchParams( window.location.search );
const divUsuario = document.querySelector('#divUsuarios');
const divUsuarios = $( '#divUsuarios' );
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const nombre = param.get('nombre');
const sala = param.get('sala');
const divChatbox = $('divChatbox');

//referencias


const renderizarUsuarios = ( personas ) => {
    //..
    let html = '';

        html += `<li>`;
        html += `<a href="javascript:void(0)" class="active"> Chat de <span> ${param.get( 'sala' )}  </span></a>`;
        html += `</li>`;


    for( let i = 0; i < personas.length; i++  ){

        html += `<li>`;
        html += `<a data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${personas[i].nombre} <small class="text-success">online</small></span></a>`;
        html += `</li>`;

    }

    divUsuarios.html( html );

}


function renderizarMensaje( mensaje ){

    let html = '';

        html += `<li>`;
        html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`;
        html += `<li>`;
        html += ` <h5>${mensaje.nombre}</h5>`;
        html += ` <div class="box bg-light-info">${mensaje.mensaje}</div>`;
        html += ` </div>`;
        html += ` <div class="chat-time">10:56 am</div>`;
        html += ` </li>`;

    divChatbox.append(html);

}


// Listener

divUsuarios.on( 'click', 'a', function(){
    const id = $(this).data( 'id' );

    if( id ){
        console.log( id );
    }

} );


formEnviar.on( 'click', function(e){
    e.preventDefault();

    if( txtMensaje.val().trim().length === 0 ){
        return;
    }

    console.log( txtMensaje.val() );


// Enviar información
    socket.emit('crearMensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensaje( mensaje );
    });

} );