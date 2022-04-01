import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valor: ['',''],// Vetor de strings que vai armazenar os valores ('' = não informado).
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
    // Cálculos Matemáticos Executados Pela Calculadora.
    calcular = () => {
        // Cria uma variável local e passa a sequência de cálculos solicitados.
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
        // Executa até que toda a sequência de operações tenha terminado.
        while(operacoes.length){
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
                /*
                 * Se o valor for abrir parêntese,
                 * executa até que toda a sequência de operações entre parênteses tenha terminado.
                 */
                while(operacoes.length){
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
        // Executa até que toda a sequência de valores tenha terminado.
        while(valores.length){
            // Cria duas variáveis locais e passa o valor e a posição do operador com maior preferência no cálculo.
            let valor = 0;
            let posicao = 0;
            preferencia.forEach((item, local) => {
                if(valor < parseInt(item)){
                    valor = parseInt(item);
                    posicao = parseInt(local);
                }
            });
            if(operadores[posicao] === '*'){
                /*
                 * Se o valor for multiplicação,
                 * verifica se existe valor numérico imediatamente a direita do operador.
                 */
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se existir executa o cálculo de múltiplicação entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador.
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
                    /*
                    * Se não existir valor numérico imediatamente a direita do operador,
                    * verifica se o número de valores numéricos é maior que 1.
                    */
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
                /*
                 * Se o valor for divisão,
                 * verifica se existe valor numérico imediatamente a direita do operador.
                 */
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se existir executa o cálculo de divisão entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador.
                     * remove os dois valores numéricos,
                     * remove o operador de divisão,
                     * remove a preferência do operador de divisão.
                     */
                    resultado = valores[posicao] / valores[posicao + 1];
                    valores.splice(posicao, 2, resultado);
                    operadores.splice(posicao, 1);
                    preferencia.splice(posicao, 1);
                }
                else{
                    /*
                    * Se não existir valor numérico imediatamente a direita do operador,
                    * verifica se o número de valores numéricos é maior que 1.
                    */
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
            else if(operadores[posicao] === '+'){
                /*
                 * Se o valor for soma,
                 * verifica se existe valor numérico imediatamente a direita do operador.
                 */
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se existir executa o cálculo de soma entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador.
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
                    /*
                    * Se não existir valor numérico imediatamente a direita do operador,
                    * verifica se o número de valores numéricos é maior que 1.
                    */
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
            else{
                /*
                 * Se o valor for subtração,
                 * verifica se existe valor numérico imediatamente a direita do operador.
                 */
                if(valores[posicao + 1] !== undefined){
                    /*
                     * Se existir executa o cálculo de subtração entre os valores numéricos:
                     * imediatamente a esquerda do operador e imediatamente a direita do operador.
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
                    /*
                    * Se não existir valor numérico imediatamente a direita do operador,
                    * verifica se o número de valores numéricos é maior que 1.
                    */
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
        }
        // Atribui o resultado do cálculo ao visor de resultado da calculadora
        this.setState({resultado: resultado});
    };
    // Reseta Todos os States Para o Padrão
    resetar = () => {
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
    };
    // Apagar o Último ou Todos os Valores Informados
    apagar = (e) => {
        e.preventDefault();
        if(e.target.value === 'C'){
            // Se a opção de apagar tudo for solicitada, reseta todos os states para o padrão
            this.resetar();
        }
        else if(e.target.value === 'CE'){
            if(this.state.operacao){
                /*
                * Se a opção de apagar o último valor for solicitada,
                * verifica se existe algum valor informado.
                */
                if(this.state.operacao[this.state.operacao.length - 1] === '+'){
                    /*
                    * Se o último valor for a operação de soma,
                    * remove a última operação de soma do vetor somar,
                    * modifica o status da última operação de soma do vetor somar para false,
                    * remove a última operação de soma da lista de operações,
                    * remove a última operação de soma da lista de calculos.
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
                    * remove a última operação de subtração da lista de operações,
                    * remove a última operação de subtração da lista de calculos.
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
                    * remove a última operação de multiplicação da lista de operações,
                    * remove a última operação de multiplicação da lista de calculos.
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
                    * remove a última operação de divisão da lista de operações,
                    * remove a última operação de divisão da lista de calculos.
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
                        * remove o último abrir parêntese da lista de operações,
                        * remove a último abrir parêntese da lista de calculos.
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
                        * remove o último abrir parêntese da lista de operações,
                        * remove a último abrir parêntese da lista de calculos.
                        */
                        this.setState({parenteses: false});
                        let parentese = this.state.parentese;
                        parentese[parentese.length - 1] = 0;
                        this.setState({parentese: parentese});
                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                        this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                        if(!this.state.operacao){
                            this.resetar();
                        }
                    }
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === ')'){
                    let parentese = this.state.parentese;
                    parentese[parentese.length - 1] = 1;
                    this.setState({parentese: parentese});
                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                    this.setState((state) => ({calculos: state.calculos.slice(0, -1)}));
                }
                else if(this.state.operacao[this.state.operacao.length - 1] === '.'){
                    if(this.state.ponto.length > 1){
                        let ponto = this.state.ponto;
                        ponto[ponto.length - 1] = 0;
                        this.setState({ponto: ponto});
                        if(this.state.valor.length > 2){
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1]){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    valor.pop();
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1]){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                if(this.state.valor[this.state.valor.length - 2]){
                                    let valor = this.state.valor;
                                    valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                    if(valor[valor.length - 2]){
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseFloat(valor[valor.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                }
                            }
                        }
                    }
                    else{
                        this.setState({pontos: false});
                        let ponto = this.state.ponto;
                        ponto[ponto.length - 1] = 0;
                        this.setState({ponto: ponto});
                        if(this.state.valor.length > 2){
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1]){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    valor.pop();
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1]){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                if(this.state.valor[this.state.valor.length - 2]){
                                    let valor = this.state.valor;
                                    valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                    if(valor[valor.length - 2]){
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                }
                            }
                        }
                    }
                }
                else if((this.state.operacao[this.state.operacao.length - 1] !== '') && (this.state.operacao[this.state.operacao.length - 1] !== ' ') && (this.state.operacao[this.state.operacao.length - 1] !== undefined)){
                    if(this.state.pontos){
                        if(this.state.valor.length > 2){
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                let valor = this.state.valor;
                                valor.pop();
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseFloat(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                if(this.state.valor[this.state.valor.length - 2]){
                                    let valor = this.state.valor;
                                    valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                    if(valor[valor.length - 2] && (valor[valor.length - 2] !== '-')){
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseFloat(valor[valor.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        if(valor[valor.length - 2] === '-'){
                                            valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    if(!this.state.operacao){
                                        // Se a opção de apagar tudo for solicitada, reseta os valores dos states para o padrão
                                        this.resetar();
                                    }
                                }
                            }
                        }
                    }
                    else{
                        if(this.state.valor.length > 2){
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                let valor = this.state.valor;
                                valor.pop();
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                        }
                        else{
                            if(this.state.valor[this.state.valor.length - 1]){
                                let valor = this.state.valor;
                                valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                if(valor[valor.length - 1] && (valor[valor.length - 1] !== '-')){
                                    let calculos = this.state.calculos;
                                    calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                                else{
                                    if(valor.length > 2){
                                        if(valor[valor.length - 1] === '-'){
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        valor.pop();
                                    }
                                    else if(valor[valor.length - 1] === '-'){
                                        valor[valor.length - 1] = valor[valor.length - 1].slice(0, -1);
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    let calculos = this.state.calculos;
                                    calculos.pop();
                                    this.setState({calculos: calculos});
                                    this.setState({valor: valor});
                                    this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                }
                            }
                            else{
                                if(this.state.valor[this.state.valor.length - 2]){
                                    let valor = this.state.valor;
                                    valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                    if(valor[valor.length - 2] && (valor[valor.length - 2] !== '-')){
                                        let calculos = this.state.calculos;
                                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 2]);
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    else{
                                        if(valor[valor.length - 2] === '-'){
                                            valor[valor.length - 2] = valor[valor.length - 2].slice(0, -1);
                                            this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                        }
                                        let calculos = this.state.calculos;
                                        calculos.pop();
                                        this.setState({calculos: calculos});
                                        this.setState({valor: valor});
                                        this.setState((state) => ({operacao: state.operacao.slice(0, -1)}));
                                    }
                                    if(!this.state.operacao){
                                        // Se a opção de apagar tudo for solicitada, reseta os valores dos states para o padrão
                                        this.resetar();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                // Se a opção de apagar tudo for solicitada, reseta os valores dos states para o padrão
                this.resetar();
            }
        }
        this.calcular();
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
    // Muda o Sinal do Último Valor Informado
    sinal = (e) => {
        e.preventDefault();
        const numero = (numero) => {
            return !isNaN(parseFloat(numero)) && isFinite(numero);
        };
        if(numero(this.state.calculos[this.state.calculos.length - 1])){
            if(this.state.valor[this.state.valor.length - 1]){
                let calculos = this.state.calculos;
                calculos[calculos.length - 1] = calculos[calculos.length - 1] * -1;
                let valor = this.state.valor;
                valor[valor.length - 1] = (calculos[calculos.length - 1]).toString();
                this.setState({valor: valor});
                this.setState({calculos: calculos});
                let operacao = '';
                calculos.forEach(item => {
                    operacao = operacao + (item).toString();
                });
                this.setState({operacao: operacao});
                this.calcular();
            }
            else if(this.state.valor[this.state.valor.length - 2]){
                let calculos = this.state.calculos;
                calculos[calculos.length - 1] = calculos[calculos.length - 1] * -1;
                let valor = this.state.valor;
                valor[valor.length - 2] = (calculos[calculos.length - 1]).toString();
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
                        this.calcular();
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 2]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                else{
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valor[valor.length - 2]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valor[valor.length - 2]));
                        this.setState({calculos: calculos});
                        this.calcular();
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
                        this.calcular();
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos[calculos.length - 1] = parseInt(valor[valor.length - 1]);
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                }
                else{
                    if(this.state.ponto){
                        let calculos = this.state.calculos;
                        calculos.push(parseFloat(valor[valor.length - 1]));
                        this.setState({calculos: calculos});
                        this.calcular();
                    }
                    else{
                        let calculos = this.state.calculos;
                        calculos.push(parseInt(valor[valor.length - 1]));
                        this.setState({calculos: calculos});
                        this.calcular();
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
                    this.calcular();
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
                    this.calcular();
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
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
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
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
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
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
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
            this.setState((state) => ({operacao: state.operacao.concat(e.target.value)}));
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
                }
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
                        <input type='button' value='+/-' className='formulario-button' onClick={this.sinal}/>
                        <input type='button' value='+' className='formulario-button' onClick={this.operadores}/>
                        <input type='button' value='=' className='formulario-button' onClick={this.operadores}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;