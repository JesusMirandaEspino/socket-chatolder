
let param = new URLSearchParams( window.location.search );
const divUsuario = document.querySelector('#divUsuarios');
const divUsuarios = $( '#divUsuarios' );

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