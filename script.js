const btnIniciar = document.getElementById('iniciar')
const btnParar = document.getElementById('parar')
//const btnResetar = document.getElementById('resetar')


// --- ELEMENTOS DO DOM ---
const secaoClientesFila = document.getElementById("secao-clientes-fila")
const secaoClienteAtendimento = document.getElementById("secao-cliente-atendimento")
const secaoPedidoPreparando = document.getElementById("secao-pedido-preparando")
const secaoPedidosAguardando = document.getElementById("secao-pedidos-aguardando")
const secaoPedidosProntos = document.getElementById("secao-pedidos-prontos")
const secaoPedidoEntrega = document.getElementById("secao-pedido-entrega")
const secaoClientesEsperando = document.getElementById("secao-clientes-esperando")
const secaoClientesAtendidos = document.getElementById("secao-clientes-atendidos")


let STATUS_SIMULACAO = false  //True = em execução | False = parada
let FILA_CLIENTES = []
let FILA_CLIENTES_ATENDIDOS = []
let COZINHEIRO_OCUPADO = false   //true = cozinhando | false = ocioso
let ENTREGADOR_OCUPADO = false  //true = ocupado | false = ocioso


btnIniciar.addEventListener("click", iniciar)
btnParar.addEventListener("click", parar)


// Função que inicia e executa a simulação
function iniciar() {
    if (STATUS_SIMULACAO) return
    STATUS_SIMULACAO = true

    Promise.all([
        geradorDeClientes(),
        atendimento()
    ]).then(() => {
        console.log("Simulação terminada")
    }).catch(error => {
        console.log("Simulação encontrou um erro", error)
    })
}

//Função que interrompe a simulação
function parar() { 
    STATUS_SIMULACAO = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function geradorDeClientes() {
    let intervaloChegada = document.getElementById('int_chegada').value * 1000
    let clienteNumero = 1

    while(STATUS_SIMULACAO) {
        let novoClienteSpan = document.createElement('span');
        novoClienteSpan.id = `fila-cliente-${clienteNumero}`;
        novoClienteSpan.className = 'px-3 py-1 bg-gray-200 rounded-lg';
        novoClienteSpan.innerText = clienteNumero;
        secaoClientesFila.appendChild(novoClienteSpan);

        FILA_CLIENTES.push(clienteNumero)

        await sleep(intervaloChegada)
        clienteNumero++
    }
}

async function atendimento() {
    while (STATUS_SIMULACAO) {
        if (FILA_CLIENTES.length > 0) {
            let clienteNumero = FILA_CLIENTES.shift()

            let clienteSpan = document.getElementById(`fila-cliente-${clienteNumero}`)
            secaoClienteAtendimento.appendChild(clienteSpan)
            
            await sleep(2000) // Cliente fazendo pedido
            
            
            // FILA_CLIENTES_ATENDIDOS.push(processarPedido(clienteNumero))
            processarPedido(clienteNumero)
        } else {
            await sleep(500)
        }
    }
}

async function processarPedido(cliente) {
    var pedidoSpan = secaoClienteAtendimento.removeChild(document.getElementById(`fila-cliente-${cliente}`))
    var pedidoSpanClone = pedidoSpan.cloneNode(true)

    // Cliente esperando receber o pedido (fila de espera)
    secaoClientesEsperando.appendChild(pedidoSpanClone)

    // Pedido esperando o prepraro (fila de espera)
    secaoPedidosAguardando.appendChild(pedidoSpan)
    await checaOcupado("cozinheiro")

    // Pedido em preparo
    secaoPedidoPreparando.appendChild(pedidoSpan)
    await cozinhar()
    
    secaoPedidosProntos.appendChild(pedidoSpan)
    await checaOcupado("entregador")

    secaoPedidoEntrega.appendChild(pedidoSpan)
    await entregar()
    secaoPedidoEntrega.removeChild(pedidoSpan)

    secaoClientesAtendidos.appendChild(pedidoSpanClone)
    return cliente
}

async function checaOcupado(quem) {
    if (quem === 'cozinheiro') {
        while (COZINHEIRO_OCUPADO) {
            await sleep(500)
        }
    } else if (quem === 'entregador') {
        while (ENTREGADOR_OCUPADO) {
            await sleep(500)
        }
    }
}

async function cozinhar() {
    let tempoPreparo = document.getElementById('int_preparo').value * 1000
    COZINHEIRO_OCUPADO = true
    
    await sleep(tempoPreparo)
    
    COZINHEIRO_OCUPADO = false
}

async function entregar() {
    ENTREGADOR_OCUPADO = true

    await sleep(2000)

    ENTREGADOR_OCUPADO = false
}
