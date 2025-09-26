const btnIniciar = document.getElementById('iniciar')
const btnParar = document.getElementById('parar')
STATUS = false


btnIniciar.addEventListener("click", iniciar)
btnParar.addEventListener("click", parar)



// Função que inicia e executa a simulação
function iniciar() {
    if (STATUS == false) {
        var intChegada = document.getElementById('int_chegada').value
        FilaClientesNoCaixa(intChegada)
    }
}

//Função que interrompe a simulação
function parar() { 
    STATUS = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function FilaClientesNoCaixa(intervalo) {
    STATUS = true
    var filaClientes = []
    var clienteNumero = 1
    while(STATUS) {
        filaClientes.push(clienteNumero)
        var novoClienteSpan = document.createElement('span')
        novoClienteSpan.innerHTML = `<span class='px-3 py-1 bg-gray-200 rounded-lg'>${clienteNumero}</span>`
        document.getElementById("secao-fila-clientes").appendChild(novoClienteSpan)

        await sleep(1000 * intervalo)
        clienteNumero++
    }
}
