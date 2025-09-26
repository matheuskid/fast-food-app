const btnIniciar = document.getElementById('iniciar')
const btnParar = document.getElementById('parar')


btnIniciar.addEventListener("click", iniciar)
btnParar.addEventListener("click", parar)



// Função que inicia e executa a simulação
function iniciar() {
    var intChegada = document.getElementById('int_chegada').value
    
    FilaClientesNoCaixa(intChegada)

    //Função que gerencia a fila de clientes 

    //Função que gerencia o cozinheiro
    
    //A função dos clientes pode, após o pedido, ir esperar/receber?
}

//Função que interrompe a simulação
function parar() {

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function FilaClientesNoCaixa(intervalo) {
    var filaClientes = []
    var clienteNumero = 1
    while(true) {
        filaClientes.push(clienteNumero)
        var novoClienteSpan = document.createElement('span')
        novoClienteSpan.innerHTML = `<span class='px-3 py-1 bg-gray-200 rounded-lg'>${clienteNumero}</span>`
        document.getElementById("secao-fila-clientes").appendChild(novoClienteSpan)
        await sleep(1000 * intervalo)
        clienteNumero++
    }
}
