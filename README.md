# Gerenciador_P2P_Telegram
Gerencia P2P em grupos de telegram

Para instalar:

Necessário Node.Js instalado.

 - Extrair arquivo para uma pasta (ex. c:\robo\)
 - Instalar o robô executando o comando: npm install
 - Instalar as tabelas do roboô executando: node bd.js
 - Atrelar o programa a o token de um bot de telegram variável TOKEN do arquivo index.js
 - Iniciar o robo com o comando: node start
 

 No Telegram:
 
Para ver os comandos, use /ajuda.

Para colocar uma ordem de venda, use /vender BTC:<QTD_BTC> VALOR:<VALOR_VENDA> BANCO:<BANCO>.
Ex.: /vender BTC:0.1 VALOR:4000 BANCO:Nubank

Para colocar uma ordem de compra, use /comprar BTC:<QTD_BTC> VALOR:<VALOR_VENDA> BANCO:<BANCO>.
Ex.: /comprar BTC:0.1 VALOR:4000 BANCO:Nubank

Para excluir sua ordem de venda ou compra, use /excluirVenda ou /excluirCompra.

Para ver os livro use  /livroCompra para lista de compras e /livroVenda para lista de venda.

Os administradores, podem gravar os negocios realizados através do comando /cadastrarNegocio (apenas em Grupo)
