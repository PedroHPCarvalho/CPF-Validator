// 705.484.450-52  070.987.720-03
// Classe do Objeto valida cpf
class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo',{
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }
/* Metodo da classe que verifica se o cpf informado 
é uma sequencia
*/
    isSequence(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;

    }
/* Metodo da classe que gera o cpf atraves dos calculos 
para a validação
*/
    geraNovoCpf(){
        const cpfParcial = this.cpfLimpo.slice(0,-2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);
        this.novoCPF = cpfParcial + digito1 + digito2;
    }

/* Metodo que gera os ultimos dois digitos do cpf através 
do calculo, por não referenciar atributo da instancia através do this ele 
pode ser definido como metodo estatico
*/
    static geraDigito(cpfParcial){
       let total = 0
       let reverso = cpfParcial.length + 1;
       
       for(let stringNumerica of cpfParcial){
        total += reverso * Number(stringNumerica)
        reverso --;
       }
       const digito = 11 - ( total % 11);
       return digito <= 9 ? String(digito) : '0';
    }
/* Método principal da validação, onde é feito todas as ações*/
    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.isSequence()) return false;
        this.geraNovoCpf();
        
        return this.novoCPF === this.cpfLimpo;
    }
}

const validacpf = new ValidaCPF('070.987.720-03');

if(validacpf.valida()){
    console.log('CPF Válido');
} else
{
    console.log('CPF Inválido');
}