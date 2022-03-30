import React from 'react';

class App extends React.Component{
    // Construtor
    constructor(props){
        super(props);
        this.state = {
            valor: ['',''],// String que vai armazenar os valores de A ('' = não informado)
            resultado: '',// String que vai armazenar o resultado de cada cálculo ('' = não informado)
            operacao: '',// String que vai armazenar a sequência de operações solicitadas ('' = não informado)
            calculos: [],
            somar: [false],// Verificador de operação de soma (false = não solicitado, true = solicitado)
            subtrair: [false],// Verificador de operação de subtração (false = não solicitado, true = solicitado)
            multiplicar: [false],// Verificador de operação de multiplicação (false = não solicitado, true = solicitado)
            dividir: [false],// Verificador de operação de divisão (false = não solicitado, true = solicitado)
            pontos: false,// Verificador de this.state.ponto decimal (false = não solicitado, true = solicitado)
            ponto: [0,0],// Verificador de this.state.ponto decimal dos valores de A (0 =  não informado, 1 = adicionado sem número a direita dele, 2 = adicionado com número a direita dele)
            parenteses: false,
            parentese: [0],// Verificador de parentese (0 =  não informado, 1 = adicionado abrir parentese, 2 = adicionado fechar parentese)
        };
    }
    // Cálculos Matemáticos Executados Pela Calculadora
    calcular = () => {
        let operacoes = [];
        this.state.calculos.forEach(item => {
            operacoes.push(item);
        });
        const numero = (numero) => {
            return !isNaN(parseFloat(numero)) && isFinite(numero);
        };
        let valores = [];
        let operadores = [];
        let preferencia = [];
        let resultado = 0;
        while(operacoes.length){
            if(numero(operacoes[0])){
                valores.push(operacoes.shift());
            }
            else if((operacoes[0] === '+') || (operacoes[0] === '-')){
                operadores.push(operacoes.shift());
                preferencia.push(1);
            }
            else if((operacoes[0] === '*') || (operacoes[0] === '/')){
                operadores.push(operacoes.shift());
                preferencia.push(2);
            }
            else if(operacoes[0] === '('){
                while(operacoes.length){
                    if(numero(operacoes[0])){
                        valores.push(operacoes.shift());
                    }
                    else if((operacoes[0] === '+') || (operacoes[0] === '-')){
                        operadores.push(operacoes.shift());
                        preferencia.push(3);
                    }
                    else if((operacoes[0] === '*') || (operacoes[0] === '/')){
                        operadores.push(operacoes.shift());
                        preferencia.push(4);
                    }
                    else if(operacoes[0] === '('){
                        operacoes.shift();
                    }
                    else if(operacoes[0] === ')'){
                        operacoes.shift();
                        break;
                    }
                }
            }
        }
        while(valores.length){
            let valor = 0;
            let posicao = 0;
            preferencia.forEach((item, local) => {
                if(valor < parseInt(item)){
                    valor = parseInt(item);
                    posicao = parseInt(local);
                }
            });
            if(operadores[posicao] === '*'){
                if(valores[posicao + 1] !== undefined){
                    resultado = valores[posicao] * valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    if(valores.length > 1){
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else if(operadores[posicao] === '/'){
                if(valores[posicao + 1] !== undefined){
                    resultado = valores[posicao] / valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    if(valores.length > 1){
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else if(operadores[posicao] === '+'){
                if(valores[posicao + 1] !== undefined){
                    resultado = valores[posicao] + valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    if(valores.length > 1){
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else{
                if(valores[posicao + 1] !== undefined){
                    resultado = valores[posicao] - valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    if(valores.length > 1){
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
        }
        this.setState({resultado: resultado});
    };
    // Apagar o Último ou Todos os Valores e Operações Informadas
    apagar = (e) => {
        e.preventDefault();
        if(e.target.value === 'C'){
            this.setState({valor: ['','']});
            this.setState({resultado: ''});
            this.setState({operacao: ''});
            this.setState({calculos: []});
            this.setState({somar: [false]});
            this.setState({subtrair: [false]});
            this.setState({multiplicar: [false]});
            this.setState({dividir: [false]});
            this.setState({pontos: false});
            this.setState({ponto: [0,0]});
            this.setState({parenteses: false});
            this.setState({parentese: [0]});
        }
        else{
            let operacao =this.state.operacao;
            operacao.pop();
            this.setState({operacao: operacao});
        }
    };
    // Parenteses Para Informar a Ordem de Preferência das Operações
    parenteses = (e) => {
        e.preventDefault();

        if(e.target.value === '('){
            if(!(this.state.parentese[this.state.parentese.length - 1] === 1)){
                if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                    if(!this.state.valor[this.state.valor.length - 2]){
                        this.setState({parenteses: true});
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 1;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
                        this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        this.calcular();
                    }
                }
                else{
                    if(!this.state.valor[this.state.valor.length - 1]){
                        this.setState({parenteses: true});
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 1;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
                        this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        this.calcular();
                    }
                }
            }
        }
        else{
            if((this.state.parentese[this.state.parentese.length - 1] === 1)){
                if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                    if(this.state.valor[this.state.valor.length - 2] && !(this.state.valor[this.state.valor.length - 2] === '-') && !(this.state.valor[this.state.valor.length - 2] === '+') && !(this.state.ponto[this.state.ponto.length - 2] === 1)){
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 2;
                        parentese[parentese.length] = 0;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
                        this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        this.calcular();
                    }
                }
                else{
                    if(this.state.valor[this.state.valor.length - 1] && !(this.state.valor[this.state.valor.length - 1] === '-') && !(this.state.valor[this.state.valor.length - 1] === '+') && !(this.state.ponto[this.state.ponto.length - 1] === 1)){
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 2;
                        parentese[parentese.length] = 0;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
                        this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        this.calcular();
                    }
                }
            }
        }
    };
    // Valores Inteiros Informados
    valores = (e) => {
        e.preventDefault();

        if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
            /*
                Executa se uma das condições for satisfeita:
                se o valorA estiver vazio
                se o valorA for diferente de '0', '-0' e '+0'
                se o this.state.ponto decimal do valorA estiver adicionado
            */
            if(!this.state.valor[this.state.valor.length - 2] || (!(this.state.valor[this.state.valor.length - 2] === '0') && !(this.state.valor[this.state.valor.length - 2] === '-0') && !(this.state.valor[this.state.valor.length - 2] === '+0')) || (this.state.ponto[this.state.ponto.length - 2] > 0)){
                // Adiciona o valor informado ao valorA e na operação matemática exibida
                let valor = this.state.valor;
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState({valor: valor});
                if(this.state.calculos.length && (this.state.calculos[this.state.calculos.length - 1] !== '+') && (this.state.calculos[this.state.calculos.length - 1] !== '-') && (this.state.calculos[this.state.calculos.length - 1] !== '*') && (this.state.calculos[this.state.calculos.length - 1] !== '/') && (this.state.calculos[this.state.calculos.length - 1] !== '(') && (this.state.calculos[this.state.calculos.length - 1] !== ')')){
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseFloat(valor[valor.length - 2]);
                        this.setState({calculos: calculos});
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 2]);
                        this.setState({calculos: calculos});
                    }
                }
                else{
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valor[valor.length - 2]));
                        this.setState({calculos: calculos});
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valor[valor.length - 2]));
                        this.setState({calculos: calculos});
                    }
                }
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                // Executa se o this.state.ponto decimal do valorA estiver adicionado sem número a direita dele
                if(this.state.ponto[this.state.ponto.length - 2] === 1){
                    // Informa que o this.state.ponto decimal do valorA tem número a direita dele
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 2] = 2;
                    this.setState({ponto: ponto});
                }
            }
        }
        else{
            /*
                Executa se uma das condições for satisfeita:
                se o valorA estiver vazio
                se o valorA for diferente de '0', '-0' e '+0'
                se o this.state.ponto decimal do valorA estiver adicionado
            */
            if(!this.state.valor[this.state.valor.length - 1] || (!(this.state.valor[this.state.valor.length - 1] === '0') && !(this.state.valor[this.state.valor.length - 1] === '-0') && !(this.state.valor[this.state.valor.length - 1] === '+0')) || (this.state.ponto[this.state.ponto.length - 1] > 0)){
                // Adiciona o valor informado ao valorA e na operação matemática exibida
                let valor = this.state.valor;
                valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                this.setState({valor: valor});
                if(this.state.calculos.length && (this.state.calculos[this.state.calculos.length - 1] !== '+') && (this.state.calculos[this.state.calculos.length - 1] !== '-') && (this.state.calculos[this.state.calculos.length - 1] !== '*') && (this.state.calculos[this.state.calculos.length - 1] !== '/') && (this.state.calculos[this.state.calculos.length - 1] !== '(') && (this.state.calculos[this.state.calculos.length - 1] !== ')')){
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                        this.setState({calculos: calculos});
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                        this.setState({calculos: calculos});
                    }
                }
                else{
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valor[valor.length - 1]));
                        this.setState({calculos: calculos});
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valor[valor.length - 1]));
                        this.setState({calculos: calculos});
                    }
                }
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                // Executa se o this.state.ponto decimal do valorA estiver adicionado sem número a direita dele
                if(this.state.ponto[this.state.ponto.length - 1] === 1){
                    // Informa que o this.state.ponto decimal do valorA tem número a direita dele
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 1] = 2;
                    this.setState({ponto: ponto});
                }
            }
        }
    };
    // this.state.ponto Decimal Para Valores Float
    ponto = (e) => {
        e.preventDefault();

        if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA não estiver vazio
                se o valorA for diferente de '-' e '+'
            */
            if(this.state.valor[this.state.valor.length - 2] && !(this.state.valor[this.state.valor.length - 2] === '-') && !(this.state.valor[this.state.valor.length - 2] === '+')){
                // Executa se o this.state.ponto decimal do valorB não estiver adicionado
                if(!(this.state.ponto[this.state.ponto.length - 2] > 0)){
                    // Adiciona o valor informado ao valorB e na operação matemática exibida
                    let valor = this.state.valor;
                    valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                    this.setState({valor: valor});
                    let calculos = this.state.calculos;
                    calculos[calculos.length - 1] = valor[valor.length - 2];
                    this.setState({calculos: calculos});
                    this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                    // Informa que o this.state.ponto decimal do valorB foi adicionado sem número a direita dele
                    this.setState({pontos: true});
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 2] = 1;
                    this.setState({ponto: ponto});
                }
            }
        }
        else{
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA não estiver vazio
                se o valorA for diferente de '-' e '+'
            */
            if(this.state.valor[this.state.valor.length - 1] && !(this.state.valor[this.state.valor.length - 1] === '-') && !(this.state.valor[this.state.valor.length - 1] === '+')){
                // Executa se o this.state.ponto decimal do valorB não estiver adicionado
                if(!(this.state.ponto[this.state.ponto.length - 1] > 0)){
                    // Adiciona o valor informado ao valorB e na operação matemática exibida
                    let valor = this.state.valor;
                    valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                    this.setState({valor: valor});
                    let calculos = this.state.calculos;
                    calculos[calculos.length - 1] = valor[valor.length - 1];
                    this.setState({calculos: calculos});
                    this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                    // Informa que o this.state.ponto decimal do valorB foi adicionado sem número a direita dele
                    this.setState({pontos: true});
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 1] = 1;
                    this.setState({ponto: ponto});
                }
            }
        }
    };
    // Operações Matemáticas Exibibidas Pela Calculadora
    operacoes = (e) => {

        // Executa se a operação de soma for solicitada
        if(e.target.value === '+'){
            // Adiciona a soma na operação matemática exibida e informa que ela está ativa
            let somar = this.state.somar;
            somar[somar.length -1] = true;
            this.setState({somar: somar});
            let calculos = this.state.calculos;
            calculos.push(e.target.value);
            this.setState({calculos: calculos});
            this.setState((state) => ({operacao: state.operacao.concat(' ' + e.target.value + ' ')}));
            this.calcular();
        }
        // Executa se a operação de subtração for solicitada
        else if(e.target.value === '-'){
            // Adiciona a subtração na operação matemática exibida e informa que ela está ativa
            let subtrair = this.state.subtrair;
            subtrair[subtrair.length -1] = true;
            this.setState({subtrair: subtrair});
            let calculos = this.state.calculos;
            calculos.push(e.target.value);
            this.setState({calculos: calculos});
            this.setState((state) => ({operacao: state.operacao.concat(' ' + e.target.value + ' ')}));
            this.calcular();
        }
        // Executa se a operação de multiplicação for solicitada
        else if(e.target.value === '*'){
            // Adiciona a multiplicação na operação matemática exibida e informa que ela está ativa
            let multiplicar = this.state.multiplicar;
            multiplicar[multiplicar.length -1] = true;
            this.setState({multiplicar: multiplicar});
            let calculos = this.state.calculos;
            calculos.push(e.target.value);
            this.setState({calculos: calculos});
            this.setState((state) => ({operacao: state.operacao.concat(' ' + e.target.value + ' ')}));
            this.calcular();
        }
        // Executa se a operação de divisão for solicitada
        else if(e.target.value === '/'){
            // Adiciona a divisão na operação matemática exibida e informa que ela está ativa
            let dividir = this.state.dividir;
            dividir[dividir.length -1] = true;
            this.setState({dividir: dividir});
            let calculos = this.state.calculos;
            calculos.push(e.target.value);
            this.setState({calculos: calculos});
            this.setState((state) => ({operacao: state.operacao.concat(' ' + e.target.value + ' ')}));
            this.calcular();
        }
        // Executa se a operação de igualdade for solicitada
        else if(e.target.value === '='){
            // Executa se o valorB estiver vazio
            if(!this.state.valor[1]){
                // Adiciona o valorA ao resultado exibido
                this.setState((state) => ({resultado: state.valor[0]}));
            }
            else{
                this.calcular();
            }
            // Reinicia todos os valores e verificadores para o padrão, menos o resultado exibido
            this.setState({valor: ['','']});
            this.setState({operacoes: []});
            this.setState({operacao: ''});
            this.setState({calculos: []});
            this.setState({somar: [false]});
            this.setState({subtrair: [false]});
            this.setState({multiplicar: [false]});
            this.setState({dividir: [false]});
            this.setState({pontos: false});
            this.setState({ponto: [0,0]});
            this.setState({parenteses: false});
            this.setState({parentese: [0]});
        }
    };
    // Operadores Matemáticas Solicitados
    operadores = (e) => {
        e.preventDefault();

        if(this.state.pontos){
        /*
            Executa se todas as condições forem satisfeitas:
            se o valorA não estiver vazio
            se o valorA for diferente de '-' e '+'
        */
            if(this.state.valor[this.state.valor.length - 2] && !(this.state.valor[this.state.valor.length - 2] === '-') && !(this.state.valor[this.state.valor.length - 2] === '+')){
                /*
                    Executa se todas as condições forem satisfeitas:
                    se o valorB não estiver vazio
                    se o valorB for diferente de '-' e '+'
                */
                if(this.state.valor[this.state.valor.length - 1] && !(this.state.valor[this.state.valor.length - 1] === '-') && !(this.state.valor[this.state.valor.length - 1] === '+')){
                    // Verifica se o valorB não tem this.state.ponto decimal informado sem número a direita dele
                    if(!(this.state.ponto[this.state.ponto.length - 1] === 1)){
                        // Executa se a operação de soma foi solicitada anteriormente
                        if(this.state.somar[this.state.somar.length - 1]){
                            // Informa que a operação de soma foi executada e adiciona a operação seguinte
                            if(this.state.parentese[this.state.parentese.length - 1] )
                            this.setState((state) => ({valor: state.valor.concat('')}));
                            this.setState((state) => ({ponto: state.ponto.concat(0)}));
                            this.setState((state) => ({somar: state.somar.concat(false)}));
                            this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                            this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                            this.setState((state) => ({dividir: state.dividir.concat(false)}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de subtração foi solicitada anteriormente
                        else if(this.state.subtrair[this.state.subtrair.length - 1]){
                            // Informa que a operação de subtração foi executada e adiciona a operação seguinte
                            this.setState((state) => ({valor: state.valor.concat('')}));
                            this.setState((state) => ({ponto: state.ponto.concat(0)}));
                            this.setState((state) => ({somar: state.somar.concat(false)}));
                            this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                            this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                            this.setState((state) => ({dividir: state.dividir.concat(false)}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de multiplicação foi solicitada anteriormente
                        else if(this.state.multiplicar[this.state.multiplicar.length - 1]){
                            // Informa que a operação de multiplicação foi executada e adiciona a operação seguinte
                            this.setState((state) => ({valor: state.valor.concat('')}));
                            this.setState((state) => ({ponto: state.ponto.concat(0)}));
                            this.setState((state) => ({somar: state.somar.concat(false)}));
                            this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                            this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                            this.setState((state) => ({dividir: state.dividir.concat(false)}));
                            this.operacoes(e);
                        }
                        // Executa se a operação de divisão foi solicitada anteriormente
                        else if(this.state.dividir[this.state.dividir.length - 1] && ((parseFloat(this.state.valor[this.state.valor.length - 1]) > 0) || (parseFloat(this.state.valor[this.state.valor.length - 1]) < 0))){
                            // Informa que a operação de divisão foi executada e adiciona a operação seguinte
                            this.setState((state) => ({valor: state.valor.concat('')}));
                            this.setState((state) => ({ponto: state.ponto.concat(0)}));
                            this.setState((state) => ({somar: state.somar.concat(false)}));
                            this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                            this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                            this.setState((state) => ({dividir: state.dividir.concat(false)}));
                            this.operacoes(e);
                        }
                    }
                }
                // Executa se o valorB estiver vazio
                else if(!this.state.valor[this.state.valor.length - 1]){
                    /*
                        Executa se todas as condições forem satisfeitas:
                        se as operações de soma, subtração, multiplicação e divisão não tiverem sido solicitadas
                        se o this.state.ponto decimal do valorA não estiver adicionado sem número a direita dele
                    */
                    if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1] && !(this.state.ponto[this.state.ponto.length - 2] === 1)){
                        this.operacoes(e);
                    }
                    // Executa se a operação de soma ou subtração ou multiplicação ou divisão tiver sido solicitada
                    else if(this.state.somar[this.state.somar.length - 1] || this.state.subtrair[this.state.subtrair.length - 1] || this.state.multiplicar[this.state.multiplicar.length - 1] || this.state.dividir[this.state.dividir.length - 1]){
                        // Executa se o sinal negativo '-' ou positivo '+' tiver sido solicitado
                        if((e.target.value === '-') || (e.target.value === '+')){
                            // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorB
                            let valor = this.state.valor;
                            valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                            this.setState({valor: valor});
                            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        }
                    }
                }
            }
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA for diferente de '-', '+'
                se o sinal negativo '-' ou positivo '+' tiver sido solicitado
            */
            else if(!this.state.valor[this.state.valor.length - 2] && ((e.target.value === '-') || (e.target.value === '+'))){
                // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorA
                let valor = this.state.valor;
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState({valor: valor});
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
            }
        }
        else{
        /*
            Executa se todas as condições forem satisfeitas:
            se o valorA não estiver vazio
            se o valorA for diferente de '-' e '+'
        */
            if(this.state.valor[this.state.valor.length - 2] && !(this.state.valor[this.state.valor.length - 2] === '-') && !(this.state.valor[this.state.valor.length - 2] === '+')){
                /*
                    Executa se todas as condições forem satisfeitas:
                    se o valorB não estiver vazio
                    se o valorB for diferente de '-' e '+'
                */
                if(this.state.valor[this.state.valor.length - 1] && !(this.state.valor[this.state.valor.length - 1] === '-') && !(this.state.valor[this.state.valor.length - 1] === '+')){
                    // Executa se a operação de soma foi solicitada anteriormente
                    if(this.state.somar[this.state.somar.length - 1]){
                        // Informa que a operação de soma foi executada e adiciona a operação seguinte
                        this.setState((state) => ({valor: state.valor.concat('')}));
                        this.setState((state) => ({ponto: state.ponto.concat(0)}));
                        this.setState((state) => ({somar: state.somar.concat(false)}));
                        this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                        this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                        this.setState((state) => ({dividir: state.dividir.concat(false)}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de subtração foi solicitada anteriormente
                    else if(this.state.subtrair[this.state.subtrair.length - 1]){
                        // Informa que a operação de subtração foi executada e adiciona a operação seguinte
                        this.setState((state) => ({valor: state.valor.concat('')}));
                        this.setState((state) => ({ponto: state.ponto.concat(0)}));
                        this.setState((state) => ({somar: state.somar.concat(false)}));
                        this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                        this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                        this.setState((state) => ({dividir: state.dividir.concat(false)}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de multiplicação foi solicitada anteriormente
                    else if(this.state.multiplicar[this.state.multiplicar.length - 1]){
                        // Informa que a operação de multiplicação foi executada e adiciona a operação seguinte
                        this.setState((state) => ({valor: state.valor.concat('')}));
                        this.setState((state) => ({ponto: state.ponto.concat(0)}));
                        this.setState((state) => ({somar: state.somar.concat(false)}));
                        this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                        this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                        this.setState((state) => ({dividir: state.dividir.concat(false)}));
                        this.operacoes(e);
                    }
                    // Executa se a operação de divisão foi solicitada anteriormente
                    else if(this.state.dividir[this.state.dividir.length - 1] && ((parseInt(this.state.valor[this.state.valor.length - 1]) > 0) || (parseInt(this.state.valor[this.state.valor.length - 1]) < 0))){
                        // Informa que a operação de divisão foi executada e adiciona a operação seguinte
                        this.setState((state) => ({valor: state.valor.concat('')}));
                        this.setState((state) => ({ponto: state.ponto.concat(0)}));
                        this.setState((state) => ({somar: state.somar.concat(false)}));
                        this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
                        this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
                        this.setState((state) => ({dividir: state.dividir.concat(false)}));
                        this.operacoes(e);
                    }
                }
                // Executa se o valorB estiver vazio
                else if(!this.state.valor[this.state.valor.length - 1]){
                    /*
                        Executa se todas as condições forem satisfeitas:
                        se as operações de soma, subtração, multiplicação e divisão não tiverem sido solicitadas
                        se o this.state.ponto decimal do valorA não estiver adicionado sem número a direita dele
                    */
                    if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                        this.operacoes(e);
                    }
                    // Executa se a operação de soma ou subtração ou multiplicação ou divisão tiver sido solicitada
                    else if(this.state.somar[this.state.somar.length - 1] || this.state.subtrair[this.state.subtrair.length - 1] || this.state.multiplicar[this.state.multiplicar.length - 1] || this.state.dividir[this.state.dividir.length - 1]){
                        // Executa se o sinal negativo '-' ou positivo '+' tiver sido solicitado
                        if((e.target.value === '-') || (e.target.value === '+')){
                            // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorB
                            let valor = this.state.valor;
                            valor[valor.length - 1] = valor[valor.length - 1] + e.target.value;
                            this.setState({valor: valor});
                            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                        }
                    }
                }
            }
            /*
                Executa se todas as condições forem satisfeitas:
                se o valorA for diferente de '-', '+'
                se o sinal negativo '-' ou positivo '+' tiver sido solicitado
            */
            else if(!this.state.valor[this.state.valor.length - 2] && ((e.target.value === '-') || (e.target.value === '+'))){
                // Adiciona o sinal negativo '-' ou positivo '+' a operação exibida e ao valorA
                let valor = this.state.valor;
                valor[valor.length - 2] = valor[valor.length - 2] + e.target.value;
                this.setState({valor: valor});
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
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
                        <input type='button' value='/' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='4' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='5' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='6' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='*' className='formulario-button' onClick={this.operadores}/>
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