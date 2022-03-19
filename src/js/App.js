import React from 'react';

class App extends React.Component{
    // Construtor
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <label for="formulario-resultado" class="formulario-label">Resultado:</label>
                <input id="formulario-resultado" type="text" class="formulario-resultado" disabled/>
                <label for="formulario-operacao" class="formulario-label">Operação:</label>
                <input id="formulario-operacao" type="text" class="formulario-operacao" disabled/>
                <form class="formulario-form">
                    <input id="formulario-7" type="button" value="7" class="formulario-button"/>
                    <input id="formulario-8" type="button" value="8" class="formulario-button"/>
                    <input id="formulario-9" type="button" value="9" class="formulario-button"/>
                    <input id="formulario-divisao" type="button" value="÷" class="formulario-button"/>
                    <input id="formulario-4" type="button" value="4" class="formulario-button"/>
                    <input id="formulario-5" type="button" value="5" class="formulario-button"/>
                    <input id="formulario-6" type="button" value="6" class="formulario-button"/>
                    <input id="formulario-multiplicacao" type="button" value="x" class="formulario-button"/>
                    <input id="formulario-1" type="button" value="1" class="formulario-button"/>
                    <input id="formulario-2" type="button" value="2" class="formulario-button"/>
                    <input id="formulario-3" type="button" value="3" class="formulario-button"/>
                    <input id="formulario-subtracao" type="button" value="-" class="formulario-button"/>
                    <input id="formulario-0" type="button" value="0" class="formulario-button"/>
                    <input id="formulario-ponto" type="button" value="." class="formulario-button"/>
                    <input id="formulario-igualdade" type="button" value="=" class="formulario-button"/>
                    <input id="formulario-soma" type="button" value="+" class="formulario-button"/>
                </form>
            </div>
        )
    }
}

export default App;