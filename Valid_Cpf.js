/*Função prototipo, aquela que comporta os metodos e atributos*/
function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

/*Função que faz todo processo de validação*/
ValidaCPF.prototype.valida = function(){
    /*validação referente a:
        1 - Válida se o tipo do valor vindo de cpf limpo é undefined, 
        caso seja undefined e retorna false
        2 - Verifica se foram informados 11 caracteres, caso seja diferente de 11, retorna falso
        3 - Verifica se é uma sequencia a partir da função isSequencia
    */
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;
    
    const cpfParcial = this.cpfLimpo.slice(0,-2);

    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
}

//A função criaDigito faz os calculos para a validação do cpf, fazendo os calculos utilizando os 9 primeiros digitos
// para obter o primeiro digito e em seguida utilizar os 10 digitos para obter o ultimo digito
ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length +1
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo*Number(val));
        regressivo--;
        return ac;
    }, 0 )
    const digito = 11 - (total % 11);
    return digito > 9 ? '0': String(digito);
}

//Função que valida se o cpf informado é uma sequencia, a função retorna uma sequencia de 11 numeros
//sendo a repetição do primeiro
ValidaCPF.prototype.isSequencia = function(){
    const sequencia =  this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo;
}

/*Instanciação do prototipo ValidaCPF*/
const cpf = new ValidaCPF('440.705.838-23')

//if que utiliza o o retorno da função valida, caso seja falso retorna cpf invalido, caso verdadeiro retorna cpf valido
if(cpf.valida()){
    console.log('CPF VÁLIDO')
} else {
    console.log('CPF INVÁLIDO')
}
