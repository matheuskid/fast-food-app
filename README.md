# 🍽️ Simulador de Sistema de Pedidos

Este projeto simula o funcionamento de um restaurante com **filas de clientes, pedidos e entregas**, utilizando **JavaScript assíncrono (async/await)** para representar eventos acontecendo em paralelo, como chegada de clientes, atendimento, preparo e entrega dos pedidos.

---

## 🚀 Tecnologias Utilizadas

- **HTML5**  
- **Tailwind CSS**  
- **JavaScript (ES6+)**

---

## 🎯 Objetivo

O sistema tem como objetivo **simular um fluxo realista de atendimento em um restaurante**, controlando o estado de cada cliente e pedido em tempo real.

A simulação segue as seguintes etapas:

1. Chegada na fila de clientes  
2. Atendimento para realizar o pedido  
3. Espera enquanto o pedido é preparado  
4. Pedido em preparo (cozinheiro ocupado)  
5. Pedido pronto  
6. Pedido sendo entregue (entregador ocupado)  
7. Cliente atendido com sucesso

---

## 🧠 Estrutura da Interface (HTML)

A tela principal é dividida em **duas áreas**:

### 🧩 1. Área de Configurações
**Intervalo de Chegada**: tempo (em segundos) entre a chegada de novos clientes.

**Tempo de Preparo**: tempo (em segundos) para preparo de cada pedido.

**Botões**:
  - `Iniciar`: inicia a simulação.
  - `Parar`: interrompe a execução.

### 🍽️ 2. Área Principal
Dividida em **5 seções** principais:

| Seção | Conteúdo | Observação |
|-------|-----------|------------|
| 1 | Fila de Clientes + Cliente em Atendimento | Representa os clientes chegando e sendo atendidos |
| 2 | Fila de Pedidos + Pedido em Preparação | Mostra os pedidos aguardando e sendo preparados |
| 3 | Pedidos Prontos + Pedido em Entrega | Exibe os pedidos prontos e em fase de entrega |
| 4 | Clientes Esperando Pedido | Clientes que já fizeram o pedido e aguardam |
| 5 | Clientes Atendidos | Clientes que já receberam o pedido |

---

## ⚙️ Lógica da Simulação (JavaScript)

A lógica está toda concentrada no arquivo `script.js`.

### 🔄 Fluxo Geral

1. **Início da simulação (`iniciar`)**  
   Ativa o sistema (`STATUS_SIMULACAO = true`) e executa simultaneamente:
   - `geradorDeClientes()`  
   - `atendimento()`

2. **Geração de Clientes (`geradorDeClientes`)**  
   Cria novos clientes em intervalos definidos (`int_chegada`).  
   Cada cliente recebe um identificador e entra na **fila de clientes**.

3. **Atendimento (`atendimento`)**  
   Retira um cliente da fila e o move para a seção **Cliente em Atendimento**.  
   Após alguns segundos (simulando o pedido), o cliente gera um pedido e entra na função `processarPedido()`.

4. **Processamento de Pedido (`processarPedido`)**  
   Representa todo o ciclo de vida do pedido:
   - Cliente vai para a fila de **Clientes Esperando Pedido**  
   - Pedido vai para **Fila de Pedidos**
   - Aguarda o **cozinheiro** ficar livre (`checaOcupado('cozinheiro')`)
   - Pedido vai para **Pedido em Preparação**
   - Após o tempo de preparo (`cozinhar()`), vai para **Pedidos Prontos**
   - Aguarda o **entregador** ficar livre (`checaOcupado('entregador')`)
   - Vai para **Pedido em Entrega**
   - Depois de entregue (`entregar()`), o cliente vai para **Clientes Atendidos**

---

## 🧩 Principais Funções

| Função | Descrição |
|--------|------------|
| `iniciar()` | Inicia a simulação executando os processos em paralelo |
| `parar()` | Interrompe a execução da simulação |
| `geradorDeClientes()` | Cria clientes periodicamente com base no intervalo definido |
| `atendimento()` | Simula o atendimento dos clientes e o envio dos pedidos |
| `processarPedido()` | Gerencia o fluxo completo do pedido até a entrega |
| `checaOcupado(quem)` | Verifica se o cozinheiro ou entregador está disponível |
| `cozinhar()` | Simula o tempo de preparo de um pedido |
| `entregar()` | Simula o tempo de entrega do pedido |
| `sleep(ms)` | Pausa a execução por um tempo determinado (função auxiliar) |

---

## 🔁 Estados Controlados

| Variável | Tipo | Função |
|-----------|------|--------|
| `STATUS_SIMULACAO` | boolean | Indica se a simulação está em andamento |
| `FILA_CLIENTES` | array | Lista de clientes aguardando atendimento |
| `COZINHEIRO_OCUPADO` | boolean | Indica se o cozinheiro está preparando um pedido |
| `ENTREGADOR_OCUPADO` | boolean | Indica se o entregador está ocupado entregando um pedido |

---

## 🖥️ Execução

1. Abra o arquivo `index.html` em qualquer navegador moderno.  
2. Defina:
   - **Intervalo de Chegada (s)**  
   - **Tempo de Preparo (s)**
3. Clique em **Iniciar**.
4. Observe a movimentação dinâmica dos clientes e pedidos nas seções.

Para interromper a simulação, clique em **Parar**.

---

## ! Importante

O desafio pedia o desenvolvimento usando Promises nativas do JS, porém resolvi fazer com async / await pois julgo ser uma forma melhor de representar o fluxo assíncrono e conseguir os resultados esperados de forma mais eficiente e moderna. 