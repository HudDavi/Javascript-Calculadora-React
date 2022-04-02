import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valores: ['',''],// Vetor de strings que vai armazenar os valores ('' = não informado).
            resultado: '',// String que vai armazenar o resultado de cada cálculo ('' = não informado).
            operacao: '',// String que vai armazenar a sequência de operações solicitadas ('' = não informado).
            calculos: [],// Vetor que vai armazenar a sequência de cálculos.
            somar: [false],// Vetor que vai armazenar a sequência de operações de soma (false = não solicitado, true = solicitado).
            subtrair: [false],// Vetor que vai armazenar a sequência de operações de subtração (false = não solicitado, true = solicitado).
            multiplicar: [false],// Vetor que vai armazenar a sequência de operações de multiplicação (false = não solicitado, true = solicitado).
            dividir: [false],// Vetor que vai armazenar a sequência de operações de divisão (false = não solicitado, true = solicitado).
            pontos: false,// Informa se existe ponto decimal (false = não solicitado, true = solicitado).
            ponto: [0,0],// Vetor que vai armazenar o estado dos pontos decimais de cada valor inserido (0 =  não informado, 1 = adicionado sem número a direita dele, 2 = adicionado com número a direita dele).
            parenteses: false,// Informa se existe algum parêntese (false = não solicitado, true = solicitado).
            parentese: [0],// Vetor que vai armazenar o estado de cada parêntese inserido (0 =  não informado, 1 = adicionado abrir parêntese, 2 = adicionado fechar parêntese).
        };
    }
    // Cálculos Matemáticos Executados pela Calculadora.
    calcular = () => {
        // Cria uma cópia das operações solicitadas.
        let operacoes = [];
        this.state.calculos.forEach(item => {
            operacoes.push(item);
        });
        // Verifica se um determinado valor é numérico.
        const numero = (numero) => {
            return !isNaN(parseFloat(numero)) && isFinite(numero);
        };
        let valores = [];// Vetor que vai receber a sequência de valores numéricos.
        let operadores = [];// Vetor que vai receber a sequência de operadores matemáticos.
        let preferencia = [];// Vetor que vai receber a sequência de ordem de preferência das operações.
        let resultado = '';// Variável que vai receber o resultado dos cálculos.
        while(operacoes.length){
            // Executa até que toda a sequência de operações tenha terminado.
            if(numero(operacoes[0])){
                /*
                 * Se o valor for numério,
                 * atribui o valor ao vetor de valores e remove ele do vetor de operacões.
                 */
                valores.push(operacoes.shift());
            }
            else if((operacoes[0] === '+') || (operacoes[0] === '-')){
                /*
                 * Se o valor for soma ou subtração,
                 * atribui o valor ao vetor de operadores,
                 * remove ele do vetor de operacões e atribui o valor 1 ao vetor de preferência.
                 */
                operadores.push(operacoes.shift());
                preferencia.push(1);
            }
            else if((operacoes[0] === '*') || (operacoes[0] === '/')){
                /*
                 * Se o valor for multiplicação ou divisão,
                 * atribui o valor ao vetor de operadores,
                 * remove ele do vetor de operacões e atribui o valor 2 ao vetor de preferência.
                 */
                operadores.push(operacoes.shift());
                preferencia.push(2);
            }
            else if(operacoes[0] === '('){
                // Se o valor for abrir parêntese.
                while(operacoes.length){
                    // Executa até que toda a sequência de operações entre parênteses tenha terminado.
                    if(numero(operacoes[0])){
                        /*
                         * Se o valor for numério,
                         * atribui o valor ao vetor de valores e remove ele do vetor de operacões.
                         */
                        valores.push(operacoes.shift());
                    }
                    else if((operacoes[0] === '+') || (operacoes[0] === '-')){
                        /*
                         * Se o valor for soma ou subtração,
                         * atribui o valor ao vetor de operadores,
                         * remove ele do vetor de operacões e atribui o valor 3 ao vetor de preferência.
                         */
                        operadores.push(operacoes.shift());
                        preferencia.push(3);
                    }
                    else if((operacoes[0] === '*') || (operacoes[0] === '/')){
                        /*
                         * Se o valor for multiplicação ou divisão,
                         * atribui o valor ao vetor de operadores,
                         * remove ele do vetor de operacões e atribui o valor 4 ao vetor de preferência.
                         */
                        operadores.push(operacoes.shift());
                        preferencia.push(4);
                    }
                    else if(operacoes[0] === '('){
                        /*
                         * Se o valor for abrir parêntese,
                         * remove ele do vetor de operacões.
                         */
                        operacoes.shift();
                    }
                    else if(operacoes[0] === ')'){
                        /*
                         * Se o valor for fechar parêntese,
                         * remove ele do vetor de operacões e encerra a execução do loop.
                         */
                        operacoes.shift();
                        break;
                    }
                }
            }
        }
        while(valores.length){
            /*
             * Executa até que toda a sequência de valores tenha terminado,
             * armazena o valor e a posição do operador com maior preferência na operação.
             */
            let valor = 0;
            let posicao = 0;
            preferencia.forEach((item, local) => {
                if(valor < parseInt(item)){
                    valor = parseInt(item);
                    posicao = parseInt(local);
                }
            });
            if(operadores[posicao] === '*'){
                // Se o valor for multiplicação.
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se o valor numérico imediatamente a direita do operador não estiver vazio,
                     * executa o cálculo de múltiplicação entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador,
                     * remove os dois valores numéricos,
                     * remove o operador de multiplicação,
                     * remove a preferência do operador de multiplicação.
                     */
                    resultado = valores[posicao] * valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    // Se o valor numérico imediatamente a direita do operador estiver vazio.
                    if(valores.length > 1){
                        /*
                         * Se o número de valores numéricos for maior que 1,
                         * remove o último operador,
                         * remove a preferência do último operador.
                         */
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        /*
                         * Se o número de valores numéricos for igual a 1,
                         * atribui o valor numérico ao resultado,
                         * reseta o vetor de valores,
                         * remove o último operador,
                         * remove a preferência do último operador.
                         */
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else if(operadores[posicao] === '/'){
                // Se o valor for divisão.
                if((valores[posicao + 1] !== undefined) && ((valores[posicao + 1] < 0) || (valores[posicao + 1] > 0))){
                    /*
                     * Se o valor numérico imediatamente a direita do operador não estiver vazio,
                     * e se o valor numérico for menor ou maior que 0,
                     * executa o cálculo de divisão entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador,
                     * remove os dois valores numéricos,
                     * remove o operador de divisão,
                     * remove a preferência do operador de divisão.
                     */
                    resultado = valores[posicao] / valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else if(!(valores[posicao + 1] < 0) || (valores[posicao + 1] > 0)){
                    /*
                     * Se o valor numérico não for menor ou maior que 0,
                     * remove o último valor numérico,
                     * remove o operador de divisão,
                     * remove a preferência do operador de divisão.
                     */
                    valores.pop();
                    operadores.pop();
                    preferencia.pop();
                }
                else{
                    // Se o valor numérico imediatamente a direita do operador estiver vazio.
                    if(valores.length > 1){
                        /*
                         * Se o número de valores numéricos for maior que 1,
                         * remove o último operador de divisão,
                         * remove a preferência do último operador de divisão.
                         */
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        /*
                         * Se o número de valores numéricos for igual a 1,
                         * atribui o valor numérico ao resultado,
                         * reseta o vetor de valores,
                         * remove o último operador de divisão,
                         * remove a preferência do último operador de divisão.
                         */
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else if(operadores[posicao] === '+'){
                // Se o valor for soma.
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se o valor numérico imediatamente a direita do operador não estiver vazio,
                     * executa o cálculo de soma entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador,
                     * remove os dois valores numéricos,
                     * remove o operador de soma,
                     * remove a preferência do operador de soma.
                     */
                    resultado = valores[posicao] + valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    // Se o valor numérico imediatamente a direita do operador estiver vazio.
                    if(valores.length > 1){
                        /*
                         * Se o número de valores numéricos for maior que 1,
                         * remove o último operador de soma,
                         * remove a preferência do último operador de soma.
                         */
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        /*
                         * Se o número de valores numéricos for igual a 1,
                         * atribui o valor numérico ao resultado,
                         * reseta o vetor de valores,
                         * remove o último operador de soma,
                         * remove a preferência do último operador de soma.
                         */
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
            else{
                // Se o valor for subtração.
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se o valor numérico imediatamente a direita do operador não estiver vazio,
                     * executa o cálculo de subtração entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador,
                     * remove os dois valores numéricos,
                     * remove o operador de subtração,
                     * remove a preferência do operador de subtração.
                     */
                    resultado = valores[posicao] - valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    // Se o valor numérico imediatamente a direita do operador estiver vazio.
                    if(valores.length > 1){
                        /*
                         * Se o número de valores numéricos for maior que 1,
                         * remove o último operador de subtração,
                         * remove a preferência do último operador de subtração.
                         */
                        operadores.pop();
                        preferencia.pop();
                    }
                    else{
                        /*
                         * Se o número de valores numéricos for igual a 1,
                         * atribui o valor numérico ao resultado,
                         * reseta o vetor de valores,
                         * remove o último operador de subtração,
                         * remove a preferência do último operador de subtração.
                         */
                        resultado = valores[posicao];
                        valores = [];
                        operadores.pop();
                        preferencia.pop();
                    }
                }
            }
        }
        // Atribui o resultado do cálculo ao visor de resultado da calculadora.
        this.setState({resultado: resultado});
    };
    // Reseta Todos os States para o Padrão.
    resetar = () => {
        this.setState({valores: ['','']});
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
    };
    // Apaga o Último ou Todos os Valores Informados.
    apagar = (e) => {
        e.preventDefault();
        if(e.target.value === 'C'){
            // Se a opção de apagar tudo for solicitada, reseta todos os states para o padrão.
            this.resetar();
        }
        else if(e.target.value === 'CE'){
            // Se a opção de apagar o último valor for solicitada.
            if(this.state.operacao){
                // Se o valor da string de operações não for vazio.
                if(this.state.operacao[this.state.operacao.length - 1] === '+'){
                    /*
                     * Se o último valor for a operação de soma,
                     * remove a última operação de soma do vetor somar,
                     * modifica o status da última operação de soma do vetor somar para false,
                     * remove a última operação de soma da string de operações,
                     * remove a última operação de soma do vetor de calculos.
                     */
                    let somar = this.state.somar;
                    somar.pop();
                    somar[somar.length - 1] = false;
                    this.setState({somar: somar});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '-'){
                    /*
                     * Se o último valor for a operação de subtração,
                     * remove a última operação de subtração do vetor subtrair,
                     * modifica o status da última operação de subtração do vetor subtrair para false,
                     * remove a última operação de subtração da string de operações,
                     * remove a última operação de subtração do vetor de calculos.
                     */
                    let subtrair = this.state.subtrair;
                    subtrair.pop();
                    subtrair[subtrair.length - 1] = false;
                    this.setState({subtrair: subtrair});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '*'){
                    /*
                     * Se o último valor for a operação de multiplicação,
                     * remove a última operação de multiplicação do vetor multiplicar,
                     * modifica o status da última operação de multiplicação do vetor multiplicar para false,
                     * remove a última operação de multiplicação da string de operações,
                     * remove a última operação de multiplicação do vetor de calculos.
                     */
                    let multiplicar = this.state.multiplicar;
                    multiplicar.pop();
                    multiplicar[multiplicar.length - 1] = false;
                    this.setState({multiplicar: multiplicar});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '/'){
                    /*
                     * Se o último valor for a operação de divisão,
                     * remove a última operação de divisão do vetor dividir,
                     * modifica o status da última operação de divisão do vetor dividir para false,
                     * remove a última operação de divisão da string de operações,
                     * remove a última operação de divisão do vetor de calculos.
                     */
                    let dividir = this.state.dividir;
                    dividir.pop();
                    dividir[dividir.length - 1] = false;
                    this.setState({dividir: dividir});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '('){
                    if(this.state.parentese.length > 1){
                        /*
                         * Se o último valor for o abrir parêntese,
                         * Se a quantidade de parênteses for maior que 1,
                         * remove o último abrir parêntese do vetor parentese,
                         * remove o último abrir parêntese da string de operações,
                         * remove a último abrir parêntese do vetor de calculos.
                         */
                        let parentese = this.state.parentese;
                        parentese.pop();
                        this.setState({parentese: parentese});
                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                        this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                    }
                    else{
                        /*
                         * Se a quantidade de parênteses for igual a 1,
                         * modifica o status dos parênteses para false,
                         * modifica o status do último parêntese para 0,
                         * remove o último abrir parêntese da string de operações,
                         * remove a último abrir parêntese do vetor de calculos.
                         */
                        this.setState({parenteses: false});
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 0;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                        this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                        if(!this.state.operacao){
                            // Se o vetor de operações estiver vazio, reseta todos os states para o padrão.
                            this.resetar();
                        }
                    }
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === ')'){
                    /*
                     * Se o último valor for o fechar parêntese,
                     * modifica o status do último parêntese para 1,
                     * remove o último fechar parêntese da string de operações,
                     * remove a último fechar parêntese do vetor de calculos.
                     */
                    let parentese = this.state.parentese;
                    parentese[parentese.length - 1] = 1;
                    this.setState({parentese: parentese});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '.'){
                    // Se o último valor for o ponto decimal.
                    if(this.state.ponto.length > 1){
                        /*
                         * Se a quantidade de pontos decimais for maior que 1,
                         * modifica o status do último ponto decimal para 0.
                         */
                        let ponto = this.state.ponto;
                        ponto[ponto.length - 1] = 0;
                        this.setState({ponto: ponto});
                        if(this.state.valores.length > 2){
                            // Se a quantidade de valores numéricos do vetor de valores for maior que 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1]){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio,
                                     * modifica o último valor numérico do vetor de cálculos do tipo float,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    /*
                                     * Se o último valor numérico estiver vazio,
                                     * remove o último valor numérico do vetor de valores,
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    valores.pop();
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            // Se a quantidade de valores numéricos for igual a 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1]){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio,
                                     * modifica o último valor numérico do vetor de cálculos do tipo float,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    /*
                                     * Se o último valor numérico do vetor de valores estiver vazio,
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                // Se o último valor numérico do vetor de valores estiver vazio.
                                if(this.state.valores[this.state.valores.length - 2]){
                                    /*
                                     * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                     * remove o último caractere do penúltimo valor numérico.
                                     */
                                    let valores = this.state.valores;
                                    valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                    if(valores[valores.length - 2]){
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                         * modifica o último valor numérico do vetor de cálculos do tipo float,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseFloat(valores[valores.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores estiver vazio,
                                         * remove o último valor numérico do vetor de cálculos,
                                         * remove o último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                }
                            }
                        }
                    }
                    else{
                        /*
                         * Se a quantidade de pontos decimais for igual a 1,
                         * modifica o status dos pontos decimais para false,
                         * modifica o status do último ponto decimal para 0.
                         */
                        this.setState({pontos: false});
                        let ponto = this.state.ponto;
                        ponto[ponto.length - 1] = 0;
                        this.setState({ponto: ponto});
                        if(this.state.valores.length > 2){
                            // Se a quantidade de valores numéricos do vetor de valores for maior que 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1]){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio,
                                     * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    /*
                                     * Se o último valor numérico do vetor de valores estiver vazio,
                                     * remove o último valor numérico do vetor de valores,
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    valores.pop();
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            // Se a quantidade de valores numéricos do vetor de valores for igual a 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1]){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio,
                                     * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    /*
                                     * Se o penúltimo valor numérico do vetor de valores estiver vazio,
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                // Se o último valor numérico do vetor de valores estiver vazio.
                                if(this.state.valores[this.state.valores.length - 2]){
                                    /*
                                     * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                     * remove o último caractere do penúltimo valor numérico do vetor de valores.
                                     */
                                    let valores = this.state.valores;
                                    valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                    if(valores[valores.length - 2]){
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                         * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseInt(valores[valores.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores estiver vazio,
                                         * remove o último valor numérico do vetor de cálculos,
                                         * remove o último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                }
                            }
                        }
                    }
                }
                else if((this.state.operacao[this.state.operacao.length - 1] !== '') && (this.state.operacao[this.state.operacao.length - 1] !== ' ') && (this.state.operacao[this.state.operacao.length - 1] !== undefined)){
                    // Se o valor não for vazio, espaço e nem undefined, avalia como numérico.
                    if(this.state.pontos){
                        // Se não estiver vazio ponto decimal.
                        if(this.state.valores.length > 2){
                            // Se a quantidade de valores numéricos do vetor de valores for maior que 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio e for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo float,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico estiver do vetor de valores vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                /*
                                 * Se o último valor numérico do vetor de valores estiver vazio,
                                 * remove o último valor numérico do vetor de valores,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores.pop();
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio e for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo float,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico do vetor de valores estiver vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            // Se a quantidade de valores numéricos do vetor de valores for igual a 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio e for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo float,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico do vetor de valores estiver vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                // Se o último valor numérico do vetor de valores estiver vazio.
                                if(this.state.valores[this.state.valores.length - 2]){
                                    /*
                                     * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                     * remove o último caractere do penúltimo valor numérico do vetor de valores.
                                     */
                                    let valores = this.state.valores;
                                    valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                    if(valores[valores.length - 2] && (valores[valores.length - 2] !== '-')){
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio e for diferente do sinal de menos,
                                         * modifica o último valor numérico do vetor de cálculos do tipo float,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseFloat(valores[valores.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        // Se o penúltimo valor numérico do vetor de valores estiver vazio.
                                        if(valores[valores.length - 2] === '-'){
                                            /*
                                            * Se o penúltimo valor numérico do vetor de valores for igual ao sinal de menos,
                                            * remove o último caractere do penúltimo valor numérico do vetor de valores,
                                            * remove o último caractere do último valor numérico da string de operações.
                                            */
                                            valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        /*
                                         * remove o último valor numérico do vetor de cálculos,
                                         * remove o último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    if(!this.state.operacao){
                                        // Se o vetor de operações estiver vazio, reseta todos os states para o padrão.
                                        this.resetar();
                                    }
                                }
                            }
                        }
                    }
                    else{
                        // Se não estiver vazio ponto decimal.
                        if(this.state.valores.length > 2){
                            // Se a quantidade de valores numéricos do vetor de valores for maior que 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio e for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico do vetor de valores estiver vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                /*
                                 * Se o último valor numérico do vetor de valores estiver vazio,
                                 * remove o último valor numérico do vetor de valores,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores.pop();
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico não estiver vazio e for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico do vetor de valores estiver vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            // Se a quantidade de valores numéricos do vetor de valores for igual a 2.
                            if(this.state.valores[this.state.valores.length - 1]){
                                /*
                                 * Se o último valor numérico do vetor de valores não estiver vazio,
                                 * remove o último caractere do último valor numérico do vetor de valores.
                                 */
                                let valores = this.state.valores;
                                valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                if(valores[valores.length - 1] && (valores[valores.length - 1] !== '-')){
                                    /*
                                     * Se o último valor numérico do vetor de valores não estiver vazio,
                                     * e se o último valor numérico do vetor de valores for diferente do sinal de menos,
                                     * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                     * remove o último caractere do último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    // Se o último valor numérico do vetor de valores estiver vazio ou for igual ao sinal de menos.
                                    if(valores.length > 2){
                                        // Se a quantidade de valores do vetor de valores for maior que 2.
                                        if(valores[valores.length - 1] === '-'){
                                            /*
                                             * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                             * remove o último valor numérico da string de operações.
                                             */
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        // Remove o último valor numérico do vetor de valores.
                                        valores.pop();
                                    }
                                    else if(valores[valores.length - 1] === '-'){
                                        /*
                                         * Se o último valor numérico do vetor de valores for igual ao sinal de menos,
                                         * remove o último caractere do último valor numérico do vetor de valores,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        valores[valores.length - 1] = valores[valores.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    /*
                                     * remove o último valor numérico do vetor de cálculos,
                                     * remove o último valor numérico da string de operações.
                                     */
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valores: valores});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                // Se o último valor numérico do vetor de valores estiver vazio.
                                if(this.state.valores[this.state.valores.length - 2]){
                                    /*
                                     * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                     * remove o último caractere do penúltimo valor numérico do vetor de valores.
                                     */
                                    let valores = this.state.valores;
                                    valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                    if(valores[valores.length - 2] && (valores[valores.length - 2] !== '-')){
                                        /*
                                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                                         * e se o penúltimo valor numérico do vetor de valores for diferente do sinal de menos,
                                         * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                                         * remove o último caractere do último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseInt(valores[valores.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        // Se o penúltimo valor numérico do vetor de valores estiver vazio.
                                        if(valores[valores.length - 2] === '-'){
                                            /*
                                            * Se o penúltimo valor numérico do vetor de valores for igual ao sinal de menos,
                                            * remove o último caractere do penúltimo valor numérico do vetor de valores,
                                            * remove o último caractere do último valor numérico da string de operações.
                                            */
                                            valores[valores.length - 2] = valores[valores.length - 2].slice(0, -1);
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        /*
                                         * remove o último valor numérico do vetor de cálculos,
                                         * remove o último valor numérico da string de operações.
                                         */
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valores: valores});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    if(!this.state.operacao){
                                        // Se o vetor de operações estiver vazio, reseta todos os states para o padrão.
                                        this.resetar();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                // Se o vetor de operações estiver vazio, reseta todos os states para o padrão.
                this.resetar();
            }
        }
        // Executa a função calcular para refazer os cálculos e exibir o resultado.
        this.calcular();
    };
    // Insere Parenteses para Operações com Preferência.
    parenteses = (e) => {
        e.preventDefault();
        if(e.target.value === '('){
            // Se o valor informado for abrir parêntese.
            if((this.state.parentese[this.state.parentese.length - 1] !== 1)){
                // Se o último status do vetor parêntese for igual a 1.
                if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                    // Se o último status dos vetores somar, subtrair, multiplicar e dividir for false.
                    if(!this.state.valores[this.state.valores.length - 2]){
                        /*
                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                         * modifica o status dos parênteses para true,
                         * modifica o status do último parêntese para 1,
                         * concatena o abrir parêntese com o valor atual do vetor de cálculos,
                         * concatena o abrir parêntese com o valor atual da string de operações,
                         * executa a função calcular para refazer os cálculos e exibir o resultado.
                         */
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
                    // Se o último status dos vetores somar ou subtrair ou multiplicar ou dividir for true.
                    if(!this.state.valores[this.state.valores.length - 1]){
                        /*
                         * Se o último valor numérico do vetor de valores não estiver vazio,
                         * modifica o status dos parênteses para true,
                         * modifica o status do último parêntese para 1,
                         * concatena o abrir parêntese com o valor atual do vetor de cálculos,
                         * concatena o abrir parêntese com o valor atual da string de operações,
                         * executa a função calcular para refazer os cálculos e exibir o resultado.
                         */
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
        else if(e.target.value === ')'){
            // Se o valor informado for fechar parêntese.
            if((this.state.parentese[this.state.parentese.length - 1] === 1)){
                // Se o último status do vetor parêntese for igual a 1.
                if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                    // Se o último status dos vetores somar, subtrair, multiplicar e dividir for false.
                    if(this.state.valores[this.state.valores.length - 2] && (this.state.valores[this.state.valores.length - 2] !== '-') && (this.state.ponto[this.state.ponto.length - 2] !== 1)){
                        /*
                         * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                         * e se o penúltimo valor numérico do vetor de valores for diferente do sinal de menos,
                         * e se o penúltimo valor numérico do vetor de valores caso seja float não esteja sem número a direita do ponto decimal,
                         * modifica o status dos parênteses para true,
                         * modifica o status do último parêntese para 2,
                         * modifica o status do próximo parêntese para 0,
                         * concatena o fechar parêntese com o valor atual do vetor de cálculos,
                         * concatena o fechar parêntese com o valor atual da string de operações,
                         * executa a função calcular para refazer os cálculos e exibir o resultado.
                         */
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
                    // Se o último status dos vetores somar ou subtrair ou multiplicar ou dividir for true.
                    if(this.state.valores[this.state.valores.length - 1] && (this.state.valores[this.state.valores.length - 1] !== '-') && (this.state.ponto[this.state.ponto.length - 1] !== 1)){
                        /*
                         * Se o último valor numérico do vetor de valores não estiver vazio,
                         * e se o último valor numérico do vetor de valores for diferente do sinal de menos,
                         * e se o último valor numérico do vetor de valores caso seja float não esteja sem número a direita do ponto decimal,
                         * modifica o status dos parênteses para true,
                         * modifica o status do último parêntese para 2,
                         * modifica o status do próximo parêntese para 0,
                         * concatena o fechar parêntese com o valor atual do vetor de cálculos,
                         * concatena o fechar parêntese com o valor atual da string de operações,
                         * executa a função calcular para refazer os cálculos e exibir o resultado.
                         */
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
    // Muda o Sinal do Último Valor Informado.
    sinal = (e) => {
        e.preventDefault();
        // Verifica se um determinado valor é numérico.
        const numero = (numero) => {
            return !isNaN(parseFloat(numero)) && isFinite(numero);
        };
        if(numero(this.state.calculos[this.state.calculos.length - 1])){
            // Se o último valor do vetor de cálculos for numérico.
            if(this.state.valores[this.state.valores.length - 1] && (this.state.ponto[this.state.ponto.length - 1] !== 1)){
                /*
                 * Se o último valor numérico do vetor de valores não estiver vazio,
                 * e se o último valor numérico do vetor de valores caso seja float não esteja sem número a direita do ponto decimal,
                 * modifica o sinal do último valor numérico do vetor de cálculos,
                 * modifica o sinal do último valor numérico do vetor de valores,
                 * modifica o sinal do último valor numérico da string de operações,
                 * executa a função calcular para refazer os cálculos e exibir o resultado.
                 */
                let calculos = this.state.calculos;
                calculos[calculos.length - 1] = calculos[calculos.length - 1] * -1;
                let valores = this.state.valores;
                valores[valores.length - 1] = (calculos[calculos.length - 1]).toString();
                this.setState({valores: valores});
                this.setState({calculos: calculos});
                let operacao = '';
                calculos.forEach(item => {
                    operacao = operacao + (item).toString();
                });
                this.setState({operacao: operacao});
                this.calcular();
            }
            else if(this.state.valores[this.state.valores.length - 2] && (this.state.ponto[this.state.ponto.length - 2] !== 1)){
                /*
                 * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                 * e se o penúltimo valor numérico do vetor de valores caso seja float não esteja sem número a direita do ponto decimal,
                 * modifica o sinal do último valor numérico do vetor de cálculos,
                 * modifica o sinal do penúltimo valor numérico do vetor de valores,
                 * modifica o sinal do último valor numérico da string de operações,
                 * executa a função calcular para refazer os cálculos e exibir o resultado.
                 */
                let calculos = this.state.calculos;
                calculos[calculos.length - 1] = calculos[calculos.length - 1] * -1;
                let valores = this.state.valores;
                valores[valores.length - 2] = (calculos[calculos.length - 1]).toString();
                this.setState({calculos: calculos});
                let operacao = '';
                calculos.forEach(item => {
                    operacao = operacao + (item).toString();
                });
                this.setState({operacao: operacao});
                this.calcular();
            }
        }
    };
    // Valores Numéricos Informados.
    valores = (e) => {
        e.preventDefault();
        if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
            // Se o último status dos vetores somar, subtrair, multiplicar e dividir for false.
            if(!this.state.valores[this.state.valores.length - 2] || ((this.state.valores[this.state.valores.length - 2] !== '0') && (this.state.valores[this.state.valores.length - 2] !== '-0')) || (this.state.ponto[this.state.ponto.length - 2] > 0)){
                /*
                 * Se o penúltimo valor numérico do vetor de valores estiver vazio,
                 * ou se o penúltimo valor numérico do vetor de valores for diferente de '0' e '-0',
                 * ou se o status do penúltimo ponto decimal for maior que 0,
                 * concatena o valor numérico informado com o penúltimo valor numérico do vetor de valores.
                 */
                let valores = this.state.valores;
                valores[valores.length - 2] = valores[valores.length - 2] + e.target.value;
                this.setState({valores: valores});
                if(this.state.calculos.length && (this.state.calculos[this.state.calculos.length - 1] !== '+') && (this.state.calculos[this.state.calculos.length - 1] !== '-') && (this.state.calculos[this.state.calculos.length - 1] !== '*') && (this.state.calculos[this.state.calculos.length - 1] !== '/') && (this.state.calculos[this.state.calculos.length - 1] !== '(') && (this.state.calculos[this.state.calculos.length - 1] !== ')')){
                    /*
                    * Se o vetor de cálculos não estiver vazio,
                    * e se o último valor do vetor de cálculos for diferente de '+', '-', '*', '/', '(' e ')'.
                    */
                    if(this.state.pontos){
                        /*
                        * Se o status dos pontos decimais for true,
                        * modifica o último valor numérico do vetor de cálculos do tipo float,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseFloat(valores[valores.length - 2]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        /*
                        * Se o status dos pontos decimais for false,
                        * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valores[valores.length - 2]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                else{
                    /*
                    * Se o vetor de cálculos estiver vazio,
                    * ou se o último valor do vetor de cálculos for igual '+' ou '-' ou '*' ou '/' ou '(' ou ')'.
                    */
                    if(this.state.pontos){
                        /*
                        * Se o status dos pontos decimais for true,
                        * adiciona o valor numérico ao vetor de cálculos do tipo float,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valores[valores.length - 2]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        /*
                        * Se o status dos pontos decimais for false,
                        * adiciona o valor numérico ao vetor de cálculos do tipo inteiro,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valores[valores.length - 2]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                // Concatena o valor numérico informado com o valor do vetor de operações.
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                if(this.state.ponto[this.state.ponto.length - 2] === 1){
                    /*
                    * Se o status do penúltimo ponto decimal for igual a 1,
                    * modifica o status do penúltimo ponto decimal para 2.
                    */
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 2] = 2;
                    this.setState({ponto: ponto});
                }
            }
        }
        else{
            // Se o último status dos vetores somar ou subtrair ou multiplicar ou dividir for true.
            if(!this.state.valores[this.state.valores.length - 1] || ((this.state.valores[this.state.valores.length - 1] !== '0') && (this.state.valores[this.state.valores.length - 1] !== '-0')) || (this.state.ponto[this.state.ponto.length - 1] > 0)){
                /*
                 * Se o último valor numérico do vetor de valores estiver vazio,
                 * ou se o último valor numérico do vetor de valores for diferente de '0' e '-0',
                 * ou se o status do último ponto decimal for maior que 0,
                 * concatena o valor numérico informado com o último valor numérico do vetor de valores.
                 */
                let valores = this.state.valores;
                valores[valores.length - 1] = valores[valores.length - 1] + e.target.value;
                this.setState({valores: valores});
                if(this.state.calculos.length && (this.state.calculos[this.state.calculos.length - 1] !== '+') && (this.state.calculos[this.state.calculos.length - 1] !== '-') && (this.state.calculos[this.state.calculos.length - 1] !== '*') && (this.state.calculos[this.state.calculos.length - 1] !== '/') && (this.state.calculos[this.state.calculos.length - 1] !== '(') && (this.state.calculos[this.state.calculos.length - 1] !== ')')){
                    /*
                    * Se o vetor de cálculos não estiver vazio,
                    * e se o último valor do vetor de cálculos for diferente de '+', '-', '*', '/', '(' e ')'.
                    */
                    if(this.state.pontos){
                        /*
                        * Se o status dos pontos decimais for true,
                        * modifica o último valor numérico do vetor de cálculos do tipo float,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseFloat(valores[valores.length - 1]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        /*
                        * Se o status dos pontos decimais for false,
                        * modifica o último valor numérico do vetor de cálculos do tipo inteiro,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valores[valores.length - 1]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                else{
                    /*
                    * Se o vetor de cálculos estiver vazio,
                    * ou se o último valor do vetor de cálculos for igual '+' ou '-' ou '*' ou '/' ou '(' ou ')'.
                    */
                    if(this.state.pontos){
                        /*
                        * Se o status dos pontos decimais for true,
                        * adiciona o valor numérico ao vetor de cálculos do tipo float,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valores[valores.length - 1]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        /*
                        * Se o status dos pontos decimais for false,
                        * adiciona o valor numérico ao vetor de cálculos do tipo inteiro,
                        * executa a função calcular para refazer os cálculos e exibir o resultado.
                        */
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valores[valores.length - 1]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                // Concatena o valor numérico informado com o valor do vetor de operações.
                this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                if(this.state.ponto[this.state.ponto.length - 1] === 1){
                    /*
                    * Se o status do último ponto decimal for igual a 1,
                    * modifica o status do último ponto decimal para 2.
                    */
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 1] = 2;
                    this.setState({ponto: ponto});
                }
            }
        }
    };
    // Ponto Decimal para Valores Float.
    ponto = (e) => {
        e.preventDefault();
        if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
            // Se o último status dos vetores somar, subtrair, multiplicar e dividir for false.
            if(this.state.valores[this.state.valores.length - 2] && (this.state.valores[this.state.valores.length - 2] !== '-')){
                /*
                 * Se o penúltimo valor numérico do vetor de valores não estiver vazio,
                 * e se o penúltimo valor numérico do vetor de valores for diferente de '-'.
                 */
                if(this.state.ponto[this.state.ponto.length - 2] === 0){
                    /*
                    * Se o status do penúltimo ponto decimal for igual a 0,
                    * concatena o ponto decimal com o penúltimo valor numérico do vetor de valores,
                    * modifica o último valor numérico do vetor de cálculos,
                    * concatena o ponto decimal com o valor da string de operações,
                    * modifica o status dos pontos decimais para true,
                    * modifica o status do penúltimo ponto decimal para 1,
                    * executa a função calcular para refazer os cálculos e exibir o resultado.
                    */
                    let valores = this.state.valores;
                    valores[valores.length - 2] = valores[valores.length - 2] + e.target.value;
                    this.setState({valores: valores});
                    let calculos = this.state.calculos;
                    calculos[calculos.length - 1] = valores[valores.length - 2];
                    this.setState({calculos: calculos});
                    this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                    this.setState({pontos: true});
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 2] = 1;
                    this.setState({ponto: ponto});
                    this.calcular();
                }
            }
        }
        else{
            // Se o último status dos vetores somar ou subtrair ou multiplicar ou dividir for true.
            if(this.state.valores[this.state.valores.length - 1] && (this.state.valores[this.state.valores.length - 1] !== '-')){
                /*
                 * Se o último valor numérico do vetor de valores não estiver vazio,
                 * e se o último valor numérico do vetor de valores for diferente de '-'.
                 */
                if(this.state.ponto[this.state.ponto.length - 1] === 0){
                    /*
                    * Se o status do último ponto decimal for igual a 0,
                    * concatena o ponto decimal com o último valor numérico do vetor de valores,
                    * modifica o último valor numérico do vetor de cálculos,
                    * concatena o ponto decimal com o valor da string de operações,
                    * modifica o status dos pontos decimais para true,
                    * modifica o status do penúltimo ponto decimal para 1,
                    * executa a função calcular para refazer os cálculos e exibir o resultado.
                    */
                    let valores = this.state.valores;
                    valores[valores.length - 1] = valores[valores.length - 1] + e.target.value;
                    this.setState({valores: valores});
                    let calculos = this.state.calculos;
                    calculos[calculos.length - 1] = valores[valores.length - 1];
                    this.setState({calculos: calculos});
                    this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
                    this.setState({pontos: true});
                    let ponto = this.state.ponto;
                    ponto[ponto.length - 1] = 1;
                    this.setState({ponto: ponto});
                    this.calcular();
                }
            }
        }
    };
    // Operadores Matemáticos.
    operadores = (e) => {
        if(this.state.somar[this.state.somar.length - 1] || this.state.subtrair[this.state.subtrair.length - 1] || this.state.multiplicar[this.state.multiplicar.length - 1] || this.state.dividir[this.state.dividir.length - 1]){
            /*
             * Se o último status dos vetores somar ou subtrair ou multiplicar ou dividir for true,
             * concatena o valor padrão com os valores atuais do vetor de valores,
             * concatena o status padrão com os atatus atuais do vetor de ponto decimal,
             * concatena o status padrão com os atatus atuais do vetor de somar,
             * concatena o status padrão com os atatus atuais do vetor de subtrair,
             * concatena o status padrão com os atatus atuais do vetor de multiplicar,
             * concatena o status padrão com os atatus atuais do vetor de dividir.
             */
            this.setState((state) => ({valores: state.valores.concat('')}));
            this.setState((state) => ({ponto: state.ponto.concat(0)}));
            this.setState((state) => ({somar: state.somar.concat(false)}));
            this.setState((state) => ({subtrair: state.subtrair.concat(false)}));
            this.setState((state) => ({multiplicar: state.multiplicar.concat(false)}));
            this.setState((state) => ({dividir: state.dividir.concat(false)}));
        }
        if(e.target.value === '+'){
            /*
             * Se o operador de soma for solicitado,
             * modifica o último status do vetor de somar para true,
             * concatena o operador de soma com os valores atuais do vetor de cálculos,
             * concatena o operador de soma com o valor atual da string de operações,
             * executa a função calcular para refazer os cálculos e exibir o resultado.
             */
            let somar = this.state.somar;
            somar[somar.length -1] = true;
            this.setState({somar: somar});
            this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
            this.calcular();
        }
        else if(e.target.value === '-'){
            /*
             * Se o operador de subtração for solicitado,
             * modifica o último status do vetor de subtrair para true,
             * concatena o operador de subtração com os valores atuais do vetor de cálculos,
             * concatena o operador de subtração com o valor atual da string de operações,
             * executa a função calcular para refazer os cálculos e exibir o resultado.
             */
            let subtrair = this.state.subtrair;
            subtrair[subtrair.length -1] = true;
            this.setState({subtrair: subtrair});
            this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
            this.calcular();
        }
        else if(e.target.value === '*'){
            /*
             * Se o operador de multiplicação for solicitado,
             * modifica o último status do vetor de multiplicar para true,
             * concatena o operador de multiplicação com os valores atuais do vetor de cálculos,
             * concatena o operador de multiplicação com o valor atual da string de operações,
             * executa a função calcular para refazer os cálculos e exibir o resultado.
             */
            let multiplicar = this.state.multiplicar;
            multiplicar[multiplicar.length -1] = true;
            this.setState({multiplicar: multiplicar});
            this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
            this.calcular();
        }
        else if(e.target.value === '/'){
            /*
             * Se o operador de divisão for solicitado,
             * modifica o último status do vetor de dividir para true,
             * concatena o operador de divisão com os valores atuais do vetor de cálculos,
             * concatena o operador de divisão com o valor atual da string de operações,
             * executa a função calcular para refazer os cálculos e exibir o resultado.
             */
            let dividir = this.state.dividir;
            dividir[dividir.length -1] = true;
            this.setState({dividir: dividir});
            this.setState((state) => ({calculos: state.calculos.concat(e.target.value)}));
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
            this.calcular();
        }
        else if(e.target.value === '='){
            // Se o operador de igualdade for solicitado.
            if(!this.state.valores[1]){
                /*
                 * Se o último valor do vetor de valores for vazio,
                 * atribui o primeiro valor do vetor de valores ao visor de resultado da calculadora.
                 */
                this.setState((state) => ({resultado: state.valores[0]}));
            }
            else{
                /*
                 * Se o último valor do vetor de valores não for vazio,
                 * executa a função calcular para refazer os cálculos e exibir o resultado.
                 */
                this.calcular();
            }
            // Mantém o Valor do State de Resultados e Reseta Todos os outros States para o Padrão.
            this.setState({valores: ['','']});
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
    // Operações Matemáticas.
    operacoes = (e) => {
        e.preventDefault();
        if(this.state.pontos){
            // Se o status dos pontos decimais for true.
            if(this.state.valores[this.state.valores.length - 2] && (this.state.valores[this.state.valores.length - 2] !== '-')){
                /*
                 * Se o penúltimo valor do vetor de valores não for vazio,
                 * e se o penúltimo valor do vetor de valores for diferente de '-'.
                 */
                if(this.state.valores[this.state.valores.length - 1] && (this.state.valores[this.state.valores.length - 1] !== '-')){
                    /*
                    * Se o último valor do vetor de valores não for vazio,
                    * e se o último valor do vetor de valores for diferente de '-'.
                    */
                    if(this.state.ponto[this.state.ponto.length - 1] !== 1){
                        // Se o último status do vetor de ponto decimal for diferente de 1.
                        if(this.state.somar[this.state.somar.length - 1] || this.state.subtrair[this.state.subtrair.length - 1] || this.state.multiplicar[this.state.multiplicar.length - 1]){
                            /*
                             * Se o último status dos vetores somar ou subtrair ou multiplicar for true,
                             * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                             */
                            this.operadores(e);
                        }
                        else if(this.state.dividir[this.state.dividir.length - 1] && ((parseFloat(this.state.valores[this.state.valores.length - 1]) > 0) || (parseFloat(this.state.valores[this.state.valores.length - 1]) < 0))){
                            /*
                             * Se o último status do vetor dividir for true,
                             * e se o último valor do vetor de valores for maior ou menor que 0,
                             * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                             */
                            this.operadores(e);
                        }
                    }
                }
                else if(!this.state.valores[this.state.valores.length - 1]){
                    // Se o último valor do vetor de valores for vazio.
                    if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1] && (this.state.ponto[this.state.ponto.length - 2] !== 1)){
                        /*
                         * Se o último status dos vetores somar, subtrair, multiplicar e dividir for false,
                         * e se o penúltimo status do vetor de ponto decimal for diferente de 1,
                         * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                         */
                        this.operadores(e);
                    }
                }
            }
        }
        else{
            // Se o status dos pontos decimais for false.
            if(this.state.valores[this.state.valores.length - 2] && (this.state.valores[this.state.valores.length - 2] !== '-')){
                /*
                 * Se o penúltimo valor do vetor de valores não for vazio,
                 * e se o penúltimo valor do vetor de valores for diferente de '-'.
                 */
                if(this.state.valores[this.state.valores.length - 1] && (this.state.valores[this.state.valores.length - 1] !== '-')){
                    /*
                     * Se o último valor do vetor de valores não for vazio,
                     * e se o último valor do vetor de valores for diferente de '-'.
                     */
                    if(this.state.somar[this.state.somar.length - 1] || this.state.subtrair[this.state.subtrair.length - 1] || this.state.multiplicar[this.state.multiplicar.length - 1]){
                        /*
                         * Se o último status dos vetores somar ou subtrair ou multiplicar for true,
                         * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                         */
                        this.operadores(e);
                    }
                    else if(this.state.dividir[this.state.dividir.length - 1] && ((parseInt(this.state.valores[this.state.valores.length - 1]) > 0) || (parseInt(this.state.valores[this.state.valores.length - 1]) < 0))){
                        /*
                         * Se o último status do vetor dividir for true,
                         * e se o último valor do vetor de valores for maior ou menor que 0,
                         * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                         */
                        this.operadores(e);
                    }
                }
                else if(!this.state.valores[this.state.valores.length - 1]){
                    // Se o último valor do vetor de valores for vazio.
                    if(!this.state.somar[this.state.somar.length - 1] && !this.state.subtrair[this.state.subtrair.length - 1] && !this.state.multiplicar[this.state.multiplicar.length - 1] && !this.state.dividir[this.state.dividir.length - 1]){
                        /*
                         * Se o último status dos vetores somar, subtrair, multiplicar e dividir for false,
                         * executa a função operadores para fazer os cálculos e adicionar o novo operador.
                         */
                        this.operadores(e);
                    }
                }
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
                        <input type='button' value='/' className='formulario-button' onClick={this.operacoes}/>
                        <input type='button' value='4' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='5' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='6' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='*' className='formulario-button' onClick={this.operacoes}/>
                        <input type='button' value='1' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='2' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='3' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='-' className='formulario-button' onClick={this.operacoes}/>
                        <input type='button' value='0' className='formulario-button' onClick={this.valores}/>
                        <input type='button' value='.' className='formulario-button' onClick={this.ponto}/>
                        <input type='button' value='+/-' className='formulario-button' onClick={this.sinal}/>
                        <input type='button' value='+' className='formulario-button' onClick={this.operacoes}/>
                        <input type='button' value='=' className='formulario-button' onClick={this.operacoes}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;