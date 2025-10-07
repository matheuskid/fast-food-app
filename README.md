O Desafio

Esse desafio tem como objetivo por em prática conhecimentos de Promises e programação assincrona por meio da simulação de um restaurante de fast-food. Nesse restaurante existem 4 atores principais:

- Cliente: entra no restaurante e realiza um pedido;
- Atendente: anota o pedido do cliente e passa para o cozinheiro. O tempo de anotar o pedido
- Cozinheiro: prepara o pedido do cliente e passa para o garçom;
- Garçom: serve o pedido ao cliente.

Visto de forma sincrona, parece uma tarefa fácil, porém existem as constantes:

1. Os clientes chegam ao restaurante em um intervalo de tempo.
2. O atendente, cozinheiro e garçom demoram um certo intervalo de tempo para realizar suas ações.

Com essas constantes é possivel ver que alguns desses atores ficariam ociosos esperando, por exemplo, o cozinheiro preparar o pedido. Por meio da programação assincrona, é possivel que os clientes cheguem no restaurante e tenham seus pedidos anotados enquanto o cozinheiro e o garçom estejam realizando suas funções em paralelo.

É uma simulação de algo real que acontece no dia-a-dia que pode ser de muito valor para o entendimento e aprofundamento em conceitos e programação assincrona em qualquer linguagem.

Primeiros passos

Inicialmente é necessário responder algumas perguntas principais:

Já sabemos que vamos usar JS, mas será necessário usar algum framework?

Escolhi usar JS puro diretamente pelo navegador por dois motivos: não estou tão familiarizado, então é uma boa oportunidade de aprendizado, e pois acredito que seja o suficiente para atender as necessidades do aplicativo (promises e uma interface simples para visualização. Um framework como react ou vue acrescentariam uma lógica extra desnecessária para o projeto.

Como esse projeto será desenvolvido?

Vou usar alguns conceitos de programação ágil para dividir a programação de partes do projeto em sprints, mas para isso é necessário fazer uma leve documentação do que precisa ser entregue para que seja possivel criar o backlog. A partir do backlog podemos fazer a priorização, criação das sprints e depois o desenvolvimento.

Proximo post → Estruturação do trabalho (backlog, sprints, cronograma)

                → Listagem das ferramentas (quadro kanbam, grafico burndown, etc)

         → Inicio do desenvolvimento.

### Estruturação do Trabalho

- [x]  Usuário pode ver uma área de entrada que permite a inserção do intervalo de tempo para a chegada de clientes e um intervalo de tempo para o cumprimento de um pedido pelo cozinheiro.
- [x]  O usuário pode ver uma área de fila de pedidos contendo uma caixa de texto que mostra o número de clientes esperando para fazer pedidos.
- [x]  O usuário pode ver uma área de pedidos contendo caixas de texto que mostram o *número do pedido* que está sendo atendido atualmente.
- [x]  O usuário pode ver uma área de cozinha contendo uma caixa de texto que mostra o *número do pedido* que está sendo preparado e uma caixa de texto listando os pedidos em espera em sequência, junto com uma contagem do número de pedidos em espera.
- [x]  O usuário pode parar a simulação a qualquer momento clicando em um botão Parar.
- [x]  O usuário pode ver uma área de Retirada contendo uma caixa de texto que mostra o *número do pedido* que está atualmente disponível para retirada pelo Cliente
    - [x]  + uma caixa de texto mostrando os Clientes esperando na fila de atendimento.
- [x]  Lógica para área de clientes
    - [x]  Fila de clientes
    - [x]  Recepção e anotação de pedidos
    - [x]  Fila de clientes esperando
- [x]  O usuário pode iniciar a simulação clicando em um botão Iniciar.
- [x]  Lógica para cozinha
    - [x]  Fila de pedidos em espera
    - [x]  Preparo de pedidos
    - [x]  Fila de pedidos prontos
- [x]  Lógica para entrega de pedidos
    - [x]  Lista de pedidos esperando para serem entregues
    - [x]  Lista clientes esperando