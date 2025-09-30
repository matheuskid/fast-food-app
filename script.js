const btnIniciar = document.getElementById('iniciar')
const btnParar = document.getElementById('parar')
//const btnResetar = document.getElementById('resetar')


// --- ELEMENTOS DO DOM ---
const secaoFila = document.getElementById("secao-fila-clientes")
const secaoAtendimento = document.getElementById("secao-cliente-atendimento")
const secaoPedidoPreparando = document.getElementById("secao-pedido-preparando")
const secaoPedidosAguardando = document.getElementById("secao-pedidos-aguardando")
const secaoPedidosProntos = document.getElementById("secao-pedidos-prontos")
const secaoPedidoEntrega = document.getElementById("secao-pedido-entrega")

let STATUS_SIMULACAO = false  //True = em execução | False = parada
let FILA_CLIENTES = []
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
        secaoFila.appendChild(novoClienteSpan);

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
            secaoAtendimento.appendChild(clienteSpan)
            
            await sleep(2000) // Cliente fazendo pedido

            //Inicialmente, testar com apenas um cliente por vez
            await processarPedido(clienteNumero)
        } else {
            await sleep(50);
        }
    }
}

async function processarPedido(cliente) {    
    // As funções agora são `async` e usam `await` para esperar de verdade
    await checaOcupado("cozinheiro")
    await cozinhar(cliente)
    await checaOcupado("entregador")
    await entregar(cliente)
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

async function cozinhar(cliente) {
    let tempoPreparo = document.getElementById('int_preparo').value * 1000
    COZINHEIRO_OCUPADO = true
    
    let pedidoSpan = document.getElementById(`fila-cliente-${cliente}`)
    secaoAtendimento.removeChild(pedidoSpan)
    secaoPedidoPreparando.appendChild(pedidoSpan)
    
    await sleep(tempoPreparo) // Espera o tempo de preparo

    secaoPedidoPreparando.removeChild(pedidoSpan)
    secaoPedidosProntos.appendChild(pedidoSpan)
    
    COZINHEIRO_OCUPADO = false
}

async function entregar(cliente) {
    ENTREGADOR_OCUPADO = true;
    
    let clienteSpan = document.getElementById(`fila-cliente-${cliente}`)
    secaoPedidosProntos.removeChild(clienteSpan) // Sai da cozinha
    secaoPedidoEntrega.appendChild(clienteSpan) // Vai para entrega

    await sleep(2000); // 2 segundos fixos para entregar

    ENTREGADOR_OCUPADO = false;
}
