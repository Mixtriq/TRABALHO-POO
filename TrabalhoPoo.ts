let motoristas:motorista[] = [];
let passageiros:passageiro[] = [];
let viagens:viagem[] = [];
class usuario {
    protected nome:string;
    protected cpf:string;
    protected sexo:string;
    protected saldo:number;
    protected nota:number;
    public qtdAvaliacoes:number
    protected ultimaViagem:viagem
    constructor(nome:string,cpf:string,sexo:string,saldo:number){
        this.nome = nome
        this.cpf = cpf
        this.sexo = sexo
        this.saldo = saldo
        this.nota = 0
        this.qtdAvaliacoes = 0
        this.ultimaViagem = new viagem("","",0,new Date("0"),0,0,motoristas[0])
    }
    getCpf():string{
        return this.cpf
    }
    getSaldo():number{
        return this.saldo
    }
    setSaldo(valor:number){
        this.saldo = valor
    }
    getNome():string{
        return this.nome
    }
    getNota():number{
        return this.nota
    }
    setNota(valor:number){
        this.nota = valor
    }
}
class transacaoFinanceira extends usuario{
    adicionarSaldo(){
        let i:number = parseFloat(prompt("Quanto de saldo você quer adicionar à sua conta?")!)
        this.saldo += i        
    }
    realizarPagamento():string{
        let a = prompt("CPF do motorista(apenas numeros):")
        for(let x = 0; x < motoristas.length; x++){
            if(motoristas[x].getCpf()==a){
                let i:number = parseFloat(prompt("Quanto de saldo você quer pagar ao motorista?")!)
                this.saldo -= i
                let z = motoristas[x].getSaldo()
                z += i
                motoristas[x].setSaldo(z)
                return `Transação de R$ ${i} realizada com sucesso ao/à motorista ${motoristas[x].getNome()}`
            }
        }
        return `Motorista não encontrado, verifique se digitou o CPF corretamente e tente mais uma vez.`
    }
}
class viagem {
    protected pontoInicial: string
    protected destino:string
    protected distancia:number
    protected dataSaida:Date
    protected custo:number
    protected capacidade:number
    protected qtdPassageiro:number
    protected custoPorPessoa:number
    passageiros:passageiro[]
    motorista:motorista
    constructor(inicio:string, final:string, distancia:number,saida:Date,custo:number,capacidade:number,motorista:motorista){
        this.pontoInicial = inicio;
        this.destino = final;
        this.distancia = distancia;
        this.dataSaida = saida
        this.custo = custo
        this.capacidade = capacidade
        this.qtdPassageiro = 0
        this.passageiros = []
        this.motorista = motorista
        this.custoPorPessoa = 0
    }
    calcularCustoPorPessoa(){
        this.custoPorPessoa = this.custo / this.qtdPassageiro
    }
    getPontoInicial():string{
        return this.pontoInicial
    }
    getDestino():string{
        return this.destino
    }
    getCapacidade():number{
        return this.capacidade
    }
}

class motorista extends usuario {
    carro:string
    constructor(nome:string,cpf:string,sexo:string,carro:string){
        super(nome,cpf,sexo,0)
        this.carro = carro
        this.nota = 0
    }
    criarViagem(){
        let a:string = prompt("Em qual cidade irá começar a viagem?")!
        let b:string = prompt(`Qual a cidade destino da viagem?`)!
        let c:number = parseFloat(prompt(`Qual a distancia, em km, que vai percorrer da cidade inicial até a ${1}ª cidade destino?`)!)
        let d:number = parseFloat(prompt("Qual o preço da Gasolina?\n")!)
        let f:number = parseInt(prompt("Quantas pessoas você pode levar de carona?")!)
        let g:string = prompt("Qual a data da saída?")!
        let h = new Date(g)
        let i = c * d
        let j = new motorista(this.nome,this.cpf,this.sexo,this.carro)
        viagens[viagens.length] = new viagem(a,b,c,h,i,f,j)
    }
    avaliarPassageiro(){
        let a:string = prompt("Qual passageiro deseja avaliar?")!
        let x = 0
        for(; x < this.ultimaViagem.passageiros.length; x++){
            console.log(`${x} - ${this.ultimaViagem.passageiros[x]}`)
        }
        let b:number = parseInt(prompt("Qual nota você quer dar para esse passageiro(entre 1 e 10?")!)
        if(b>1 || b<10){
            passageiros[x].qtdAvaliacoes++
            let c:number = (passageiros[x].getNota() + b) /  passageiros[x].qtdAvaliacoes
        } else {
            while(b<1 || b>10)    
            console.log("Valor inválido para a nota, apenas entre 1 e 10")
        }
    }
}

