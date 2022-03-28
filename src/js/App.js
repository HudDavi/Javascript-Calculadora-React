import React from 'react';

class App extends React.Component{
    // Construtor
    constructor(props){
        super(props);
        this.state = {
            valor: ['',''],// String que vai armazenar os valores de A ('' = não informado)
            resultado: '',// String que vai armazenar o resultado de cada cálculo ('' = não informado)
            operacoes: [],
            operacao: '',// String que vai armazenar a sequência de operações solicitadas ('' = não informado)
            somar: [false],// Verificador de operação de soma (false = não solicitado, true = solicitado)
            subtrair: [false],// Verificador de operação de subtração (false = não solicitado, true = solicitado)
            multiplicar: [false],// Verificador de operação de multiplicação (false = não solicitado, true = solicitado)
            dividir: [false],// Verificador de operação de divisão (false = não solicitado, true = solicitado)
            pontos: false,// Verificador de ponto decimal (false = não solicitado, true = solicitado)
            ponto: [0,0],// Verificador de ponto decimal dos valores de A (0 =  não informado, 1 = adicionado sem número a direita dele, 2 = adicionado com número a direita dele)
            parenteses: false,
            parentese: [0],// Verificador de parentese (0 =  não informado, 1 = adicionado abrir parentese, 2 = adicionado fechar parentese)
        };
    }
    // Cálculos Matemáticos Executados Pela Calculadora
    calcular = () => {
    };
    // Apagar o Último ou Todos os Valores e Operações Informadas
    apagar = (e) => {
        e.preventDefault();
        if(e.target.value === 'C'){
            this.setState((state, props) => ({valor: ['','']}));
            this.setState((state, props) => ({resultados: ['']}));
            this.setState((state, props) => ({resultado: ''}));
            this.setState((state, props) => ({operacao: ''}));
            this.setState((state, props) => ({somar: [false]}));
            this.setState((state, props) => ({subtrair: [false]}));
            this.setState((state, props) => ({multiplicar: [false]}));
            this.setState((state, props) => ({dividir: [false]}));
            this.setState((state, props) => ({pontos: false}));
            this.setState((state, props) => ({ponto: [0,0]}));
            this.setState((state, props) => ({parenteses: false}));
            this.setState((state, props) => ({parentese: [0]}));
        }
        else{
        }
    };
    // Parenteses Para Informar a Ordem de Preferência das Operações
    parenteses = (e) => {
        e.preventDefault();
        let valor = this.state.valor;
        let ponto = this.state.ponto;
        let somar = this.state.somar;
        let operacoes = this.state.operacoes;
        let subtrair = this.state.subtrair;
        let multiplicar = this.state.multiplicar;
        let dividir = this.state.dividir;
        let parentese = this.state.parentese;

        if(e.target.value === '('){
            if(!(parentese[parentese.length - 1] === 1)){
                if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1]){
                    if(!valor[valor.length - 2]){
                        parentese[parentese.length - 1] = 1;
                        this.setState((state, props) => ({parentese: parentese}));
                        this.setState((state, props) => ({parenteses: true}));
                        operacoes[operacoes.length] = '(';
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    }
                }
                else{
                    if(!valor[valor.length - 1]){
                        parentese[parentese.length - 1] = 1;
                        this.setState((state, props) => ({parentese: parentese}));
                        this.setState((state, props) => ({parenteses: true}));
                        operacoes[operacoes.length] = '(';
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    }
                }
            }
        }
        else{
            if((parentese[parentese.length - 1] === 1)){
                if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1]){
                    if(valor[valor.length - 2] && !(valor[valor.length - 2] === '-') && !(valor[valor.length - 2] === '+') && !(ponto[ponto.length - 2] === 1)){
                        parentese[parentese.length - 1] = 2;
                        parentese[parentese.length] = 0;
                        this.setState((state, props) => ({parentese: parentese}));
                        operacoes[operacoes.length] = ')';
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    }
                }
                else{
                    if(valor[valor.length - 1] && !(valor[valor.length - 1] === '-') && !(valor[valor.length - 1] === '+') && !(ponto[ponto.length - 1] === 1)){
                        parentese[parentese.length - 1] = 2;
                        parentese[parentese.length] = 0;
                        this.setState((state, props) => ({parentese: parentese}));
                        operacoes[operacoes.length] = ')';
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    }
                }
            }
        }
    };
    // Valores Inteiros Informados
    valores = (e) => {
        e.preventDefault();
        let valor = this.state.valor;
        let ponto = this.state.ponto;
        let somar = this.state.somar;
        let subtrair = this.state.subtrair;
        let multiplicar = this.state.multiplicar;
        let dividir = this.state.dividir;

        if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1]){
            /*
                Executa se uma das condições for satisfeita:
                se o valorA estiver vazio
                se o valorA for diferente de '0', '-0' e '+0'
                se o ponto decimal do valorA estiver adicionado
            */
            if(!valor[valor.length - 2] || (!(valor[valor.length - 2] === '0') && !(valor[valor.length - 2] === '-0') && !(valor[valor.length - 2] === '+0')) || (ponto[ponto.length - 2] > 0)){
                // Adiciona o valor informado ao valorA e na operação matemática exibida
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState((state, props) => ({valor: valor}));
                this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                // Executa se o ponto decimal do valorA estiver adicionado sem número a direita dele
                if(ponto[ponto.length - 2] === 1){
                    // Informa que o ponto decimal do valorA tem número a direita dele
                    ponto[ponto.length - 2] = 2;
                    this.setState((state, props) => ({ponto: ponto}));
                }
            }
        }
        else{
            /*
                Executa se uma das condições for satisfeita:
                se o valorA estiver vazio
                se o valorA for diferente de '0', '-0' e '+0'
                se o ponto decimal do valorA estiver adicionado
            */
            if(!valor[valor.length - 1] || (!(valor[valor.length - 1] === '0') && !(valor[valor.length - 1] === '-0') && !(valor[valor.length - 1] === '+0')) || (ponto[ponto.length - 1] > 0)){
                // Adiciona o valor informado ao valorA e na operação matemática exibida
                valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                this.setState((state, props) => ({valor: valor}));
                this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                // Executa se o ponto decimal do valorA estiver adicionado sem número a direita dele
                if(ponto[ponto.length - 1] === 1){
                    // Informa que o ponto decimal do valorA tem número a direita dele
                    ponto[ponto.length - 1] = 2;
                    this.setState((state, props) => ({ponto: ponto}));
                }
            }
        }
    };
    // Ponto Decimal Para Valores Float
    ponto = (e) => {
        e.preventDefault();
        let valor = this.state.valor;
        let ponto = this.state.ponto;
        let somar = this.state.somar;
        let subtrair = this.state.subtrair;
        let multiplicar = this.state.multiplicar;
        let dividir = this.state.dividir;

        if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1]){
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA não estiver vazio
                se o valorA for diferente de '-' e '+'
            */
            if(valor[valor.length - 2] && !(valor[valor.length - 2] === '-') && !(valor[valor.length - 2] === '+')){
                // Executa se o ponto decimal do valorB não estiver adicionado
                if(!(ponto[ponto.length - 2] > 0)){
                    // Adiciona o valor informado ao valorB e na operação matemática exibida
                    valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                    this.setState((state, props) => ({valor: valor}));
                    this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    // Informa que o ponto decimal do valorB foi adicionado sem número a direita dele
                    this.setState((state, props) => ({pontos: true}));
                    ponto[ponto.length - 2] = 1;
                    this.setState((state, props) => ({ponto: ponto}));
                }
            }
        }
        else{
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA não estiver vazio
                se o valorA for diferente de '-' e '+'
            */
            if(valor[valor.length - 1] && !(valor[valor.length - 1] === '-') && !(valor[valor.length - 1] === '+')){
                // Executa se o ponto decimal do valorB não estiver adicionado
                if(!(ponto[ponto.length - 1] > 0)){
                    // Adiciona o valor informado ao valorB e na operação matemática exibida
                    valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                    this.setState((state, props) => ({valor: valor}));
                    this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                    // Informa que o ponto decimal do valorB foi adicionado sem número a direita dele
                    this.setState((state, props) => ({pontos: true}));
                    ponto[ponto.length - 1] = 1;
                    this.setState((state, props) => ({ponto: ponto}));
                }
            }
        }
    };
    // Operações Matemáticas Exibibidas Pela Calculadora
    operacoes = (e) => {
        let valor = this.state.valor;
        let somar = this.state.somar;
        let subtrair = this.state.subtrair;
        let multiplicar = this.state.multiplicar;
        let dividir = this.state.dividir;
        // Executa se a operação de soma for solicitada
        if(e.target.value === '+'){
            // Adiciona a soma na operação matemática exibida e informa que ela está ativa
            somar[somar.length - 1] = true;
            this.setState((state, props) => ({operacao: this.state.operacao + ' ' + e.target.value + ' '}));
            this.setState((state, props) => ({somar: somar}));
        }
        // Executa se a operação de subtração for solicitada
        else if(e.target.value === '-'){
            // Adiciona a subtração na operação matemática exibida e informa que ela está ativa
            subtrair[subtrair.length - 1] = true;
            this.setState((state, props) => ({operacao: this.state.operacao + ' ' + e.target.value + ' '}));
            this.setState((state, props) => ({subtrair: subtrair}));
        }
        // Executa se a operação de multiplicação for solicitada
        else if(e.target.value === 'x'){
            // Adiciona a multiplicação na operação matemática exibida e informa que ela está ativa
            multiplicar[multiplicar.length - 1] = true;
            this.setState((state, props) => ({operacao: this.state.operacao + ' ' + e.target.value + ' '}));
            this.setState((state, props) => ({multiplicar: multiplicar}));
        }
        // Executa se a operação de divisão for solicitada
        else if(e.target.value === '÷'){
            // Adiciona a divisão na operação matemática exibida e informa que ela está ativa
            dividir[dividir.length - 1] = true;
            this.setState((state, props) => ({operacao: this.state.operacao + ' ' + e.target.value + ' '}));
            this.setState((state, props) => ({dividir: dividir}));
        }
        // Executa se a operação de igualdade for solicitada
        else if(e.target.value === '='){
            // Executa se o valorB estiver vazio
            if(!valor[1]){
                // Adiciona o valorA ao resultado exibido
                this.setState((state, props) => ({resultado: valor[0]}));
            }
            // Reinicia todos os valores e verificadores para o padrão, menos o resultado exibido
            this.setState((state, props) => ({valor: ['','']}));
            this.setState((state, props) => ({resultados: ['']}));
            this.setState((state, props) => ({operacao: ''}));
            this.setState((state, props) => ({somar: [false]}));
            this.setState((state, props) => ({subtrair: [false]}));
            this.setState((state, props) => ({multiplicar: [false]}));
            this.setState((state, props) => ({dividir: [false]}));
            this.setState((state, props) => ({pontos: false}));
            this.setState((state, props) => ({ponto: [0,0]}));
        }
        this.calcular();
    };
    // Operadores Matemáticas Solicitados
    operadores = (e) => {
        e.preventDefault();
        let valor = this.state.valor;
        let pontos = this.state.pontos;
        let ponto = this.state.ponto;
        let operacoes = this.state.operacoes;
        let somar = this.state.somar;
        let subtrair = this.state.subtrair;
        let multiplicar = this.state.multiplicar;
        let dividir = this.state.dividir;

        if(pontos){
        /*
            Executa se todas as condições forem satisfeitas:
            se o valorA não estiver vazio
            se o valorA for diferente de '-' e '+'
        */
            if(valor[valor.length - 2] && !(valor[valor.length - 2] === '-') && !(valor[valor.length - 2] === '+')){
                /*
                    Executa se todas as condições forem satisfeitas:
                    se o valorB não estiver vazio
                    se o valorB for diferente de '-' e '+'
                */
                if(valor[valor.length - 1] && !(valor[valor.length - 1] === '-') && !(valor[valor.length - 1] === '+')){
                    // Verifica se o valorB não tem ponto decimal informado sem número a direita dele
                    if(!(ponto[ponto.length - 1] === 1)){
                        // Executa se a operação de soma foi solicitada anteriormente
                        if(somar[somar.length - 1]){
                            // Informa que a operação de soma foi executada e adiciona a operação seguinte
                            operacoes[operacoes.length] = parseFloat(valor[valor.length - 1]);
                            operacoes[operacoes.length] = e.target.value;
                            this.setState((state, props) => ({operacoes: operacoes}));
                            valor[valor.length] = '';
                            ponto[ponto.length] = 0;
                            somar[somar.length] = false;
                            subtrair[subtrair.length] = false;
                            multiplicar[multiplicar.length] = false;
                            dividir[dividir.length] = false;
                            this.setState((state, props) => ({valor: valor}));
                            this.setState((state, props) => ({ponto: ponto}));
                            this.setState((state, props) => ({somar: somar}));
                            this.setState((state, props) => ({subtrair: subtrair}));
                            this.setState((state, props) => ({multiplicar: multiplicar}));
                            this.setState((state, props) => ({dividir: dividir}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de subtração foi solicitada anteriormente
                        else if(subtrair[subtrair.length - 1]){
                            // Informa que a operação de subtração foi executada e adiciona a operação seguinte
                            operacoes[operacoes.length] = parseFloat(valor[valor.length - 1]);
                            operacoes[operacoes.length] = e.target.value;
                            this.setState((state, props) => ({operacoes: operacoes}));
                            valor[valor.length] = '';
                            ponto[ponto.length] = 0;
                            somar[somar.length] = false;
                            subtrair[subtrair.length] = false;
                            multiplicar[multiplicar.length] = false;
                            dividir[dividir.length] = false;
                            this.setState((state, props) => ({valor: valor}));
                            this.setState((state, props) => ({ponto: ponto}));
                            this.setState((state, props) => ({somar: somar}));
                            this.setState((state, props) => ({subtrair: subtrair}));
                            this.setState((state, props) => ({multiplicar: multiplicar}));
                            this.setState((state, props) => ({dividir: dividir}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de multiplicação foi solicitada anteriormente
                        else if(multiplicar[multiplicar.length - 1]){
                            // Informa que a operação de multiplicação foi executada e adiciona a operação seguinte
                            operacoes[operacoes.length] = parseFloat(valor[valor.length - 1]);
                            operacoes[operacoes.length] = e.target.value;
                            this.setState((state, props) => ({operacoes: operacoes}));
                            valor[valor.length] = '';
                            ponto[ponto.length] = 0;
                            somar[somar.length] = false;
                            subtrair[subtrair.length] = false;
                            multiplicar[multiplicar.length] = false;
                            dividir[dividir.length] = false;
                            this.setState((state, props) => ({valor: valor}));
                            this.setState((state, props) => ({ponto: ponto}));
                            this.setState((state, props) => ({somar: somar}));
                            this.setState((state, props) => ({subtrair: subtrair}));
                            this.setState((state, props) => ({multiplicar: multiplicar}));
                            this.setState((state, props) => ({dividir: dividir}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de divisão foi solicitada anteriormente
                        else if(dividir[dividir.length - 1] && ((parseFloat(valor[valor.length - 1]) > 0) || (parseFloat(valor[valor.length - 1]) < 0))){
                            // Informa que a operação de divisão foi executada e adiciona a operação seguinte
                            operacoes[operacoes.length] = parseFloat(valor[valor.length - 1]);
                            operacoes[operacoes.length] = e.target.value;
                            this.setState((state, props) => ({operacoes: operacoes}));
                            valor[valor.length] = '';
                            ponto[ponto.length] = 0;
                            somar[somar.length] = false;
                            subtrair[subtrair.length] = false;
                            multiplicar[multiplicar.length] = false;
                            dividir[dividir.length] = false;
                            this.setState((state, props) => ({valor: valor}));
                            this.setState((state, props) => ({ponto: ponto}));
                            this.setState((state, props) => ({somar: somar}));
                            this.setState((state, props) => ({subtrair: subtrair}));
                            this.setState((state, props) => ({multiplicar: multiplicar}));
                            this.setState((state, props) => ({dividir: dividir}));
                            this.operacoes(e);
                        }
                    }
                }
                // Executa se o valorB estiver vazio
                else if(!valor[valor.length - 1]){
                    /*
                        Executa se todas as condições forem satisfeitas:
                        se as operações de soma, subtração, multiplicação e divisão não tiverem sido solicitadas
                        se o ponto decimal do valorA não estiver adicionado sem número a direita dele
                    */
                    if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1] && !(ponto[ponto.length - 2] === 1)){
                        operacoes[operacoes.length] = valor[valor.length - 2];
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de soma ou subtração ou multiplicação ou divisão tiver sido solicitada
                    else if(somar[somar.length - 1] || subtrair[subtrair.length - 1] || multiplicar[multiplicar.length - 1] || dividir[dividir.length - 1]){
                        // Executa se o sinal negativo '-' ou positivo '+' tiver sido solicitado
                        if((e.target.value === '-') || (e.target.value === '+')){
                            // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorB
                            this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                            valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                            this.setState((state, props) => ({valor: valor}));
                        }
                    }
                }
            }
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA for diferente de '-', '+'
                se o sinal negativo '-' ou positivo '+' tiver sido solicitado
            */
            else if(!valor[valor.length - 2] && ((e.target.value === '-') || (e.target.value === '+'))){
                // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorA
                this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState((state, props) => ({valor: valor}));
            }
        }
        else{
        /*
            Executa se todas as condições forem satisfeitas:
            se o valorA não estiver vazio
            se o valorA for diferente de '-' e '+'
        */
            if(valor[valor.length - 2] && !(valor[valor.length - 2] === '-') && !(valor[valor.length - 2] === '+')){
                /*
                    Executa se todas as condições forem satisfeitas:
                    se o valorB não estiver vazio
                    se o valorB for diferente de '-' e '+'
                */
                if(valor[valor.length - 1] && !(valor[valor.length - 1] === '-') && !(valor[valor.length - 1] === '+')){
                    // Executa se a operação de soma foi solicitada anteriormente
                    if(somar[somar.length - 1]){
                        // Informa que a operação de soma foi executada e adiciona a operação seguinte
                        operacoes[operacoes.length] = parseInt(valor[valor.length - 1]);
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        valor[valor.length] = '';
                        ponto[ponto.length] = 0;
                        somar[somar.length] = false;
                        subtrair[subtrair.length] = false;
                        multiplicar[multiplicar.length] = false;
                        dividir[dividir.length] = false;
                        this.setState((state, props) => ({valor: valor}));
                        this.setState((state, props) => ({ponto: ponto}));
                        this.setState((state, props) => ({somar: somar}));
                        this.setState((state, props) => ({subtrair: subtrair}));
                        this.setState((state, props) => ({multiplicar: multiplicar}));
                        this.setState((state, props) => ({dividir: dividir}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de subtração foi solicitada anteriormente
                    else if(subtrair[subtrair.length - 1]){
                        // Informa que a operação de subtração foi executada e adiciona a operação seguinte
                        operacoes[operacoes.length] = parseInt(valor[valor.length - 1]);
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        valor[valor.length] = '';
                        ponto[ponto.length] = 0;
                        somar[somar.length] = false;
                        subtrair[subtrair.length] = false;
                        multiplicar[multiplicar.length] = false;
                        dividir[dividir.length] = false;
                        this.setState((state, props) => ({valor: valor}));
                        this.setState((state, props) => ({ponto: ponto}));
                        this.setState((state, props) => ({somar: somar}));
                        this.setState((state, props) => ({subtrair: subtrair}));
                        this.setState((state, props) => ({multiplicar: multiplicar}));
                        this.setState((state, props) => ({dividir: dividir}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de multiplicação foi solicitada anteriormente
                    else if(multiplicar[multiplicar.length - 1]){
                        // Informa que a operação de multiplicação foi executada e adiciona a operação seguinte
                        operacoes[operacoes.length] = parseInt(valor[valor.length - 1]);
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        valor[valor.length] = '';
                        ponto[ponto.length] = 0;
                        somar[somar.length] = false;
                        subtrair[subtrair.length] = false;
                        multiplicar[multiplicar.length] = false;
                        dividir[dividir.length] = false;
                        this.setState((state, props) => ({valor: valor}));
                        this.setState((state, props) => ({ponto: ponto}));
                        this.setState((state, props) => ({somar: somar}));
                        this.setState((state, props) => ({subtrair: subtrair}));
                        this.setState((state, props) => ({multiplicar: multiplicar}));
                        this.setState((state, props) => ({dividir: dividir}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de divisão foi solicitada anteriormente
                    else if(dividir[dividir.length - 1] && ((parseInt(valor[valor.length - 1]) > 0) || (parseInt(valor[valor.length - 1]) < 0))){
                        // Informa que a operação de divisão foi executada e adiciona a operação seguinte
                        operacoes[operacoes.length] = parseInt(valor[valor.length - 1]);
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        valor[valor.length] = '';
                        ponto[ponto.length] = 0;
                        somar[somar.length] = false;
                        subtrair[subtrair.length] = false;
                        multiplicar[multiplicar.length] = false;
                        dividir[dividir.length] = false;
                        this.setState((state, props) => ({valor: valor}));
                        this.setState((state, props) => ({ponto: ponto}));
                        this.setState((state, props) => ({somar: somar}));
                        this.setState((state, props) => ({subtrair: subtrair}));
                        this.setState((state, props) => ({multiplicar: multiplicar}));
                        this.setState((state, props) => ({dividir: dividir}));
                        this.operacoes(e);
                    }
                }
                // Executa se o valorB estiver vazio
                else if(!valor[valor.length - 1]){
                    /*
                        Executa se todas as condições forem satisfeitas:
                        se as operações de soma, subtração, multiplicação e divisão não tiverem sido solicitadas
                        se o ponto decimal do valorA não estiver adicionado sem número a direita dele
                    */
                    if(!somar[somar.length - 1] && !subtrair[subtrair.length - 1] && !multiplicar[multiplicar.length - 1] && !dividir[dividir.length - 1]){
                        operacoes[operacoes.length] = valor[valor.length - 2];
                        operacoes[operacoes.length] = e.target.value;
                        this.setState((state, props) => ({operacoes: operacoes}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de soma ou subtração ou multiplicação ou divisão tiver sido solicitada
                    else if(somar[somar.length - 1] || subtrair[subtrair.length - 1] || multiplicar[multiplicar.length - 1] || dividir[dividir.length - 1]){
                        // Executa se o sinal negativo '-' ou positivo '+' tiver sido solicitado
                        if((e.target.value === '-') || (e.target.value === '+')){
                            // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorB
                            this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                            valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                            this.setState((state, props) => ({valor: valor}));
                        }
                    }
                }
            }
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA for diferente de '-', '+'
                se o sinal negativo '-' ou positivo '+' tiver sido solicitado
            */
            else if(!valor[valor.length - 2] && ((e.target.value === '-') || (e.target.value === '+'))){
                // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorA
                this.setState((state, props) => ({operacao: this.state.operacao + e.target.value}));
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState((state, props) => ({valor: valor}));
            }
        }
    };
    render(){
        return(
            <div>
                <div className='formulario'>
                    <textarea type='text' value={this.state.resultado} className='formulario-resultado' disabled></textarea>
                    <textarea type='text' value={this.state.operacao} className='formulario-operacao' disabled></textarea>
                    <form className='formulario-form'>
                        <input type='button' value='C' className='formulario-button' onClick={this.apagar}/>
                        <input type='button' value='CE' className='formulario-button' onClick={this.apagar}/>
                        <input type='button' value='(' className='formulario-button' onClick={this.parenteses}/>
                        <input type='button' value=')' className='formulario-button' onClick={this.parenteses}/>
                        <input type='button' value='7' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='8' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='9' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='÷' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='4' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='5' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='6' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='x' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='1' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='2' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='3' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='-' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='0' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='.' className='formulario-button' onClick={this.ponto}/>
                        <input type='button' value='=' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='+' className='formulario-button' onClick={this.operadores}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;