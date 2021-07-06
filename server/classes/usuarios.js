class Usuarios {

    constructor(){
        this.personas = [];
    }


    agregarPersona( id, nombre, sala ){

        let persona = { id, nombre, sala };

        this.personas.push( persona );

        return this.personas;
    }



    
    getPesona( id ){
        let persona = this.personas.filter( persona => {
            return persona.id === id }
        )[0];

        return persona;
    }


    getPeronas(){
        return this.personas;
    }

    getPersonasSalas(sala){
        //...
    }

    borrarPersona(id){

        let personaBorrada = this.getPesona(id)

        this.personas = this.personas.filter( persona => {
            return persona.id != id;
        } );

        return personaBorrada;
    }

}



module.exports = {
    Usuarios
}