class passageiro extends usuario {
    constructor(nome:string,cpf:string,sexo:string){
        super(nome,cpf,sexo,0)
    }
    buscarCarona(){
        let a:string = prompt("De qual cidade você quer sair pela carona?")!
        let b:string = prompt("Para qual cidade você quer ir?")!
        let teste = 0
        for(let x = 0; x < viagens.length; x++){
            if(a==viagens[x].getPontoInicial() && b==viagens[x].getDestino()){
                console.log(`${x} - ${viagens[x]}`)
                teste++
            }
        }
        if(teste == 0){
            console.log("Nenhuma opção disponível")
        } else {
            let c:number = parseInt(prompt("Escolha uma das opções acima utilizando o numero")!)
            if(viagens[c].passageiros.length<viagens[c].getCapacidade()){
                viagens[c].passageiros[passageiros.length-1] = new passageiro(this.nome,this.cpf,this.sexo)
            }
        }
    }
    avaliarMotorista(){
        let a:string = prompt(`Qual nota você quer dar ao motorista(entre 1 e 10)? ${this.ultimaViagem.motorista}`)!
    }
}
function cancelarViagem(){

}
function menuMotorista():void{
    let acao:number
    do{
        acao = parseInt(prompt("MENU:\n1 - Criar viagem\n2 - Cancelar viagem\n3 - Completar carona\n4 - Encerrar")!)
    
        switch(acao){
            case 1:
                //criarViagem()
                break
            case 2:
                //cancelarViagem()
                break
            case 3:
                //completarCarona()
                break
            case 4:
                break
            default:
                console.log("Escolha inválida, escolha entre [1],[2],[3],[4]")
                break
        }
    }while(acao!=4)
}
function menuPassageiro():void{
    
    let acao:number
    do{
        acao = parseInt(prompt("MENU:\n1 - Procurar carona\n2 - Avaliar viagem\n3 - Encerrar")!)
        switch(acao){
            case 1:
                //procurarCarona()
                break
            case 2:
                //avaliarViagem()
                break
            case 3:
                break
            default:
                console.log("Escolha inválida, escolha entre [1],[2],[3],[4]")
                break
        }
    }while(acao!=3)
}
   
function main(){
    let x = prompt("Eae")
    console.log(`voce escreveu ${x}`)
    let escolha1:number = parseInt(prompt("Voce é motorista ou passageiro?\n1 - motorista\n2 - passageiro\n")!)
    let escolha2:number = parseInt(prompt("Você é novo no aplicativo e deseja-se cadastrar-se?\n1 - Sim, desejo cadastrar\n2 - Já possuio uma conta e gostaria de logar")!)
    while(escolha2!=1&&escolha2!=2){
        console.log("Escolha inválida, as opções são apenas [1] ou [2], tente novamente:\n")
        escolha2 = parseInt(prompt("Você é novo no aplicativo e deseja-se cadastrar-se?\n1 - Sim, desejo cadastrar\n2 - Já possuio uma conta e gostaria de logar")!)
    }
    switch(escolha1){
        case 1:
            if(escolha2 == 1){
                //cadastrarMotorista()
            } else if(escolha2 == 2){
            menuMotorista()
            }
            break
        case 2:
            if(escolha2 == 1){
                //cadastroPassageiro()
            } else if(escolha2 == 2){
            menuPassageiro()
            }
        default:
            console.log("Escolha inválida")
    }
}

main();